import { VDOM } from "../../../types"
import { input } from "../../simple"

export type InputState<T> = { value: T | undefined }

export type InputOptions<T> = {
  type: string
  defaultValue: T
  // eslint-disable-next-line no-unused-vars
  parse: (x: string) => T
  // eslint-disable-next-line no-unused-vars
  unparse: (x: T) => string
}

function renderInputGeneral<T>(a: {
  state: InputState<T>
  mergeState: any
  onChange: any
  value: T
  inputOptions: InputOptions<T>
}) {
  const { onChange, value, inputOptions } = a
  return input(
    undefined,
    "",
    { type: inputOptions.type, value: inputOptions.unparse(value), "aria-label": "input-number" },
    {
      onchange: (e: { target: { value: string } }) => {
        if (onChange) {
          onChange(inputOptions.parse(e.target.value))
        }
      },
    },
  )
}

// eslint-disable-next-line no-unused-vars
export function inputGeneralDef<T>(inputOptions: InputOptions<T>, render?: (children: VDOM, a) => VDOM) {
  return {
    getDerivedStateFromProps: (a) =>
      a.state.value === undefined ? { value: a.props.value ?? inputOptions.defaultValue } : { value: a.state.value },
    render: (a) => {
      const { state, mergeState } = a
      const value = state.value ?? inputOptions.defaultValue
      const onChange = (nextValue: T) => {
        mergeState({ value: nextValue })
      }
      const arg = { state, mergeState, value, onChange, inputOptions }
      const rendered = renderInputGeneral(arg)
      return render ? render(rendered, arg) : rendered
    },
    initialState: { value: undefined },
  }
}
