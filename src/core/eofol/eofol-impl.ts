import { vdomToDom } from "../vdom"
import { getVDOM, setVDOM } from "../../../project/src/internals"
import { EofolElement, EofolRenderHandler } from "../../types"
import { getRoot, selectRoot } from "./root"
import { eofolFatal } from "../../log"
import { getEnvEofolRootElementId } from "../../../project/src/env"
import { init } from "../../runtime"
import { pipe, replaceChildren } from "../../util"
import { withErrorOverlay } from "../../extract/error-overlay/error-overlay"

const eofolRender = (dom: EofolElement) => {
  const root = getRoot()
  if (root) {
    replaceChildren(root, [dom])
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
