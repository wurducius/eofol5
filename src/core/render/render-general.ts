import { DefInternal, EofolNode, Instance, LifecycleArg, Props, VDOMChildren } from "../../types"
import { ax, generateId } from "../../util"
import { getInstance } from "../../../project/src/internals"
import { getStateTransforms, initializeState, lifecycle } from "../lifecycle"

export const getProps = (props: Props | undefined, idInstance: string, def: DefInternal<any>, children: EofolNode) =>
  ax(
    { children },
    {
      ...(props ?? {}),
      id: idInstance,
      def: def.id,
    },
  )

export const getComponentInstance = (savedInstance: Instance | undefined, idInstance: string, def: DefInternal<any>) =>
  savedInstance ??
  (ax(
    {},
    {
      id: idInstance,
      def: def.id,
      state: initializeState(def),
    },
  ) as Instance)

export const addChildrenToProps = (props: Props | undefined, children: EofolNode | VDOMChildren | undefined) =>
  ax({ children }, props ?? {})

export const getRenderArgs = (def: DefInternal<any>, props: Props | undefined, isNew?: boolean) => {
  const idInstance = isNew ? generateId() : props?.id
  const savedInstance = isNew ? undefined : getInstance(idInstance)
  const instance = getComponentInstance(savedInstance, idInstance, def)
  const stateTransforms = getStateTransforms(idInstance, instance, def.initialState)
  const propsImpl = getProps(props, idInstance, def, undefined)
  return { stateTransforms, instance, idInstance, propsImpl }
}

export const getRenderArg = (arg: LifecycleArg) => ({ ...arg.stateTransforms, props: arg.props })

export const renderDom = (arg: LifecycleArg) => arg.def.render(getRenderArg(arg))

export const initComponentProps = (def: DefInternal<any>, props: Props) =>
  def.defaultProps ? { ...def.defaultProps, ...(props ?? {}) } : props

export const renderComponentInit = (def: DefInternal<any>, props: Props, isNew: boolean) => {
  const renderedInstance = getRenderArgs(def, props, isNew)
  return {
    def,
    props: renderedInstance.propsImpl,
    isNew,
    idInstance: renderedInstance.idInstance,
    instance: renderedInstance.instance,
    stateTransforms: renderedInstance.stateTransforms,
  }
}

export const renderComponentDerivedStateFromProps = (lifecycleArg: LifecycleArg) => {
  const derivedState = lifecycle.getDerivedStateFromProps(lifecycleArg)
  lifecycleArg.instance.state = derivedState
  lifecycleArg.stateTransforms.state = derivedState
  lifecycleArg.instance.state = derivedState
}
