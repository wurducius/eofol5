import { findVdomElementById, vdomToDom } from "../vdom"
import { getVDOM, setVDOM } from "../../../project/src/internals"
import { EofolElement, EofolRenderHandler, VDOM } from "../../types"
import { getRoot, selectRoot } from "./root"
import { eofolFatal } from "../../log"
import { getEnvEofolRootElementId } from "../../../project/src/env"
import { init } from "../../runtime"
import { replaceChildren } from "../../util"
import { withErrorOverlay } from "../../extract"

const eofolRender = (dom: EofolElement) => {
  const root = getRoot()
  if (root) {
    replaceChildren(root, [dom])
  } else {
    eofolFatal(`Root element with id = "${getEnvEofolRootElementId()}" not found in DOM.`)
  }
}

const eofolRenderVdom = (vdom: VDOM) => eofolRender(vdomToDom(vdom) as EofolElement)

const eofolInitImpl = (handler: EofolRenderHandler) => () => {
  selectRoot()
  const vdom = handler()
  setVDOM(vdom)
  eofolRenderVdom(vdom)
  init()
}

export const eofolInitImplWithOverlay = (handler: EofolRenderHandler) => () => {
  withErrorOverlay(eofolInitImpl(handler))
}
export const eofolUpdateImpl = (id: string | undefined) => () => {
  const vdom = getVDOM()
  const head = id ? findVdomElementById(vdom, id) : vdom
  console.log(`eofolUpdate @ ${head?.id}`)
  return eofolRenderVdom(head)
}

export const eofolUnmountImpl = () => {
  const vdom = ""
  setVDOM(vdom)
  eofolRenderVdom(vdom)
}
