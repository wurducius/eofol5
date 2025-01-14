import { domAppendChildren, domClearChildren } from "./children"

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
    console.error(`Eofol root element with id = "${rootElementId}" not found.`)
  }
}
