import { defineComponent } from "./defs"
import { button, div, eDom, eofolInit, h1, input } from "../../src/dom"

const COUNTER = "counter"

// @ts-ignore
const handleCounterClick = (state, setState) => (offset) => () => {
  setState({ ...state, value: Math.max(state.value < 0 ? 0 : (state.value ?? 0) + offset, 0) })
}

// @ts-ignore
const handleCounterClear = (state, setState) => () => {
  setState({ ...state, value: 0 })
}

defineComponent<{ value: number; increment: number }>(COUNTER, {
  // @ts-ignore
  // eslint-disable-next-line no-unused-vars
  render: (state, setState, props) => {
    const handleClick = handleCounterClick(state, setState)
    return div("flex-center flex-col", [
      h1(undefined, `Stateful component counter value = ${state.value}`),
      div("flex-center flex-row", [
        button(
          undefined,
          "+",
          {},
          {
            onclick: handleClick(1),
          },
        ),
        input(
          undefined,
          undefined,
          { value: state.increment.toString(), type: "number" },
          {
            onchange: (e: { target: { value: any } }) => {
              setState({ ...state, increment: Number(e.target.value ?? "0") })
            },
          },
        ),
        button(
          undefined,
          "Add amount",
          {},
          {
            onclick: () => {
              setState({ ...state, value: (state.value ?? 0) + state.increment })
            },
          },
        ),
        button(
          undefined,
          "-",
          {},
          {
            onclick: handleClick(-1),
          },
        ),
        button(
          undefined,
          "Clear",
          {},
          {
            onclick: handleCounterClear(state, setState),
          },
        ),
      ]),
    ])
  },
  initialState: { value: 0, increment: 1 },
})

eofolInit("root", () => [
  div("container-md", div("flex-center-full flex-col", [h1(undefined, "Eofol5"), eDom(COUNTER)])),
])
