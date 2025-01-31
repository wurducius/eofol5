import { Def, DEF_TYPE, DefFlat, EofolNode, Instance, Props } from "../types"
import { generateId, mergeDeep } from "../util"
import { getDef } from "../runtime"
import { eofolErrorDefNotFound } from "../log"
import { getInstance, mergeInstance } from "../../project/src/internals"
import { eofolUpdate } from "./eofol"
import { DEF_TYPE_COMPONENT } from "../eofol-constants"

const updateState = (idInstance: string, instance: Instance, nextState: any) => {
  const nextInstance = { ...instance, state: nextState }
  mergeInstance(idInstance, nextInstance)
  eofolUpdate(idInstance)
}

export function getStateSetter<T>(idInstance: string, instance: Instance) {
  return function (nextState: T) {
    updateState(idInstance, instance, nextState)
  }
}

export function getStateMerge<T>(idInstance: string, instance: Instance) {
  return function (nextState: T) {
    updateState(idInstance, instance, mergeDeep(instance.state, nextState))
  }
}

export const renderInstanceFromDef = (
  def: Def<any> & {
    id: string
    type: DEF_TYPE
  },
  props?: Props,
  children?: EofolNode,
  isNew?: boolean,
) => {
  const idInstance = isNew ? generateId() : (props?.id ?? generateId())
  const savedInstance = isNew ? undefined : getInstance(idInstance)
  const instance = savedInstance ?? {
    id: idInstance,
    def: def.id,
    state: def.initialState ? { ...def.initialState } : {},
  }
  const state = { ...instance.state }
  const setState = getStateSetter(idInstance, instance)
  const mergeState = getStateMerge(idInstance, instance)
  mergeInstance(idInstance, instance)
  const propsImpl = { ...props, id: idInstance, def: def.id, children }
  return def.render(state, setState, propsImpl, mergeState)
}
export const renderFlatFromDef = (
  def: DefFlat & { id: string },
  props?: Props,
  children?: EofolNode,
  isNew?: boolean,
) => {
  const idInstance = isNew ? generateId() : (props?.id ?? generateId())
  const propsImpl = { ...props, id: idInstance, def: def.id, children }
  return def.render(propsImpl)
}
export const renderInstance = (idDef: string, props?: Props, children?: EofolNode, isNew?: boolean) => {
  const def = getDef(idDef)
  if (def) {
    if (def.type === DEF_TYPE_COMPONENT) {
      return renderInstanceFromDef(def, props, children, isNew)
    } else {
      return renderFlatFromDef(def, props, children)
    }
  } else {
    eofolErrorDefNotFound(idDef)
    return undefined
  }
}
