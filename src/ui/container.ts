import { defineFlat } from "../runtime"
import { div, e } from "../dom"

export const CONTAINER = "eofol-container"

defineFlat(CONTAINER, (props) => {
  return div(props.children, "container-md")
})

export const container = (children) => e(CONTAINER, children, undefined, { children })
