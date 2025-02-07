import { Attributes, Classname, DefInternal, Properties, Props, VDOM, VDOMChildren } from "../types"
import { VDOM_TYPE } from "../eofol-constants"
import { mergeInstance } from "../../project/src/internals"
import { getDef } from "../runtime"
import { addChildrenToProps, renderInstanceGeneral } from "../component"
import { playConstructor, playEffect } from "../lifecycle"
import { renderVdomElement } from "../vdom"
import { generateId } from "../util"

export const renderTag = (
  tagName: string,
  className?: Classname,
  children?: VDOMChildren,
  attributes?: Attributes,
  properties?: Properties,
) =>
  renderVdomElement(
    VDOM_TYPE.TAG,
    tagName,
    children,
    attributes?.id ?? generateId(),
    className,
    attributes,
    properties,
    undefined,
    undefined,
  )

export const createInstanceFromDefVdom = (
  def: DefInternal<any>,
  props?: Props,
  children?: VDOMChildren | VDOMChildren[],
) => {
  const isNew = props?.id === undefined
  const { instance, bodyImpl, propsImpl, paramsImpl, idInstance } = renderInstanceGeneral(def, props, isNew, true)
  const constructed = playConstructor(def, propsImpl, isNew) ?? {}
  instance.body = { ...constructed, bodyImpl }
  mergeInstance(idInstance, instance)
  playEffect(def, idInstance, instance)
  return renderVdomElement(
    VDOM_TYPE.COMPONENT,
    undefined,
    (Array.isArray(children) ? children : [children]).filter(Boolean) as VDOM[],
    idInstance,
    undefined,
    propsImpl,
    undefined,
    def.id,
    paramsImpl,
  )
}

export const eImpl = (
  tagName: string,
  className?: Classname,
  children?: Array<VDOM | undefined> | VDOM | undefined,
  attributes?: Attributes | Props,
  properties?: Properties,
) => {
  const def = getDef(tagName)
  const childrenImpl = (Array.isArray(children) ? children : [children]).filter(Boolean) as VDOM[]
  if (def) {
    return createInstanceFromDefVdom(def, addChildrenToProps(attributes, childrenImpl), undefined)
  } else {
    return renderTag(tagName, className, childrenImpl, attributes, properties)
  }
}
