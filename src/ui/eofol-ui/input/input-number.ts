import { define } from "../../../runtime"
import { VDOM } from "../../../types"
import { inputGeneralDef, InputOptions, InputState } from "./input-general"
import { EofolUI } from "../components"
import { flexCol, flexRow } from "../../base-ui"
import { eButton } from "../button"

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
  return flexRow([
    children,
    flexCol([
      eButton({ children: "+", className: "input-number-arrow", onClick: handleIncrement(1) }),
      eButton({ children: "-", className: "input-number-arrow", onClick: handleIncrement(-1) }),
    ]),
  ])
}

export const numberInput = define<InputState<InputValueType>>(
  EofolUI.inputNumber,
  inputGeneralDef<InputValueType>(inputOptions, renderInputNumber),
)
