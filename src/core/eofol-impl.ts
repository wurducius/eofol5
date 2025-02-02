import { vdomToDom } from "../vdom"
import { getVDOM, setVDOM } from "../../project/src/internals"
import { EofolElement, EofolNode, EofolRenderHandler } from "../types"
import { getRoot, selectRoot } from "./root"
import { eofolFatal } from "../log"
import { getEnvEofolRootElementId } from "../../project/src/env"
import { init } from "../runtime"
import { withErrorOverlay } from "./helper"
import { domAppendChildren, domClearChildren } from "../util"

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
  eofolRender(vdomToDom(vdom))
  init()
}

export const eofolInitImplWithOverlay = (handler: EofolRenderHandler) => () => {
  withErrorOverlay(eofolInitImpl(handler))
}

export const eofolUpdateImpl = () => {
  eofolRender(vdomToDom(getVDOM()))
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
