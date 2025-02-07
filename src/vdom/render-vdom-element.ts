import { VDOM_TYPE } from "../eofol-constants"
import { Attributes, Properties, VDOM, VDOM_COMPONENT, VDOM_TAG, VDOMChildren } from "../types"
import { ax } from "../util"

export const renderVdomElement = (arg: {
  type: typeof VDOM_TYPE.COMPONENT | typeof VDOM_TYPE.TAG
  tagName: string | undefined
  children: VDOMChildren | undefined
  id: string
  className?: string
  attributes?: Attributes | undefined
  properties?: Properties | undefined
  def?: string | undefined
}): VDOM => {
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
