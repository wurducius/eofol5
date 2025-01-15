import { button, div, eofolInit, h1 } from "../../src/dom"
import { showSnackbar } from "./snackbar"
import { defineComponent, getDef } from "./defs"
import { mergeInstance } from "./internals"

const generateString = (length: number) => () =>
  Array(length)
    .fill("")
    .map(() => Math.random().toString(36).charAt(2))
    .join("")

export const generateId = generateString(17)

defineComponent("eofol-component", {
  render: (state, setState) =>
    div(undefined, [
      h1(undefined, `EOFOL CUSTOM COMPONENT VALUE = ${state.value}`),
      button(
        undefined,
        "+",
        {},
        {
          onclick: () => {
            setState({ ...state, value: (state.value ?? 0) + 1 })
          },
        },
      ),
      button(
        undefined,
        "-",
        {},
        {
          onclick: () => {
            setState({ ...state, value: (state.value ?? 0) - 1 })
          },
        },
      ),
    ]),
})

const helloWorld = h1(undefined, "HELLO WORLD FROM EOFOL!!!")
const snackbarButton = button(undefined, "Show snackbar", undefined, { onclick: () => showSnackbar("TADA") })

const createInstance = (idDef: string) => {
  const def = getDef(idDef)
  if (def) {
    const idInstance = generateId()
    const instance = { id: idInstance, def: idDef, state: { value: 0 } }
    const state = instance.state
    const setState = (nextState) => {
      const nextInstance = { ...instance, state: nextState }
      // @ts-ignore
      mergeInstance(idInstance, nextInstance)
      // @ts-ignore
      const nextCustom = def.render(nextInstance.state, undefined)
      eofolInit("root", () => [
        div(undefined, [helloWorld, snackbarButton, nextCustom], {
          style:
            "display:flex; flex-direction: column; justify-content:center; align-items: center; height: 100%; font-size: 36px",
        }),
      ])
    }
    mergeInstance(idInstance, instance)
    return def.render(state, setState)
  } else {
    console.log("error @TODO")
    return undefined
  }
}

const customHello = createInstance("eofol-component")

// @ts-ignore
const container = div(undefined, [helloWorld, snackbarButton, customHello], {
  style:
    "display:flex; flex-direction: column; justify-content:center; align-items: center; height: 100%; font-size: 36px",
})

eofolInit("root", () => [container])
