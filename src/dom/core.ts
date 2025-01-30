import { domAppendChildren, domClearChildren } from "./children"
import { getInstance, getInternals, getVDOM, mergeInstance, setVDOM } from "../../project/src/internals"
import { Attributes, eDom, EofolNode, Properties, renderTagDom } from "./create-element"

import { generateId } from "../util/crypto"
import { eofolFatal } from "../component/logger"
import { DefInternal, Instance, Props, VDOM_COMPONENT, VDOM_TAG, VDOM_TEXT, VDOM_TYPE } from "../types"
import { getDef } from "../runtime/defs"
import { eofolErrorDefNotFound } from "../log/eofol-error"

const deepCopyString = (str) => ` ${str}`.slice(1)

const htmlElementIndexOf = (element) => {
  let index = -1
  while (element) {
    element = element.previousSibling
    if (element.nodeType === 1) {
      index++
    }
  }
  return index
}

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

export const isVDOMComponent = (vdomElement: VDOM): vdomElement is VDOM_COMPONENT =>
  typeof vdomElement === "object" && vdomElement.type === VDOM_TYPE.COMPONENT
export const isVDOMTag = (vdomElement: VDOM): vdomElement is VDOM_TAG =>
  typeof vdomElement === "object" && vdomElement.type === VDOM_TYPE.TAG
export const isVDOMText = (vdomElement: VDOM): vdomElement is VDOM_TEXT => typeof vdomElement === "string"

function getStateSetter<T>(idInstance: string, instance: Instance) {
  return function (nextState: T) {
    const nextInstance = { ...instance, state: nextState }
    mergeInstance(idInstance, nextInstance)
    eofolUpdate(idInstance)
  }
}

export const renderInstanceFromDef = (def: DefInternal<any>, props?: Props, children?: EofolNode, isNew?: boolean) => {
  const idInstance = isNew ? generateId() : (props?.id ?? generateId())
  const savedInstance = isNew ? undefined : getInstance(idInstance)
  const instance = savedInstance ?? {
    id: idInstance,
    def: def.id,
    state: def.initialState ? { ...def.initialState } : {},
  }
  const state = { ...instance.state }
  const setState = getStateSetter(idInstance, instance)
  mergeInstance(idInstance, instance)
  return def.render(state, setState, { ...props, id: idInstance, def: def.id, children })
}

export const renderInstance = (idDef: string, props?: Props, children?: EofolNode, isNew?: boolean) => {
  const def = getDef(idDef)
  if (def) {
    return renderInstanceFromDef(def, props, children, isNew)
  } else {
    eofolErrorDefNotFound(idDef)
    return undefined
  }
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

const eofolRender = (rootElement: Element, rendered: EofolNode) => {
  domClearChildren(rootElement)
  domAppendChildren(rendered, rootElement)
}

let ROOT_ELEMENT: HTMLElement | undefined = undefined

export const getRootElement = () => ROOT_ELEMENT

export const eofolInit = (rootElementId: string, handler: EofolRenderHandler) => {
  const root = document.getElementById(rootElementId)
  if (root) {
    ROOT_ELEMENT = root
    const rendered = handler()
    // @ts-ignore
    const vdom = rendered[0]
    setVDOM(vdom)
    const dom = vdomToDom(vdom)
    // @ts-ignore
    eofolRender(root, [dom])
  } else {
    eofolFatal(`Root element with id = "${rootElementId}" not found in DOM.`)
  }
}

export const eofolUpdate = (id: string) => {
  // @ts-ignore
  const vdom = getVDOM()
  const vdomUpdate = traverseVdom(
    vdom,
    (vdomElement) => {
      if ("id" in vdomElement && vdomElement.id === id) {
        return true
      }
    },
    (vdomElement) => vdomElement,
  )
  if (vdomUpdate) {
    const domUpdate = vdomToDom(vdomUpdate)
    if (domUpdate) {
      // @ts-ignore
      // const parent = domUpdate.parentNode
      const root = getRootElement() as HTMLElement
      eofolRender(root, [domUpdate])
      /*
      if (parent) {
        parent.childNodes.item(htmlElementIndexOf(domUpdate)).replaceWith(domUpdate)
      } else {
        // efl err
      }
       */
    } else {
      // efl error
    }
  } else {
    // efl err
  }
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
