import { button, define, div, eofolForceUpdate, eofolUnmount, generateId } from "../../../src"

export default define("forceUpdate", {
  render: () =>
    div([
      button("Force update", undefined, undefined, {
        onclick: () => {
          eofolForceUpdate()
        },
      }),
      div(`Nonce: ${generateId()}`),
      button("Unmount eofol", undefined, undefined, {
        onclick: () => {
          eofolUnmount()
        },
      }),
    ]),
})
