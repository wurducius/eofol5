import { domAppendChildren } from "./children"

// @TODO typing

export type Classname = string | undefined
export type Attributes = any
export type Properties = any

export type EofolElement = HTMLElement | string | undefined | false | null
export type EofolNode = HTMLElement[] | EofolElement

export const e = (
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
  if (attributes) {
    Object.keys(attributes).forEach((attributeName) => {
      const attributeValue = attributes[attributeName]
      if (attributeValue) {
        element.setAttribute(attributeName, attributeValue)
      }
    })
  }
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
