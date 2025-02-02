import { define, h2, centerFlex, col } from "../../../src"

const EXAMPLE = "example"

export default define(EXAMPLE, {
  // @ts-ignore
  render: () => {
    return centerFlex(col(h2("Example")))
  },
})
