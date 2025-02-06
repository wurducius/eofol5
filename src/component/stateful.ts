import { Def, DEF_TYPE, DefInternal, Props, StateTransform } from "../types"
import { generateId } from "../util"
import { getDef } from "../runtime"
import { eofolErrorDefNotFound } from "../log"
import { getInstance } from "../../project/src/internals"
import { DEF_TYPE_COMPONENT } from "../eofol-constants"
import { getStateTransforms } from "./state"
import { playEffect } from "../lifecycle"
import { getComponentInstance, getProps } from "./helper"

export const renderInstanceGeneral = (
  def: DefInternal<any>,
  props: Props | undefined,
  isNew?: boolean,
  skipState?: boolean,
) => {
  const idInstance = isNew ? generateId() : (props?.id ?? generateId())
  const savedInstance = isNew ? undefined : getInstance(idInstance)
  const instance = getComponentInstance(savedInstance, idInstance, def)
  const stateTransforms = skipState ? {} : getStateTransforms(idInstance, instance, def.initialState)
  const propsImpl = getProps(props, idInstance, def, undefined)
  const paramsImpl = {}
  const bodyImpl = instance.body ?? {}
  return { stateTransforms, instance, idInstance, propsImpl, paramsImpl, bodyImpl }
}

export const renderInstanceFromDef = (
  def: Def<any> & {
    id: string
    type: DEF_TYPE
  },
  props?: Props,
  isNew?: boolean,
) => {
  const { stateTransforms, instance, bodyImpl, propsImpl, paramsImpl, idInstance } = renderInstanceGeneral(
    def,
    props,
    isNew,
  )
  const stateTransformsx = stateTransforms as StateTransform<StateTransform<any>>
  // mergeInstance(idInstance, instance)
  // @TODO removed children arg from propsImpl

  playEffect(def, idInstance, instance)

  return def.render({
    mergeState: stateTransformsx.mergeState,
    resetState: stateTransformsx.resetState,
    setState: stateTransformsx.setState,
    state: stateTransformsx.state,
    body: bodyImpl,
    params: paramsImpl,
    ...stateTransforms,
    props: propsImpl,
  })
}

export const renderInstance = (idDef: string, props?: Props | undefined, isNew?: boolean) => {
  const def = getDef(idDef)
  if (def) {
    if (def.type === DEF_TYPE_COMPONENT) {
      return renderInstanceFromDef(def, props, isNew)
    }
  } else {
    eofolErrorDefNotFound(idDef)
    return undefined
  }
}
