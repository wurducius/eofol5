import { Attributes, Classname, DefInternal, EofolNode, Properties, Props, StateTransform } from "../types"
import { DEF_TYPE_COMPONENT } from "../eofol-constants"
import { ax, domAppendChildren, generateId, hx, wrapArray } from "../util"
import { getDef } from "../runtime"
import { addChildrenToProps } from "../component"
import { renderInstanceGeneral } from "./render-general"

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

export const createInstanceFromDefDom = (def: DefInternal<any>, props?: Props) => {
  const renderedInstance = renderInstanceGeneral(def, props, true)
  return def.render({
    ...(renderedInstance.stateTransforms as StateTransform<any>),
    body: renderedInstance.bodyImpl,
    params: renderedInstance.paramsImpl,
    props: renderedInstance.propsImpl,
  })
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
      return createInstanceFromDefDom(def, addChildrenToProps(attributes, children))
    }
  } else {
    return renderTagDom(tagName, className, children, attributes, properties)
  }
}
