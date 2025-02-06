import { Attributes, Classname, DefInternal, EofolNode, Properties, Props, StateTransform } from "../types"
import { DEF_TYPE_COMPONENT, PROP_NAME_ID } from "../eofol-constants"
import { domAppendChildren, generateId } from "../util"
import { getDef } from "../runtime"
import { addChildrenToProps, renderInstanceGeneral } from "../component"

export const renderTagDom = (
  tagName: string,
  className?: Classname,
  children?: EofolNode,
  attributes?: Attributes,
  properties?: Properties,
) => {
  const element = document.createElement(tagName)
  if (className) {
    element.className = className
  }
  const attributesImpl = attributes ?? {}
  const prevId = attributesImpl[PROP_NAME_ID]
  if (prevId === undefined) {
    attributesImpl[PROP_NAME_ID] = generateId()
  }
  Object.keys(attributesImpl).forEach((attributeName) => {
    const attributeValue = attributesImpl[attributeName]
    if (attributeValue) {
      element.setAttribute(attributeName, attributeValue)
    }
  })
  if (properties) {
    Object.keys(properties).forEach((propertyName) => {
      const propertyValue = properties[propertyName]
      if (propertyValue) {
        // @ts-ignore
        element[propertyName] = propertyValue
      }
    })
  }
  const childrenImplRaw = Array.isArray(children) ? children : [children]
  const childrenImpl = childrenImplRaw.filter(Boolean)
  if (childrenImpl.length > 0) {
    domAppendChildren(childrenImpl, element)
  }
  return element
}

export const createInstanceFromDefDom = (def: DefInternal<any>, props?: Props) => {
  const { stateTransforms, bodyImpl, propsImpl, paramsImpl } = renderInstanceGeneral(def, props, true)
  const stateTransformsx = stateTransforms as StateTransform<any>

  return def.render({
    state: stateTransformsx.state,
    setState: stateTransformsx.setState,
    mergeState: stateTransformsx.mergeState,
    resetState: stateTransformsx.resetState,
    body: bodyImpl,
    params: paramsImpl,
    props: propsImpl,
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
