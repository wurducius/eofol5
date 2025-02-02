import { button, col, define, div, eofolForceUpdate, generateId } from "../../../src"

export default define("force-update", {
  render: () =>
    col([
      button("Force update", undefined, undefined, {
        onclick: () => {
          eofolForceUpdate()
        },
      }),
      div(`Nonce: ${generateId()}`),
    ]),
})
