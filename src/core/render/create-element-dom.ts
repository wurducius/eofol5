import { Attributes, Classname, DefInternal, EofolNode, Properties, Props } from "../../types"
import { DEF_TYPE_COMPONENT } from "../../eofol-constants"
import { ax, domAppendChildren, generateId, hx, wrapArray } from "../../util"
import { getDef } from "../runtime"
import { addChildrenToProps, getRenderArgs, renderDom } from "./render-general"
import { mergeInstance } from "../../../project/src/internals"

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

export const renderComponentDom = (def: DefInternal<any>, props: Props | undefined, isNew?: string | undefined) => {
  if (def.type === DEF_TYPE_COMPONENT) {
    const renderedInstance = getRenderArgs(def, { ...(props ?? {}), id: isNew }, isNew !== undefined)
    const lifecycleArg = {
      def,
      props: renderedInstance.propsImpl,
      idInstance: renderedInstance.idInstance,
      instance: renderedInstance.instance,
      isNew: isNew !== undefined,
      stateTransforms: renderedInstance.stateTransforms,
    }
    mergeInstance(lifecycleArg.idInstance, lifecycleArg.instance)
    return renderDom(lifecycleArg)
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
  return def
    ? renderComponentDom(def, addChildrenToProps(attributes, children), attributes?.id)
    : renderTagDom(tagName, className, children, attributes, properties)
}
