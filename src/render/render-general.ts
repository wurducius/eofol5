import { DefInternal, Props } from "../types"
import { generateId } from "../util"
import { getInstance } from "../../project/src/internals"
import { getComponentInstance, getProps, getStateTransforms } from "../component"

export const getRenderArgs = (def: DefInternal<any>, props: Props | undefined, isNew?: boolean) => {
  const idInstance = isNew ? generateId() : (props?.id ?? generateId())
  const savedInstance = isNew ? undefined : getInstance(idInstance)
  const instance = getComponentInstance(savedInstance, idInstance, def)
  const stateTransforms = getStateTransforms(idInstance, instance, def.initialState)
  const propsImpl = getProps(props, idInstance, def, undefined)
  return { stateTransforms, instance, idInstance, propsImpl }
}
