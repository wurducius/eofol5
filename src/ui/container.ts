import { defineFlat } from "../runtime"
import { div, e } from "../dom"

export const CONTAINER = "eofol-container"

defineFlat(CONTAINER, (props) => {
  return div("container-md", props.children)
})

export const container = (children) => e(CONTAINER, undefined, children, { children })
