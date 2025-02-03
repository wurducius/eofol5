// @TODO extract
import { Attributes, Classname, DefInternal, EofolNode, Properties, Props, VDOMChildren } from "../types"
import { generateId } from "../util"
import { DEF_TYPE_COMPONENT, VDOM_TYPE } from "../eofol-constants"
import { getInstance, mergeInstance } from "../../project/src/internals"
import { getStateTransforms } from "../component"
import { getDef } from "../runtime"

export const createInstanceFromDef = (def: DefInternal<any>, props?: Props, children?: EofolNode) => {
  const idInstance = generateId()
  const instance = { id: idInstance, def: def.id, state: def.initialState ? { ...def.initialState } : {} }
  const stateTransforms = getStateTransforms(idInstance, instance, def.initialState)
  mergeInstance(idInstance, instance)
  const propsImpl = { ...props, id: idInstance, def: def.id, children }
  const constructed = def.constructor ? def.constructor(def.defaultProps ?? {}) : undefined
  const bodyImpl = { ...constructed, ...(instance.body ?? {}) }
  const paramsImpl = {}
  return def.render({
    ...stateTransforms,
    body: bodyImpl,
    params: paramsImpl,
    props: propsImpl,
  })
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

export const createInstanceFromDefVdom = (def: DefInternal<any>, props?: Props, children?: VDOMChildren) => {
  const propsId = props?.id
  const isNew = propsId === undefined
  const idInstance = propsId ?? generateId()
  const savedInstance = !isNew ? getInstance(propsId) : undefined
  let bodyImpl = {}
  const instance = savedInstance ?? {
    id: idInstance,
    def: def.id,
    state: def.initialState ? { ...def.initialState } : {},
    body: bodyImpl,
  }
  const propsImpl = { ...props, id: idInstance, def: def.id }
  if (isNew && def.constructor) {
    const constructorArgs = {
      props: propsImpl ?? {},
      defaultProps: def.defaultProps ?? {},
      defaultParams: def.defaultParams ?? {},
      //  params: {},
    }
    bodyImpl = def.constructor(constructorArgs)
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
  return createInstanceFromDefVdom(def, propsImpl, children)
}

export const renderFlatFromDef = (def: DefInternal<any>, children?: VDOMChildren, props?: Props) => {
  const idInstance = generateId()
  return {
    type: VDOM_TYPE.COMPONENT,
    id: idInstance,
    props: { ...props, id: idInstance, def: def.id },
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
      return renderComponentFromDef(def, children, attributes)
    } else {
      return renderFlatFromDef(def, children, attributes)
    }
  } else {
    return renderTag(tagName, className, children, attributes, properties)
  }
}
