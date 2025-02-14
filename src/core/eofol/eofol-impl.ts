import { findVdomElementById, vdomToDom } from "../vdom"
import { getVDOM, setVDOM } from "../../../project/src/internals"
import { EofolElement, EofolRenderHandler } from "../../types"
import { getRoot, selectRoot } from "./root"
import { eofolFatal } from "../../log"
import { getEnvEofolRootElementId } from "../../../project/src/env"
import { init } from "../../runtime"
import { replaceChildren } from "../../util"
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
export const eofolUpdateImpl = (id: string | undefined) => () => {
  const vdom = getVDOM()
  let head
  if (id) {
    head = findVdomElementById(vdom, id)
  } else {
    head = vdom
  }
  console.log(`eofolUpdate @ ${head?.id}`)
  const dom = vdomToDom(vdom)
  return eofolRender(dom as EofolElement)
}

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
