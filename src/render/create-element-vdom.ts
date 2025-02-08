import {
  Attributes,
  Classname,
  DefInternal,
  Properties,
  Props,
  VDOM,
  VDOM_COMPONENT,
  VDOM_TAG,
  VDOMChildren,
} from "../types"
import { VDOM_TYPE } from "../eofol-constants"
import { getVDOM, mergeInstance } from "../../project/src/internals"
import { getDef } from "../runtime"
import { addChildrenToProps } from "../component"
import { lifecycle } from "../lifecycle"
import { ax, generateId, wrapArray } from "../util"
import { getRenderArgs } from "./render-general"
import { findVdomElementById } from "../vdom"

export const renderVdomElement = (arg: {
  type: typeof VDOM_TYPE.COMPONENT | typeof VDOM_TYPE.TAG
  tagName: string | undefined
  children: VDOMChildren | undefined
  id: string
  className?: string
  attributes?: Attributes | undefined
  properties?: Properties | undefined
  def?: string | undefined
}) => {
  const { type, tagName, children, id, className, attributes, properties, def } = arg
  return ax(
    {
      class: className,
      [type === VDOM_TYPE.COMPONENT ? "props" : "attributes"]: attributes,
      properties,
      tag: tagName,
      children,
      def,
    },
    { type, id },
  ) as VDOM_COMPONENT | VDOM_TAG
}

export const renderTag = (
  tagName: string,
  className?: Classname,
  children?: VDOMChildren,
  attributes?: Attributes,
  properties?: Properties,
) =>
  renderVdomElement({
    type: VDOM_TYPE.TAG,
    tagName,
    children,
    id: attributes?.id ?? generateId(),
    className,
    attributes,
    properties,
  })

export const renderComponent = (def: DefInternal<any>, props?: Props, children?: VDOMChildren | VDOMChildren[]) => {
  const isNew = props?.id === undefined
  const propsInitialized = isNew && def.defaultProps ? { ...def.defaultProps, ...(props ?? {}) } : props
  const renderedInstance = getRenderArgs(def, propsInitialized, isNew)
  const lifecycleArg = {
    def,
    props: renderedInstance.propsImpl,
    isNew,
    idInstance: renderedInstance.idInstance,
    instance: renderedInstance.instance,
    children: wrapArray<VDOM>(children),
    stateTransforms: renderedInstance.stateTransforms,
  }

  lifecycle.constructor(lifecycleArg)

  const derivedState = lifecycle.getDerivedStateFromProps(lifecycleArg)
  lifecycleArg.instance.state = derivedState
  lifecycleArg.stateTransforms.state = derivedState
  lifecycleArg.instance.state = derivedState

  mergeInstance(lifecycleArg.idInstance, lifecycleArg.instance)

  lifecycle.beforeMount(lifecycleArg)

  const rendered = lifecycle.render(lifecycleArg, true)

  lifecycle.afterMount(lifecycleArg)

  return rendered
}

export const eImpl = (
  tagName: string,
  className?: Classname,
  children?: Array<VDOM | undefined> | VDOM | undefined,
  attributes?: Attributes | Props,
  properties?: Properties,
) => {
  const def = getDef(tagName)
  const childrenImpl = wrapArray<VDOM>(children)
  if (def) {
    const id = attributes?.id
    if (id) {
      const vdom = getVDOM()
      const vdomElement = findVdomElementById(vdom, id)
      if (vdomElement) {
        // @TODO
      }
    }
    return renderComponent(def, addChildrenToProps(attributes, childrenImpl), undefined)
  } else {
    return renderTag(tagName, className, childrenImpl, attributes, properties)
  }
}
