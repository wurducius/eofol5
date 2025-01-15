import { domAppendChildren, domClearChildren } from "./children"
import { eofolFatal } from "../../project/src/util"

type EofolRenderHandler = () =>
  | string
  | HTMLElement
  | undefined
  | null
  | false
  | Array<string | HTMLElement | undefined | null | false>

const eofolRender = (rootElement: Element, renderHandler: EofolRenderHandler) => {
  domClearChildren(rootElement)
  const rendered = renderHandler()
  domAppendChildren(rendered, rootElement)
}

export const eofolInit = (rootElementId: string, handler: EofolRenderHandler) => {
  const root = document.getElementById(rootElementId)
  if (root) {
    eofolRender(root, handler)
  } else {
    eofolFatal(`Root element with id = "${rootElementId}" not found in DOM.`)
  }
}

export const eofolUpdate = (rootElementId: string, handler: EofolRenderHandler) => {
  const root = document.getElementById(rootElementId)
  if (root) {
    eofolRender(root, handler)
  } else {
    eofolFatal(`Root element with id = "${rootElementId}" not found in DOM.`)
  }
}
