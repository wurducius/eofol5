import { getEnvEofolRootElementId } from "../../../project/src/env"
import { eofolFatal } from "../../log"
import { selectElementById } from "../../util"

let ROOT_ELEMENT: HTMLElement | undefined = undefined

export const getRoot = () => ROOT_ELEMENT

const setRoot = (e: HTMLElement | undefined) => {
  ROOT_ELEMENT = e
}

export const selectRoot = () => {
  selectElementById(
    getEnvEofolRootElementId(),
    (e) => {
      setRoot(e)
    },
    (id) => {
      eofolFatal(`Root element with id = "${id}" not found in DOM.`)
      throw new Error(`Root element with id = "${id}" not found in DOM.`)
    },
  )
}
