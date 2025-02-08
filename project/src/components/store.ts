import { col, createStore, define, div, eButton, mergeStore, selector } from "../../../src"

const STORE_TEST = "store-test"

type StoreTest = { value: number; x: string }

const actionTest = (_state: StoreTest, payload: number) => ({ value: payload })

const selectorTest = (state: StoreTest) => state.x

const store = createStore<StoreTest>(STORE_TEST, {
  initialState: { value: 42, x: "tada" },
  actions: { actionTest },
  selectors: { selectorTest },
})

// @ts-ignore
export default define("store", {
  render: () => {
    const value = selector<StoreTest, number>(STORE_TEST, (state) => state.value) ?? 0
    const x = selector<StoreTest, string>(STORE_TEST, (state) => state.x)
    return col([
      div(`STORE TEST = ${value}, x = ${x}`),
      div([
        eButton("Add store value", () => {
          mergeStore<StoreTest>(STORE_TEST, { value: value + 1 })
        }),
        eButton("Modify store x", () => {
          mergeStore<StoreTest>(STORE_TEST, { x: "Changed" })
        }),
        eButton("Action", () => {
          store?.actions?.actionTest(69)
        }),

        eButton("Reset store", () => {
          store?.resetState()
        }),
        eButton("Selector", () => {
          console.log(store?.selectors?.selectorTest())
        }),
      ]),
    ])
  },
  subscribe: [STORE_TEST],
})
