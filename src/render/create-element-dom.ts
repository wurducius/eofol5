import { Attributes, Classname, DefInternal, EofolNode, Properties, Props } from "../types"
import { DEF_TYPE_COMPONENT } from "../eofol-constants"
import { ax, domAppendChildren, generateId, hx, wrapArray } from "../util"
import { getDef } from "../runtime"
import { addChildrenToProps } from "../component"
import { getRenderArgs } from "./render-general"
import { lifecycle } from "../lifecycle"
import { mergeInstance } from "../../project/src/internals"

export const renderTagDom = (
  tagName: string,
  className?: Classname,
  children?: EofolNode,
  attributes?: Attributes,
  properties?: Properties,
) => {
  const element = document.createElement(tagName)
  hx({ ...(attributes ?? {}), id: attributes?.id ?? generateId() }, (attributeName, attributeValue) => {
    element.setAttribute(attributeName, attributeValue)
  })
  ax({ ...(properties ?? {}), className }, element)
  domAppendChildren(wrapArray(children), element)
  return element
}

export const renderComponentDom = (def: DefInternal<any>, props: Props | undefined, isNew?: boolean) => {
  if (def.type === DEF_TYPE_COMPONENT) {
    const renderedInstance = getRenderArgs(def, props, isNew)
    const lifecycleArg = {
      def,
      props: renderedInstance.propsImpl,
      idInstance: renderedInstance.idInstance,
      instance: renderedInstance.instance,
      isNew,
      body: renderedInstance.bodyImpl,
      stateTransforms: renderedInstance.stateTransforms,
    }

    const shouldUpdate = lifecycle.shouldUpdate(lifecycleArg)

    if (shouldUpdate) {
      const derivedState = lifecycle.getDerivedStateFromProps(lifecycleArg)
      lifecycleArg.stateTransforms.state = derivedState
      lifecycleArg.instance.state = derivedState

      mergeInstance(lifecycleArg.idInstance, lifecycleArg.instance)

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
      return renderComponentDom(def, addChildrenToProps(attributes, children), true)
    }
  } else {
    return renderTagDom(tagName, className, children, attributes, properties)
  }
}
