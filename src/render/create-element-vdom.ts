import { Attributes, Classname, DefInternal, Properties, Props, StateTransform, VDOM, VDOMChildren } from "../types"
import { DEF_TYPE_COMPONENT, VDOM_TYPE } from "../eofol-constants"
import { mergeInstance } from "../../project/src/internals"
import { getDef } from "../runtime"
import { addChildrenToProps } from "../component"
import { lifecycle } from "../lifecycle"
import { renderVdomElement } from "../vdom"
import { generateId, wrapArray } from "../util"
import { renderInstanceGeneral } from "./render-general"
import { eofolErrorDefNotFound } from "../log"

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
  const lifecycleArg = { def, props: propsImpl, isNew, idInstance, instance, children: wrapArray<VDOM>(children) }
  const constructed = lifecycle.constructor(lifecycleArg)
  instance.body = { ...constructed, ...bodyImpl }
  lifecycleArg.props = lifecycle.getDerivedStateFromProps(lifecycleArg)
  mergeInstance(idInstance, instance)
  lifecycle.beforeMount(lifecycleArg)
  const rendered = lifecycle.render(lifecycleArg, true)
  lifecycle.afterMount(lifecycleArg)
  return rendered
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

export const renderInstanceImpl = (def: DefInternal<any>, props: Props | undefined, isNew?: boolean) => {
  if (def.type === DEF_TYPE_COMPONENT) {
    const renderedInstance = renderInstanceGeneral(def, props, isNew)
    const lifecycleArg = {
      def,
      props: renderedInstance.propsImpl,
      idInstance: renderedInstance.idInstance,
      instance: renderedInstance.instance,
      isNew,
      body: renderedInstance.bodyImpl,
      stateTransforms: renderedInstance.stateTransforms as StateTransform<any>,
    }
    const shouldUpdate = lifecycle.shouldUpdate(lifecycleArg)
    if (shouldUpdate) {
      lifecycleArg.props = lifecycle.getDerivedStateFromProps(lifecycleArg)
      lifecycle.beforeUpdate(lifecycleArg)
      const rendered = lifecycle.render(lifecycleArg, false)
      lifecycle.afterUpdate(lifecycleArg)
      return rendered
    } else {
      // @TODO finish shouldUpdate
      return undefined
    }
  }
}

// @TODO removed children arg from propsImpl
export const renderInstance = (idDef: string, props: Props | undefined, isNew?: boolean) => {
  const def = getDef(idDef)
  if (def) {
    return renderInstanceImpl(def, props, isNew)
  } else {
    eofolErrorDefNotFound(idDef)
  }
}
