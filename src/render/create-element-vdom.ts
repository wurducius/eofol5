import { Attributes, Classname, DefInternal, Properties, Props, VDOMChildren } from "../types"
import { generateId } from "../util"
import { DEF_TYPE_COMPONENT, VDOM_TYPE } from "../eofol-constants"
import { mergeInstance } from "../../project/src/internals"
import { getDef } from "../runtime"
import { addChildrenToProps, renderInstanceGeneral } from "../component"
import { playConstructor, playEffect } from "../lifecycle"

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
  const isNew = props?.id === undefined
  const { instance, bodyImpl, propsImpl, paramsImpl, idInstance } = renderInstanceGeneral(def, props, isNew, true)
  const constructed = playConstructor(def, propsImpl, isNew) ?? {}
  instance.body = { ...constructed, bodyImpl }
  mergeInstance(idInstance, instance)
  playEffect(def, idInstance, instance)

  return {
    type: VDOM_TYPE.COMPONENT,
    id: idInstance,
    props: propsImpl,
    children,
    def: def.id,
    params: paramsImpl,
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
      return createInstanceFromDefVdom(def, addChildrenToProps(attributes, children), undefined)
    }
  } else {
    return renderTag(tagName, className, children, attributes, properties)
  }
}
