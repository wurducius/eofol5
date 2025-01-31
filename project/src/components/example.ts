import { defineComponent } from "../../../src/runtime"
import { div, h2 } from "../../../src/render"

export const EXAMPLE = "example"

defineComponent(EXAMPLE, {
  // @ts-ignore
  render: () => {
    return div([h2("Example")], "flex-center flex-col")
  },
  initialState: {},
})
