import { domAppendChildren, domClearChildren } from "./children"
import { eofolFatal } from "../../project/src/util"
import { getInstance, getInternals, mergeInternals } from "../../project/src/internals"
import { Attributes, e, EofolNode, Properties, renderTag } from "./create-element"
import { Props } from "../../project/src/defs"
import { createInstance } from "../../project/src/stateful"

type EofolRenderHandler = () => EofolNode

type VDOM =
  | {
      type: "tag"
      id: string
      class?: string
      attributes?: Attributes
      properties: Properties
      tag: string
      children?: VDOM[]
    }
  | {
      type: "component"
      id: string
      props?: Props
      children?: VDOM[]
      def: string
    }
  | {
      type: "text"
      content: string
    }

const eofolRender = (rootElement: Element, rendered: EofolNode) => {
  domClearChildren(rootElement)
  domAppendChildren(rendered, rootElement)
}

const nodeMapToObject = (attributeNodeMap: NamedNodeMap) => {
  return Array.from(attributeNodeMap)
    .map((a) => [a.name, a.value])
    .reduce((acc, attr) => {
      // @ts-ignore
      acc[attr[0]] = attr[1]
      return acc
    }, {})
}

const domToVdom = (tree: HTMLElement) => {
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

const vdomToDom = (tree: VDOM) => {
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
      const attributes = tree.attributes ? nodeMapToObject(tree.attributes) : {}
      thisNode = e(tree.tag, tree.class, renderedChildrenImpl, attributes, tree.properties)
    } else {
      thisNode = e("span", undefined, renderedChildrenImpl)
    }
    return thisNode
  }
}

const initVDOM = (tree: HTMLElement) => {
  return { tree: [domToVdom(tree)] }
}

let ROOT_ELEMENT: HTMLElement | undefined = undefined

export const getRootElement = () => ROOT_ELEMENT

export const eofolInit = (rootElementId: string, handler: EofolRenderHandler) => {
  const root = document.getElementById(rootElementId)
  if (root) {
    ROOT_ELEMENT = root
    const rendered = handler()
    // @ts-ignore
    const vdom = initVDOM(rendered[0])
    mergeInternals({ vdom })
    eofolRender(root, rendered)
  } else {
    eofolFatal(`Root element with id = "${rootElementId}" not found in DOM.`)
  }
}

const renderVdomElement = (vdomElement: VDOM) => {
  let rendered
  if (vdomElement.type === "component") {
    const instance = getInstance(vdomElement.id)
    if (instance) {
      // @TODO update
      rendered = createInstance(vdomElement.def, instance.props, vdomElement.children?.map(renderVdomElement))
    } else {
      rendered = createInstance(vdomElement.def, {}, vdomElement.children?.map(renderVdomElement))
    }
  } else if (vdomElement.type === "tag") {
    rendered = renderTag(
      vdomElement.tag,
      vdomElement.class,
      vdomElement.children?.map(renderVdomElement),
      vdomElement.attributes,
      vdomElement.properties,
    )
  } else {
    rendered = ` ${vdomElement.content}`.slice(1)
  }
  return rendered
}

const traverseVdom = (tree: VDOM, matches: (vdomElement: VDOM) => boolean, handler: (vdomElement: VDOM) => any) => {
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

const mapVdom = (tree: VDOM, mapping: (vdomElement: VDOM) => VDOM, result: VDOM) => {
  const resultImpl = mapping(tree)
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
  return resultImpl
}

export const eofolUpdate = (id: string) => {
  const root = getRootElement() as HTMLElement
  // @ts-ignore
  const vdom = getInternals().vdom.tree[0]
  const rendered = mapVdom(
    vdom,
    (vdomElement) => {
      if ("id" in vdomElement && vdomElement.id === id) {
        return renderVdomElement(vdomElement)
      } else {
        return vdomElement
      }
    },
    undefined,
  )
  // @ts-ignore
  const dom = vdomToDom(rendered)
  eofolRender(root, [dom])
}

export const forceRerender = () => {
  const root = getRootElement() as HTMLElement
  // @ts-ignore
  const vdomIndex = getInternals().vdom.tree[0]
  const rendered = renderVdomElement(vdomIndex)
  // @ts-ignore
  const dom = vdomToDom(rendered)
  eofolRender(root, [dom])
}
