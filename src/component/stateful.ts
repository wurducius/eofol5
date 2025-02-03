import { Def, DEF_TYPE, DefFlat, EofolNode, Props } from "../types"
import { generateId } from "../util"
import { getDef } from "../runtime"
import { eofolErrorDefNotFound } from "../log"
import { getInstance } from "../../project/src/internals"
import { DEF_TYPE_COMPONENT } from "../eofol-constants"
import { getStateTransforms } from "./state"

export const renderInstanceFromDef = (
  def: Def<any> & {
    id: string
    type: DEF_TYPE
  },
  props?: Props,
  children?: EofolNode,
  isNew?: boolean,
  body?: Props,
) => {
  const idInstance = isNew ? generateId() : (props?.id ?? generateId())
  const savedInstance = isNew ? undefined : getInstance(idInstance)
  const instance = savedInstance ?? {
    id: idInstance,
    def: def.id,
    state: def.initialState ? { ...def.initialState } : {},
  }
  const stateTransforms = getStateTransforms(idInstance, instance, def.initialState)
  const propsImpl = { ...props, id: idInstance, def: def.id }
  const paramsImpl = {}
  // mergeInstance(idInstance, instance)
  // @TODO removed children arg from propsImpl

  return def.render({
    body,
    params: paramsImpl,
    ...stateTransforms,
    props: propsImpl,
  })
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

export const renderInstance = (idDef: string, props?: Props, children?: EofolNode, isNew?: boolean, body?: Props) => {
  const def = getDef(idDef)
  if (def) {
    if (def.type === DEF_TYPE_COMPONENT) {
      return renderInstanceFromDef(def, props, children, isNew, body)
    } else {
      return renderFlatFromDef(def, props, children)
    }
  } else {
    eofolErrorDefNotFound(idDef)
    return undefined
  }
}
