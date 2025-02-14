import { define, eButton, eFlex, flexCenter, flexCol, flexRow, h2, input, SetState } from "../../../src"

export type CounterState = { value: number; increment: number }

const handleCounterClick = (state: any, mergeState: SetState<any>) => (offset: number) => () => {
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

export default define<CounterState>("counter", {
  constructor: () => {},
  // @ts-ignore
  render: (a) => {
    const { state, mergeState } = a
    const handleClick = handleCounterClick(state, mergeState)
    const handleIncrement = handleIncrementChange(state, mergeState)

    return flexCenter(
      eFlex({
        children: [
          h2(`Stateful component counter value = ${state.value}`),
          flexCenter(
            flexRow([
              eButton({ children: "+", onClick: handleClick(1) }),
              eButton({ children: "-", onClick: handleClick(-1) }),
              input(
                undefined,
                undefined,
                { value: state?.increment?.toString() ?? 0, type: "number", "aria-label": "counter" },
                {
                  onchange: (e: { target: { value: any } }) => {
                    mergeState({ increment: Number(e.target.value ?? "0") })
                  },
                },
              ),
              flexCol([
                eButton({ children: "+", onClick: handleIncrement(1), className: "input-number-arrow" }),
                eButton({ children: "-", onClick: handleIncrement(-1), className: "input-number-arrow" }),
              ]),
              eButton({
                children: "Add amount",
                onClick: () => {
                  mergeState({ value: (state.value ?? 0) + (state?.increment ?? 0) })
                },
              }),
              eButton({
                children: "Clear",
                onClick: handleCounterClear(mergeState),
              }),
            ]),
          ),
        ],
        center: true,
        direction: "col",
      }),
    )
  },
  initialState: { value: 0, increment: 1 },
})
