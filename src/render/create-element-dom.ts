import { Attributes, Classname, EofolNode, Properties, Props } from "../types"
import { DEF_TYPE_COMPONENT } from "../eofol-constants"
import { ax, domAppendChildren, generateId, hx, wrapArray } from "../util"
import { getDef } from "../runtime"
import { addChildrenToProps } from "../component"
import { renderInstanceImpl } from "./create-element-vdom"

export const renderTagDom = (
  tagName: string,
  className?: Classname,
  children?: EofolNode,
  attributes?: Attributes,
  properties?: Properties,
) => {
  const element = document.createElement(tagName)
  hx({ ...(attributes ?? {}), id: attributes?.id ?? generateId() }, (attributeName, attributeValue) => {
    element.setAttribute(attributeName, attributeValue)
  })
  ax({ ...(properties ?? {}), className }, element)
  domAppendChildren(wrapArray(children), element)
  return element
}

export const eDom = (
  tagName: string,
  className?: Classname,
  children?: EofolNode,
  attributes?: Attributes | Props,
  properties?: Properties,
) => {
  const def = getDef(tagName)
  if (def) {
    if (def.type === DEF_TYPE_COMPONENT) {
      return renderInstanceImpl(def, addChildrenToProps(attributes, children), true)
    }
  } else {
    return renderTagDom(tagName, className, children, attributes, properties)
  }
}
