import { EofolNode, EofolRenderHandler } from "../types"
import { getInternals, getVDOM, setVDOM } from "../../project/src/internals"
import { eofolFatal, getTimeNanoseconds, runtimeDuration, runtimeLog } from "../log"
import { domAppendChildren, domClearChildren } from "../util"
import { renderVdomElement, vdomToDom } from "../vdom"
import { init } from "../runtime"
import { EOFOL_NAME } from "../constants"

const eofolRender = (rootElement: Element, rendered: EofolNode) => {
  domClearChildren(rootElement)
  domAppendChildren(rendered, rootElement)
}

let ROOT_ELEMENT: HTMLElement | undefined = undefined

export const getRootElement = () => ROOT_ELEMENT

export const eofolInit = (rootElementId: string, handler: EofolRenderHandler) => {
  runtimeLog("Eofol init")
  const timeStart = getTimeNanoseconds()
  try {
    const root = document.getElementById(rootElementId)
    if (root) {
      ROOT_ELEMENT = root
      const vdom = handler()
      setVDOM(vdom)
      const dom = vdomToDom(vdom)
      eofolRender(root, [dom])
    } else {
      eofolFatal(`Root element with id = "${rootElementId}" not found in DOM.`)
    }
    init()
    runtimeDuration("Initial render took", timeStart)
  } catch (ex: any) {
    console.error(`${EOFOL_NAME} compilation error: ${ex.message}${ex.stack ? ` - Stacktrace: ${ex.stack}` : ""}`)
    const overlayElementLoading = document.getElementById("_eofol-error-overlay-msg-title-loading")
    const overlayElementTitle = document.getElementById("_eofol-error-overlay-msg-title")
    const overlayElementContent = document.getElementById("_eofol-error-overlay-msg-content")
    const overlayElementStack = document.getElementById("_eofol-error-overlay-msg-stack")
    if (overlayElementLoading) {
      overlayElementLoading.innerHTML = ""
    }
    if (overlayElementTitle) {
      overlayElementTitle.innerHTML = `${EOFOL_NAME} compilation error:`
    }
    if (overlayElementContent) {
      overlayElementContent.innerHTML = ex.message
    }
    if (overlayElementStack && ex.stack) {
      overlayElementStack.innerHTML = ex.stack
    }
  }
}

// eslint-disable-next-line no-unused-vars
export const eofolUpdate = (id: string) => {
  /*
  const vdom = getVDOM()
  const vdomUpdate = traverseVdom(
    vdom,
    (vdomElement) => {
      if ("id" in vdomElement && vdomElement.id === id) {
        return true
      }
    },
    (vdomElement) => vdomElement,
  )*/
  runtimeLog("Eofol update")
  const timeStart = getTimeNanoseconds()
  const vdomUpdate = getVDOM()
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
  runtimeDuration("Update render took", timeStart)
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
