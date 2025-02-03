import { Attributes, Classname, DefInternal, Properties, Props, VDOMChildren } from "../types"
import { generateId } from "../util"
import { DEF_TYPE_COMPONENT, VDOM_TYPE } from "../eofol-constants"
import { getInstance, mergeInstance } from "../../project/src/internals"
import { getDef } from "../runtime"
import { addChildrenToProps, getComponentInstance, getProps, playConstructor } from "../component"

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

export const createInstanceFromDefVdom = (def: DefInternal<any>, props?: Props, children?: VDOMChildren) => {
  const propsId = props?.id
  const isNew = propsId === undefined
  const idInstance = propsId ?? generateId()
  const savedInstance = !isNew ? getInstance(propsId) : undefined
  let bodyImpl = {}
  const instance = getComponentInstance(savedInstance, idInstance, def, bodyImpl)
  const propsImpl = getProps(props, idInstance, def, undefined)
  const constructed = playConstructor(def, propsImpl, isNew)
  if (constructed) {
    bodyImpl = constructed
  }
  mergeInstance(idInstance, instance)
  return {
    type: VDOM_TYPE.COMPONENT,
    id: idInstance,
    props: propsImpl,
    children,
    def: def.id,
  }
}

export const eImpl = (
  tagName: string,
  className?: Classname,
  children?: VDOMChildren,
  attributes?: Attributes | Props,
  properties?: Properties,
) => {
  const def = getDef(tagName)
  if (def) {
    if (def.type === DEF_TYPE_COMPONENT) {
      return createInstanceFromDefVdom(def, addChildrenToProps(attributes, children), children)
    }
  } else {
    return renderTag(tagName, className, children, attributes, properties)
  }
}
