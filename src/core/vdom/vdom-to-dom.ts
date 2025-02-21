import { EofolElement, EofolNode, VDOM, VDOM_COMPONENT, VDOM_TAG, VDOMChildren } from "../../types"
import { arrayCombinator, deepCopyString, wrapArray } from "../../util"
import { getInstance, isVDOMComponent, isVDOMTag, isVDOMText } from "../../../project/src/internals"
import { renderComponentDom, renderTagDom } from "../render"
import { getDef } from "../runtime"
import { eofolErrorDefNotFound } from "../../log"
import { VDOM_TYPE } from "../../eofol-constants"

const renderVdom = (
  tree: VDOM_TAG | VDOM_COMPONENT,
  renderedChildren: (false | VDOMChildren | HTMLElement | null)[],
) => {
  if (isVDOMTag(tree)) {
    return renderTagDom(
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
      const isNew = tree.props?.id
      return arrayCombinator(vdomToDom)(
        renderComponentDom(def, instance ? { ...(tree.props ?? {}), id: tree.id } : {}, isNew),
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
    const vdomChildren = tree.vdomChildren
    const children = wrapArray<VDOM>(tree.children)
    const childrenRendered = children.map((child, index) => {
      if (typeof child === "string") {
        return vdomToDom(child)
      } else {
        if (child.type === VDOM_TYPE.TAG) {
          return vdomToDom(child)
        } else if (isVDOMComponent(child)) {
          const injectedId =
            vdomChildren && Array.isArray(vdomChildren) && vdomChildren.length < index ? vdomChildren[index] : undefined
          const injectedChild = { ...child, props: { ...(child.props ?? {}), id: injectedId } }
          return vdomToDom(injectedChild)
        }
      }
    })
    const savedVdomChildren = childrenRendered.map((child) => {
      const savedId = !child || typeof child === "string" || Array.isArray(child) || !child.id ? undefined : child.id
      return { id: savedId }
    })
    const savedTree = { ...tree, vdomChildren: savedVdomChildren }
    return renderVdom(savedTree, childrenRendered)
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
      tree &&
      !isVDOMText(tree) &&
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
    (vdomElement) => (!vdomElement || isVDOMText(vdomElement) ? false : vdomElement.id === id),
    (vdomElement) => vdomElement,
  )
