import { defineComponent } from "../../../src/runtime"
import { div, h2 } from "../../../src/dom"

export const EXAMPLE = "example"

defineComponent(EXAMPLE, {
  // @ts-ignore
  // eslint-disable-next-line no-unused-vars
  render: (state, setState, props) => {
    return div("flex-center flex-col", [h2(undefined, "Example")])
  },
  initialState: {},
})
