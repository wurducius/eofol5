import { getInstance, isVDOMComponent, isVDOMTag } from "./internals"
import { eDom, renderTagDom } from "../dom/create-element"
import { deepCopyString } from "../util/string"
import { VDOM, VDOM_TYPE } from "../types"
import { nodeMapToObject } from "../util/dom"
import { renderInstance } from "../component"

export const domToVdom = (tree: HTMLElement) => {
  if (tree.nodeType === 3) {
    return tree.textContent
  } else {
    const thisNode = {
      id: tree.getAttribute("id"),
      type: VDOM_TYPE.TAG,
      class: tree.className,
      attributes: tree.attributes,
      properties: { onclick: tree.onclick, onchange: tree.onchange },
      tag: tree.tagName,
      children: [],
    }
    if (tree.hasChildNodes()) {
      tree.childNodes.forEach((child) => {
        thisNode.children.push(domToVdom(child))
      })
    }
    return thisNode
  }
}

export const vdomToDom = (tree: VDOM) => {
  if (typeof tree === "string") {
    return deepCopyString(tree)
  } else {
    const renderedChildren = []
    const childrenArr = Array.isArray(tree.children) ? tree.children : [tree.children]
    const childrenImpl = childrenArr.filter(Boolean)
    if (childrenImpl && childrenImpl.length > 0) {
      childrenImpl.forEach((child) => {
        renderedChildren.push(vdomToDom(child))
      })
    }
    let thisNode
    const renderedChildrenImpl = renderedChildren.filter(Boolean)
    if (isVDOMTag(tree)) {
      const attributes = tree.attributes ? nodeMapToObject(tree.attributes) : {}
      thisNode = eDom(tree.tag, tree.class, renderedChildrenImpl, attributes, tree.properties)
    } else {
      const instance = getInstance(tree.id)
      thisNode = renderInstance(
        tree.def,
        instance ? { ...tree.props, id: tree.id } : {},
        renderedChildrenImpl,
        !instance,
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

// eslint-disable-next-line no-unused-vars
export const mapVdom = (tree: VDOM, mapping: (vdomElement: VDOM) => VDOM, result: VDOM) => {
  result = mapping(tree)
  if (
    "children" in tree &&
    tree.children &&
    ((Array.isArray(tree.children) && tree.children.length > 0) || !Array.isArray(tree.children))
  ) {
    if (Array.isArray(tree.children)) {
      result.children = []
      tree.children.forEach((child, index) => {
        return mapVdom(child, mapping, result.children[index])
      })
    } else {
      result.children = undefined
      return mapVdom(tree.children, mapping, result.children)
    }
  }
  return result
}
