import { DefInternal, Props } from "../types"
import { generateId } from "../util"
import { getInstance } from "../../project/src/internals"
import { getComponentInstance, getProps, getStateTransforms } from "../component"

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
