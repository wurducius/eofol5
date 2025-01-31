import { EofolElement, VDOM, VDOM_COMPONENT, VDOM_TAG, VDOM_TEXT } from "../types"
import { deepCopyString } from "../util"
import { getInstance, isVDOMComponent, isVDOMTag } from "../../project/src/internals"
import { eDom, renderTagDom } from "./create-element"

import { renderInstance } from "./stateful"

export const vdomToDom = (tree: VDOM) => {
  if (!tree) {
    return undefined
  }
  if (typeof tree === "string") {
    return deepCopyString(tree)
  } else {
    const renderedChildren: EofolElement[] = []
    const childrenArr = tree ? (Array.isArray(tree.children) ? tree.children : [tree.children]) : []
    const childrenImpl = childrenArr.filter(Boolean) as Array<VDOM_TEXT | VDOM_TAG | VDOM_COMPONENT>
    if (childrenImpl && childrenImpl.length > 0) {
      childrenImpl.forEach((child) => {
        renderedChildren.push(vdomToDom(child))
      })
    }
    let thisNode
    const renderedChildrenImpl = renderedChildren.filter(Boolean)
    if (isVDOMTag(tree)) {
      const attributes = tree.attributes ?? {}
      thisNode = eDom(tree.tag, tree.class, renderedChildrenImpl, attributes, tree.properties)
    } else {
      const instance = getInstance(tree.id)
      thisNode = vdomToDom(
        renderInstance(tree.def, instance ? { ...tree.props, id: tree.id } : {}, renderedChildrenImpl, !instance),
      )
    }
    return thisNode
  }
}

export const renderVdomElement = (vdomElement: VDOM) => {
  let rendered
  if (isVDOMComponent(vdomElement)) {
    const instance = getInstance(vdomElement.id)
    if (instance) {
      // @TODO update
      rendered = renderInstance(vdomElement.def, instance.props, vdomElement.children?.map(renderVdomElement), false)
    } else {
      rendered = renderInstance(vdomElement.def, {}, vdomElement.children?.map(renderVdomElement), true)
    }
  } else if (isVDOMTag(vdomElement)) {
    rendered = renderTagDom(
      vdomElement.tag,
      vdomElement.class,
      vdomElement.children?.map(renderVdomElement),
      vdomElement.attributes,
      vdomElement.properties,
    )
  } else {
    rendered = deepCopyString(vdomElement)
  }
  return rendered
}

/*
export const traverseVdom = (
  tree: VDOM,
  matches: (vdomElement: VDOM) => boolean,
  handler: (vdomElement: VDOM) => any,
) => {
  if (matches(tree)) {
    return handler(tree)
  } else {
    if (
      "children" in tree &&
      tree.children &&
      ((Array.isArray(tree.children) && tree.children.length > 0) || !Array.isArray(tree.children))
    ) {
      if (Array.isArray(tree.children)) {
        tree.children.forEach((child) => {
          return traverseVdom(child, matches, handler)
        })
      } else {
        return traverseVdom(tree.children, matches, handler)
      }
    }
  }
}
*/
