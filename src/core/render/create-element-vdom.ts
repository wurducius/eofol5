import { Attributes, Classname, Properties, Props, VDOM, VDOM_COMPONENT, VDOM_TAG, VDOMChildren } from "../../types"
import { VDOM_TYPE } from "../../eofol-constants"
import { getDef } from "../runtime"
import { ax, wrapArray } from "../../util"
import { mountComponent } from "./component"
import { addChildrenToProps } from "./render-general"

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

export const eImpl = (
  tagName: string,
  className?: Classname,
  children?: Array<VDOM | undefined> | VDOM | undefined,
  attributes?: Attributes | Props,
  properties?: Properties,
) => {
  const def = getDef(tagName)
  const childrenImpl = wrapArray<VDOM>(children)
  return def
    ? mountComponent(def, addChildrenToProps(attributes, childrenImpl))
    : renderTag(tagName, className, childrenImpl, attributes, properties)
}
