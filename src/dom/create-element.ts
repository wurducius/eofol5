import { domAppendChildren } from "./children"
import { mergeInstance, getInstance, Instance } from "../../project/src/internals"
import { generateId } from "../util/crypto"
import {
  Attributes,
  Classname,
  Def,
  DefInternal,
  EofolNode,
  Properties,
  Props,
  VDOM,
  VDOM_TYPE,
  VDOMChildren,
} from "../types"
import { getDef } from "../runtime/defs"
import { eofolUpdate } from "./core"

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

// @TODO extract
const getStateSetter = (def: Def<any>, idInstance: string, instance: Instance) => (nextState: any) => {
  const nextInstance = { ...instance, state: nextState }
  mergeInstance(idInstance, nextInstance)
  eofolUpdate(idInstance)
}

// @TODO extract
export const createInstanceFromDef = (def: DefInternal<any>, props?: Props, children?: EofolNode) => {
  const idInstance = generateId()
  const instance = { id: idInstance, def: def.id, state: def.initialState ? { ...def.initialState } : {} }
  const state = { ...instance.state }
  const setState = getStateSetter(def, idInstance, instance)
  mergeInstance(idInstance, instance)
  return def.render(state, setState, { ...props, id: idInstance, def: def.id, children })
}

const renderComponentFromDefDom = (def: DefInternal<any>, children?: EofolNode, props?: Props) => {
  let propsImpl
  if (children) {
    propsImpl = { ...props, children }
  } else {
    propsImpl = props ?? {}
  }
  return createInstanceFromDef(def, propsImpl)
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
    return renderComponentFromDefDom(def, children, attributes)
  } else {
    return renderTagDom(tagName, className, children, attributes, properties)
  }
}

export const renderTag = (
  tagName: string,
  className?: Classname,
  children?: VDOMChildren,
  attributes?: Attributes,
  properties?: Properties,
) => ({
  type: VDOM_TYPE.TAG,
  id: attributes?.id ?? generateId(),
  class: className,
  attributes,
  properties,
  tag: tagName,
  children,
})

export const createInstanceFromDefVdom = (
  def: DefInternal<any>,
  props?: Props,
  children?: VDOMChildren,
  isNew?: boolean,
) => {
  const idInstance = isNew ? generateId() : (props?.id ?? generateId())
  const savedInstance = isNew ? undefined : getInstance(idInstance)
  const instance = savedInstance ?? {
    id: idInstance,
    def: def.id,
    state: def.initialState ? { ...def.initialState } : {},
  }
  mergeInstance(idInstance, instance)
  return {
    type: VDOM_TYPE.COMPONENT,
    id: idInstance,
    props: { ...props, id: idInstance, def: def.id },
    children,
    def: def.id,
  }
}

export const renderComponentFromDef = (def: DefInternal<any>, children?: VDOMChildren, props?: Props) => {
  let propsImpl
  if (children) {
    propsImpl = { ...props, children }
  } else {
    propsImpl = props ?? {}
  }
  return createInstanceFromDefVdom(def, propsImpl)
}

export const e = (
  tagName: string,
  className?: Classname,
  children?: VDOM[],
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
