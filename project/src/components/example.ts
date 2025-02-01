import { defineComponent } from "../../../src/runtime"
import { h2 } from "../../../src/render"
import { centerFlex, col } from "../../../src/ui"

export const EXAMPLE = "example"

defineComponent(EXAMPLE, {
  // @ts-ignore
  render: () => {
    return centerFlex(col(h2("Example")))
  },
})
