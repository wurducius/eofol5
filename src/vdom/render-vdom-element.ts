import { VDOM_TYPE } from "../eofol-constants"
import { Attributes, Params, Properties, VDOM, VDOM_COMPONENT, VDOM_TAG, VDOMChildren } from "../types"

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
): VDOM => {
  const result: Partial<VDOM_COMPONENT | VDOM_TAG> = {
    type,
    id,
  }
  if (className) {
    // @ts-ignore
    result.class = className
  }
  if (attributes) {
    if (type === VDOM_TYPE.COMPONENT) {
      // @ts-ignore
      result.props = attributes
    } else {
      // @ts-ignore
      result.attributes = attributes
    }
  }
  if (properties) {
    // @ts-ignore
    result.properties = properties
  }
  if (tagName) {
    // @ts-ignore
    result.tag = tagName
  }
  if (children) {
    result.children = children
  }
  if (def) {
    // @ts-ignore
    result.def = def
  }
  if (params) {
    // @ts-ignore
    result.params = params
  }
  return result as VDOM_COMPONENT | VDOM_TAG
}
