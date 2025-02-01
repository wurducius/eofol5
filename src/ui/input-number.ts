import { defineComponent } from "../runtime"
import { button, e, input } from "../render"
import { col, row } from "./flex"

export const INPUT_NUMBER = "eofol-input-number"

const handleIncrementGeneral = (state, mergeState, onChange) => (offset) => () => {
  const nextValue = (state.value ?? 0) + offset
  mergeState({ value: nextValue })
  if (onChange) {
    onChange(nextValue)
  }
}

defineComponent(INPUT_NUMBER, {
  // @ts-ignore
  render: (state, mergeState, props) => {
    /*
    if (!state.initialized && props.initialValue !== undefined && state.value !== props.initialValue) {
      mergeState({ value: props.initialValue, initialized: true })
    }
     */
    const handleIncrement = handleIncrementGeneral(state, mergeState, props.onChange)

    // @TODO aria label
    return row([
      input(
        undefined,
        undefined,
        { value: state.value.toString(), type: "number", "aria-label": "input-number" },
        {
          onchange: (e: { target: { value: string } }) => {
            const nextValue = Number(e.target.value ?? "0")
            mergeState({ value: nextValue })
            if (props.onChange) {
              props.onChange(nextValue)
            }
          },
        },
      ),
      col([
        button("+", "input-number-arrow", undefined, {
          onclick: handleIncrement(1),
        }),
        button("-", "input-number-arrow", undefined, {
          onclick: handleIncrement(-1),
        }),
      ]),
    ])
  },
  initialState: { value: 0, initialized: false },
})

// eslint-disable-next-line no-unused-vars
export const numberInput = (props: { initialValue: number; onChange: (nextValue: number) => void }) =>
  e(INPUT_NUMBER, undefined, undefined, { initialValue: props.initialValue, onChange: props.onChange })
