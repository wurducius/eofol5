import { DefInternal, LifecycleArg, Props } from "../../types"
import { generateId } from "../../util"
import { getInstance } from "../../../project/src/internals"
import { getComponentInstance, getProps, getStateTransforms } from "../component"

export const getRenderArgs = (def: DefInternal<any>, props: Props | undefined, isNew?: boolean) => {
  const idInstance = isNew ? generateId() : props?.id
  const savedInstance = isNew ? undefined : getInstance(idInstance)
  const instance = getComponentInstance(savedInstance, idInstance, def)
  const stateTransforms = getStateTransforms(idInstance, instance, def.initialState)
  const propsImpl = getProps(props, idInstance, def, undefined)
  return { stateTransforms, instance, idInstance, propsImpl }
}

export const renderDom = (arg: LifecycleArg) => arg.def.render(getRenderArg(arg))

export const getRenderArg = (arg: LifecycleArg) => ({ ...arg.stateTransforms, props: arg.props })
