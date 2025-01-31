import { defineComponent } from "../../../src/runtime"
import { button, div, h2, input } from "../../../src/dom"

export const COUNTER = "counter"

// @ts-ignore
const handleCounterClick = (state, mergeState) => (offset) => () => {
  mergeState({ value: Math.max(state.value < 0 ? 0 : (state.value ?? 0) + offset, 0) })
}

// @ts-ignore
const handleCounterClear = (mergeState) => () => {
  mergeState({ value: 0 })
}

// @ts-ignore
const handleIncrementChange = (state, mergeState) => (offset) => () => {
  mergeState({ increment: (state.increment ?? 0) + offset })
}

defineComponent<{ value: number; increment: number }>(COUNTER, {
  // @ts-ignore
  render: (state, mergeState) => {
    const handleClick = handleCounterClick(state, mergeState)
    const handleIncrement = handleIncrementChange(state, mergeState)

    return div("flex-center flex-col", [
      h2(undefined, `Stateful component counter value = ${state.value}`),
      div("flex-center flex-row", [
        button(
          undefined,
          "+",
          {},
          {
            onclick: handleClick(1),
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
        input(
          undefined,
          undefined,
          { value: state.increment.toString(), type: "number" },
          {
            onchange: (e: { target: { value: any } }) => {
              mergeState({ increment: Number(e.target.value ?? "0") })
            },
          },
        ),
        div("flex-col", [
          button(
            "input-number-arrow",
            "+",
            {},
            {
              onclick: handleIncrement(1),
            },
          ),
          button(
            "input-number-arrow",
            "-",
            {},
            {
              onclick: handleIncrement(-1),
            },
          ),
        ]),
        button(
          undefined,
          "Add amount",
          {},
          {
            onclick: () => {
              mergeState({ value: (state.value ?? 0) + state.increment })
            },
          },
        ),
        button(
          undefined,
          "Clear",
          {},
          {
            onclick: handleCounterClear(mergeState),
          },
        ),
      ]),
    ])
  },
  initialState: { value: 0, increment: 1 },
})
