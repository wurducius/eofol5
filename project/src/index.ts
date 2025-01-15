import { button, div, eofolInit, h1 } from "../../src/dom"
import { showSnackbar } from "./snackbar"
import { defineComponent, getDef } from "./defs"
import { mergeInstance } from "./internals"
import { generateId } from "../../src/util/crypto"

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
    return div(
      undefined,
      [
        h1(undefined, `EOFOL CUSTOM COMPONENT VALUE = ${state.value}`),
        div(
          undefined,
          [
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
          ],
          {
            style: "display:flex; flex-direction: row; justify-content:center; align-items: center;",
          },
        ),
      ],
      {
        style: "display:flex; flex-direction: column; justify-content:center; align-items: center;",
      },
    )
  },
  initialState: { value: 0 },
})

const helloWorld = h1(undefined, "HELLO WORLD FROM EOFOL!!!")
const snackbarButton = button(undefined, "Show snackbar", undefined, { onclick: () => showSnackbar("TADA") })

// @ts-ignore
const getStateSetter = (def, idInstance, instance) => (nextState) => {
  const nextInstance = { ...instance, state: nextState }
  // @ts-ignore
  mergeInstance(idInstance, nextInstance)
  // @ts-ignore
  const nextCustom = def.render(nextInstance.state, getStateSetter(def, idInstance, instance))
  eofolInit("root", () => [
    // @ts-ignore
    div(undefined, [helloWorld, snackbarButton, nextCustom], {
      style:
        "display:flex; flex-direction: column; justify-content:center; align-items: center; height: 100%; font-size: 36px",
    }),
  ])
}

const createInstance = (idDef: string) => {
  const def = getDef(idDef)
  if (def) {
    const idInstance = generateId()
    const instance = { id: idInstance, def: idDef, state: def.initialState ? { ...def.initialState } : {} }
    const state = instance.state
    // @ts-ignore
    const setState = getStateSetter(def, idInstance, instance)
    mergeInstance(idInstance, instance)
    // @ts-ignore
    return def.render(state, setState)
  } else {
    console.log("error @TODO")
    return undefined
  }
}

const customHello = createInstance(COUNTER)

// @ts-ignore
const container = div(undefined, [helloWorld, snackbarButton, customHello], {
  style:
    "display:flex; flex-direction: column; justify-content:center; align-items: center; height: 100%; font-size: 36px",
})

eofolInit("root", () => [container])
