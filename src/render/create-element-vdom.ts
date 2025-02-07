import { Attributes, Classname, DefInternal, Properties, Props, VDOM, VDOMChildren } from "../types"
import { VDOM_TYPE } from "../eofol-constants"
import { mergeInstance } from "../../project/src/internals"
import { getDef } from "../runtime"
import { addChildrenToProps } from "../component"
import { playConstructor, playEffect } from "../lifecycle"
import { renderVdomElement } from "../vdom"
import { generateId, wrapArray } from "../util"
import { renderInstanceGeneral } from "./render-general"

export const renderTag = (
  tagName: string,
  className?: Classname,
  children?: VDOMChildren,
  attributes?: Attributes,
  properties?: Properties,
) =>
  renderVdomElement({
    type: VDOM_TYPE.TAG,
    tagName,
    children,
    id: attributes?.id ?? generateId(),
    className,
    attributes,
    properties,
  })

export const createInstanceFromDefVdom = (
  def: DefInternal<any>,
  props?: Props,
  children?: VDOMChildren | VDOMChildren[],
) => {
  const isNew = props?.id === undefined
  const { instance, bodyImpl, propsImpl, idInstance } = renderInstanceGeneral(def, props, isNew, true)
  const constructed = playConstructor(def, propsImpl, isNew) ?? {}
  instance.body = { ...constructed, ...bodyImpl }
  mergeInstance(idInstance, instance)
  playEffect(def, idInstance, instance, props)
  return renderVdomElement({
    type: VDOM_TYPE.COMPONENT,
    tagName: undefined,
    children: wrapArray<VDOM>(children),
    id: idInstance,
    attributes: propsImpl,
    def: def.id,
  })
}

export const eImpl = (
  tagName: string,
  className?: Classname,
  children?: Array<VDOM | undefined> | VDOM | undefined,
  attributes?: Attributes | Props,
  properties?: Properties,
) => {
  const def = getDef(tagName)
  const childrenImpl = wrapArray<VDOM>(children)
  if (def) {
    return createInstanceFromDefVdom(def, addChildrenToProps(attributes, childrenImpl), undefined)
  } else {
    return renderTag(tagName, className, childrenImpl, attributes, properties)
  }
}
