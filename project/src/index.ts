import { button, div, eofolInit, h1 } from "../../src/dom"
import { defineComponent } from "./defs"
import { createInstance } from "./stateful"

const COUNTER = "counter"

// @ts-ignore
const handleCounterClick = (state, setState) => (offset) => () => {
  setState({ ...state, value: (state.value ?? 0) + offset })
}

// @ts-ignore
const handleCounterClear = (state, setState) => () => {
  setState({ ...state, value: 0 })
}

defineComponent(COUNTER, {
  // @ts-ignore
  render: (state, setState) => {
    const handleClick = handleCounterClick(state, setState)
    return div("flex-center flex-col", [
      h1(undefined, `EOFOL CUSTOM COMPONENT VALUE = ${state.value}`),
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
  initialState: { value: 0 },
})

// const helloWorld = h1(undefined, "HELLO WORLD FROM EOFOL!!!")
// const snackbarButton = button(undefined, "Show snackbar", undefined, { onclick: () => showSnackbar("TADA") })

const customHello = createInstance(COUNTER)

// @ts-ignore
const container = div("flex-center-full flex-col", [customHello])

eofolInit("root", () => [container])
