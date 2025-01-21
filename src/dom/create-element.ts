import { domAppendChildren } from "./children"
import { DefInternal, getDef, Props } from "../../project/src/defs"
import { createInstanceFromDef } from "../../project/src/stateful"
import { generateId } from "../util/crypto"

// @TODO typing

export type Classname = string | undefined
export type Attributes = any
export type Properties = any

export type EofolElement = HTMLElement | string | undefined | false | null
export type EofolNode = EofolElement[] | EofolElement

export const renderTag = (
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
  const prevId = attributesImpl["id"]
  if (prevId === undefined) {
    attributesImpl["id"] = generateId()
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

export const renderComponentFromDef = (def: DefInternal, children?: EofolNode, props?: Props) => {
  let propsImpl
  if (children) {
    propsImpl = { ...props, children }
  } else {
    propsImpl = props ?? {}
  }
  return createInstanceFromDef(def, propsImpl)
}

export const e = (
  tagName: string,
  className?: Classname,
  children?: EofolNode,
  attributes?: Attributes | Props,
  properties?: Properties,
) => {
  const def = getDef(tagName)
  if (def) {
    return renderComponentFromDef(def, children, attributes)
  } else {
    return renderTag(tagName, className, children, attributes, properties)
  }
}
