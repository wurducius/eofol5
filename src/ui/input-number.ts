import { defineComponent } from "../runtime"
import { button } from "../simple"
import { col, row } from "./flex"
import { VDOM } from "../types"
import { inputGeneralDef, InputOptions, InputState } from "./input-general"

type InputValueType = number

const handleIncrementGeneral =
  (
    state: InputState<InputValueType>,
    // eslint-disable-next-line no-unused-vars
    mergeState: (nextState: Partial<InputState<InputValueType>>) => void,
    // eslint-disable-next-line no-unused-vars
    onChange: (nextValue: InputValueType) => void,
  ) =>
  (offset: InputValueType) =>
  () => {
    const nextValue = (state.value ?? inputOptions.defaultValue) + offset
    mergeState({ value: nextValue })
    if (onChange) {
      onChange(nextValue)
    }
  }

const inputOptions: InputOptions<InputValueType> = {
  type: "number",
  defaultValue: 0,
  parse: Number,
  unparse: (x: InputValueType) => x.toString(),
}

const renderInputNumber = (children: VDOM, a) => {
  const { state, mergeState, onChange } = a
  const handleIncrement = handleIncrementGeneral(state, mergeState, onChange)
  return row([
    children,
    col([
      button("+", "input-number-arrow", undefined, {
        onclick: handleIncrement(1),
      }),
      button("-", "input-number-arrow", undefined, {
        onclick: handleIncrement(-1),
      }),
    ]),
  ])
}

defineComponent<InputState<InputValueType>>(
  "inputNumber",
  inputGeneralDef<InputValueType>(inputOptions, renderInputNumber),
)
