import { getEnvEofolRootElementId } from "../../project/src/env"
import { eofolFatal } from "../log"

let ROOT_ELEMENT: HTMLElement | undefined = undefined

export const getRoot = () => ROOT_ELEMENT

export const selectRoot = () => {
  const rootElementId = getEnvEofolRootElementId()
  const root = document.getElementById(rootElementId)
  if (root) {
    ROOT_ELEMENT = root
    return root
  } else {
    eofolFatal(`Root element with id = "${rootElementId}" not found in DOM.`)
    throw new Error(`Root element with id = "${rootElementId}" not found in DOM.`)
  }
}
