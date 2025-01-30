import { defineFlat } from "../runtime"
import { div } from "../dom"

export const CONTAINER = "eofol-container"

defineFlat(CONTAINER, {
  render: (props) => {
    console.log(props)
    return div("container-md", props.children)
  },
})
