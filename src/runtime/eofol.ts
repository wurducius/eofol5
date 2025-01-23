import { EofolNode, EofolRenderHandler } from "../types"
import { domAppendChildren, domClearChildren, renderVdomElement, traverseVdom, vdomToDom } from "../dom"
import { getInternals, getVDOM, setVDOM } from "./internals"
import { eofolFatal } from "../component/logger"
import { htmlElementIndexOf } from "../util/dom"

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
      const parent = domUpdate.parentNode
      if (parent) {
        parent.childNodes.item(htmlElementIndexOf(domUpdate)).replaceWith(domUpdate)
      } else {
        // efl err
      }
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
