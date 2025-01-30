import { defineComponent } from "../../../src/runtime"
import { div, h2 } from "../../../src/dom"

export const EXAMPLE = "example"

defineComponent(EXAMPLE, {
  // @ts-ignore
  render: () => {
    return div("flex-center flex-col", [h2(undefined, "Example")])
  },
  initialState: {},
})
