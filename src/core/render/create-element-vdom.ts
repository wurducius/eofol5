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
} from "../../types"
import { VDOM_TYPE } from "../../eofol-constants"
import { getInstance, getVDOM, mergeInstance } from "../../../project/src/internals"
import { getDef } from "../../runtime"
import { addChildrenToProps } from "../component"
import { lifecycle } from "../lifecycle"
import { ax, wrapArray } from "../../util"
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
    id: attributes?.id,
    className,
    attributes,
    properties,
  })

export const renderComponent = (def: DefInternal<any>, props: Props) => {
  const prevId = props?.id
  let isNew
  if (prevId) {
    const instance = getInstance(prevId)
    isNew = instance !== undefined
  } else {
    isNew = true
  }
  const propsInitialized = isNew && def.defaultProps ? { ...def.defaultProps, ...(props ?? {}) } : props
  const renderedInstance = getRenderArgs(def, propsInitialized, isNew)
  const lifecycleArg = {
    def,
    props: renderedInstance.propsImpl,
    isNew,
    idInstance: renderedInstance.idInstance,
    instance: renderedInstance.instance,
    stateTransforms: renderedInstance.stateTransforms,
  }

  if (isNew) {
    lifecycle.constructor(lifecycleArg)
  }

  const derivedState = lifecycle.getDerivedStateFromProps(lifecycleArg)
  lifecycleArg.instance.state = derivedState
  lifecycleArg.stateTransforms.state = derivedState
  lifecycleArg.instance.state = derivedState

  mergeInstance(lifecycleArg.idInstance, lifecycleArg.instance)

  if (isNew) {
    lifecycle.beforeMount(lifecycleArg)
  } else {
    lifecycle.beforeUpdate(lifecycleArg)
  }

  const rendered = lifecycle.render(lifecycleArg)

  if (isNew) {
    lifecycle.afterMount(lifecycleArg)
  } else {
    lifecycle.afterUpdate(lifecycleArg)
  }

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
    let parent = undefined
    const parentId = attributes?.parentId
    if (parentId) {
      const vdom = getVDOM()
      parent = findVdomElementById(vdom, parentId)
      if (parent) {
        // @TODO
      }
    }
    return renderComponent(def, addChildrenToProps(attributes, childrenImpl))
  } else {
    return renderTag(tagName, className, childrenImpl, attributes, properties)
  }
}
