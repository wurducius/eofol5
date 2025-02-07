import { centerFlex, col, row, define, h2, button, input, div } from "../../../src"

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

export default define<{ value: number; increment: number }>("counter", {
  // @ts-ignore
  render: (a) => {
    const { state, mergeState } = a

    const handleClick = handleCounterClick(state, mergeState)
    const handleIncrement = handleIncrementChange(state, mergeState)

    return centerFlex(
      col(
        [
          h2(`Stateful component counter value = ${state.value}`),
          centerFlex(
            row([
              button(
                "+",
                undefined,
                {},
                {
                  onclick: handleClick(1),
                },
              ),
              button(
                "-",
                undefined,
                {},
                {
                  onclick: handleClick(-1),
                },
              ),
              input(
                undefined,
                undefined,
                { value: state.increment.toString(), type: "number", "aria-label": "counter" },
                {
                  onchange: (e: { target: { value: any } }) => {
                    mergeState({ increment: Number(e.target.value ?? "0") })
                  },
                },
              ),
              div(
                [
                  button(
                    "+",
                    "input-number-arrow",
                    {},
                    {
                      onclick: handleIncrement(1),
                    },
                  ),
                  button(
                    "-",
                    "input-number-arrow",
                    {},
                    {
                      onclick: handleIncrement(-1),
                    },
                  ),
                ],
                "flex-col",
              ),
              button(
                "Add amount",
                undefined,
                {},
                {
                  onclick: () => {
                    mergeState({ value: (state.value ?? 0) + state.increment })
                  },
                },
              ),
              button(
                "Clear",
                undefined,
                {},
                {
                  onclick: handleCounterClear(mergeState),
                },
              ),
            ]),
          ),
        ],
        undefined,
        { className: "flex-center" },
      ),
    )
  },
  initialState: { value: 0, increment: 1 },
  constructor: () => {
    console.log("CONSTRUCTOR")
    return { constructed: true }
  },
})
