import { EofolElement, VDOM_COMPONENT, VDOM_TAG, VDOM_TEXT, VDOMChildren } from "../types"
import { deepCopyString } from "../util"
import { getInstance, isVDOMTag } from "../../project/src/internals"
import { eDom } from "../render"
import { renderInstance } from "../component"

export const vdomToDom = (tree: VDOMChildren) => {
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
        renderInstance(tree.def, instance ? { ...tree.props, id: tree.id } : {}, instance === undefined),
      )
    }
    return thisNode
  }
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
