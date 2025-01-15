import { domAppendChildren, domClearChildren } from "./children"
import { eofolFatal } from "../../project/src/util"
import { getInternals, mergeInternals } from "../../project/src/internals"
import { e } from "./create-element"

type EofolRenderHandler = () =>
  | string
  | HTMLElement
  | undefined
  | null
  | false
  | Array<string | HTMLElement | undefined | null | false>

const eofolRender = (rootElement: Element, rendered) => {
  domClearChildren(rootElement)
  domAppendChildren(rendered, rootElement)
}

const getAttributes = (attributeNodeMap: NamedNodeMap) => {
  return Array.from(attributeNodeMap)
    .map((a) => [a.name, a.value])
    .reduce((acc, attr) => {
      // @ts-ignore
      acc[attr[0]] = attr[1]
      return acc
    }, {})
}

const domToVdom = (tree) => {
  if (tree.nodeType === 3) {
    return { type: "text", content: tree.textContent }
  } else {
    const thisNode = {
      id: tree.getAttribute("id"),
      type: "tag",
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

const vdomToDom = (tree) => {
  if (tree.type === "text") {
    return tree.content
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
    if (tree.type === "tag") {
      const attributes = tree.attributes ? getAttributes(tree.attributes) : {}
      thisNode = e(tree.tag, tree.class, renderedChildrenImpl, attributes, tree.properties)
    } else {
      thisNode = e("span", undefined, renderedChildrenImpl)
    }
    return thisNode
  }
}

const initVDOM = (tree) => {
  return { tree: [domToVdom(tree)] }
}

export const eofolInit = (rootElementId: string, handler: EofolRenderHandler) => {
  const root = document.getElementById(rootElementId)
  if (root) {
    const rendered = handler()
    // @ts-ignore
    const vdom = initVDOM(rendered[0])
    mergeInternals({ vdom })
    eofolRender(root, rendered)
  } else {
    eofolFatal(`Root element with id = "${rootElementId}" not found in DOM.`)
  }
}

export const eofolUpdate = (rootElementId: string) => {
  const root = document.getElementById(rootElementId)
  if (root) {
    // @ts-ignore
    const rendered = vdomToDom(getInternals().vdom.tree[0])
    eofolRender(root, [rendered])
  } else {
    eofolFatal(`Root element with id = "${rootElementId}" not found in DOM.`)
  }
}
