import { EofolElement, EofolNode, VDOM, VDOM_COMPONENT, VDOM_TAG, VDOMChildren } from "../../types"
import { arrayCombinator, deepCopyString, wrapArray } from "../../util"
import { getInstance, isVDOMTag } from "../../../project/src/internals"
import { eDom, renderComponentDom } from "../render"
import { getDef } from "../runtime"
import { eofolErrorDefNotFound } from "../../log"

const renderVdom = (
  tree: VDOM_TAG | VDOM_COMPONENT,
  renderedChildren: (false | VDOMChildren | HTMLElement | null)[],
) => {
  if (isVDOMTag(tree)) {
    return eDom(
      tree.tag,
      tree.class,
      renderedChildren.filter(Boolean) as EofolNode,
      tree.attributes ?? {},
      tree.properties ?? {},
    )
  } else {
    const instance = getInstance(tree.id)
    const def = getDef(instance.def)
    if (def) {
      return arrayCombinator(vdomToDom)(
        renderComponentDom(def, instance ? { ...(tree.props ?? {}), id: tree.id } : {}, false),
      )
    } else {
      eofolErrorDefNotFound(instance.def)
    }
  }
}

export const vdomToDom = (
  tree: VDOM | undefined,
): string | undefined | null | false | HTMLElement | EofolElement | VDOM_TAG | VDOM_COMPONENT | VDOM[] => {
  if (!tree) {
    return undefined
  }
  if (typeof tree === "string") {
    return deepCopyString(tree)
  } else {
    const children = wrapArray<VDOM>(tree.children)
    const childrenRendered = children.map(vdomToDom)
    return renderVdom(tree, childrenRendered)
  }
}

export const traverseVdom = (
  tree: VDOM,
  // eslint-disable-next-line no-unused-vars
  matches: (vdomElement: VDOM) => boolean,
  // eslint-disable-next-line no-unused-vars
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

export const findVdomElementById = (tree: VDOM, id: string) =>
  traverseVdom(
    tree,
    (vdomElement) => vdomElement.id === id,
    (vdomElement) => vdomElement,
  )
