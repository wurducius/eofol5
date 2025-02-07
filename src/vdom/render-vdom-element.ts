import { VDOM_TYPE } from "../eofol-constants"
import { Attributes, Params, Properties, VDOM, VDOM_COMPONENT, VDOM_TAG, VDOMChildren } from "../types"
import { ax } from "../util"

export const renderVdomElement = (
  type: typeof VDOM_TYPE.COMPONENT | typeof VDOM_TYPE.TAG,
  tagName: string | undefined,
  children: VDOMChildren | undefined,
  id: string,
  className?: string,
  attributes?: Attributes | undefined,
  properties?: Properties | undefined,
  def?: string | undefined,
  params?: Params | undefined,
): VDOM =>
  ax(
    {
      class: className,
      [type === VDOM_TYPE.COMPONENT ? "props" : "attributes"]: attributes,
      properties,
      tag: tagName,
      children,
      def,
      params,
    },
    { type, id },
  ) as VDOM_COMPONENT | VDOM_TAG
