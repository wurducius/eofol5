import { defineComponent, h2, centerFlex, col } from "../../../src"

export const EXAMPLE = "example"

defineComponent(EXAMPLE, {
  // @ts-ignore
  render: () => {
    return centerFlex(col(h2("Example")))
  },
})
