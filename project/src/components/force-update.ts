import { define, div, eButton, eofolForceUpdate, eofolUnmount, generateId } from "../../../src"

// @ts-ignore
export default define("forceUpdate", {
  render: () =>
    div([
      eButton({ children: "Force update", onClick: eofolForceUpdate }),
      div(`Nonce: ${generateId()}`),
      eButton({ children: "Unmount eofol", onClick: eofolUnmount }),
    ]),
})
