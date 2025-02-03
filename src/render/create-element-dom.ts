import { Attributes, Classname, DefInternal, EofolNode, Properties, Props } from "../types"
import { DEF_TYPE_COMPONENT, PROP_NAME_ID } from "../eofol-constants"
import { domAppendChildren, generateId } from "../util"
import { getDef } from "../runtime"
import { getComponentInstance, getStateTransforms, getProps, addChildrenToProps } from "../component"
import { mergeInstance } from "../../project/src/internals"

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

export const createInstanceFromDefDom = (def: DefInternal<any>, props?: Props, children?: EofolNode) => {
  const idInstance = generateId()
  const instance = getComponentInstance(undefined, idInstance, def)
  const stateTransforms = getStateTransforms(idInstance, instance, def.initialState)
  mergeInstance(idInstance, instance)
  const propsImpl = getProps(props, idInstance, def, children)
  const body = instance.body ?? {}
  const paramsImpl = {}
  return def.render({
    ...stateTransforms,
    body,
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
      return createInstanceFromDefDom(def, addChildrenToProps(attributes, children), children)
    }
  } else {
    return renderTagDom(tagName, className, children, attributes, properties)
  }
}
