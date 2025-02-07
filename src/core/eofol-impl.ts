import { vdomToDom } from "../vdom"
import { getVDOM, setVDOM } from "../../project/src/internals"
import { EofolElement, EofolNode, EofolRenderHandler } from "../types"
import { getRoot, selectRoot } from "./root"
import { eofolFatal } from "../log"
import { getEnvEofolRootElementId } from "../../project/src/env"
import { init } from "../runtime"
import { domAppendChildren, domClearChildren, pipe } from "../util"
import { withErrorOverlay } from "../extract/error-overlay/error-overlay"

const eofolRenderImpl = (rootElement: Element, rendered: EofolNode) => {
  domClearChildren(rootElement)
  domAppendChildren(rendered, rootElement)
}

const eofolRender = (dom: EofolElement) => {
  const root = getRoot()
  if (root) {
    eofolRenderImpl(root, [dom])
  } else {
    eofolFatal(`Root element with id = "${getEnvEofolRootElementId()}" not found in DOM.`)
  }
}

const eofolInitImpl = (handler: EofolRenderHandler) => () => {
  selectRoot()
  const vdom = handler()
  setVDOM(vdom)
  eofolRender(vdomToDom(vdom) as EofolElement)
  init()
}

export const eofolInitImplWithOverlay = (handler: EofolRenderHandler) => () => {
  withErrorOverlay(eofolInitImpl(handler))
}

export const eofolUpdateImpl = pipe(getVDOM, vdomToDom, eofolRender)

export const eofolUnmountImpl = () => {
  const vdom = ""
  setVDOM(vdom)
  eofolRender(vdomToDom(vdom) as EofolElement)
}

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
