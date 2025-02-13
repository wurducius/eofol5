import { getInstances } from "../../project/src/internals"
import { getDef } from "../runtime"
import { eofolUpdate } from "../core/eofol"
import { CreateStoreArg, Instance, Store } from "../types"
import { ax, mergeDeep } from "../util"

const storeRegistry: Record<string, Store<any>> = {}

export const getStore = (id: string) => storeRegistry[id]

export const getStoreState = (id: string) => {
  const store = getStore(id)
  return store?.state
}

const registerStore = (id: string, store: Store<any>) => {
  if (storeRegistry[id]) {
    // efl err
    return false
  } else {
    storeRegistry[id] = store
    return true
  }
}

export function getResetStore<T>(id: string, arg: CreateStoreArg<T>) {
  return function () {
    setStore(id, { ...arg.initialState })
  }
}

export function getActions<T, V>(id: string, arg: CreateStoreArg<T>) {
  if (arg.actions) {
    return Object.keys(arg.actions).reduce(
      (acc, next) => ({
        ...acc,
        [next]: (payload?: V) => {
          // @ts-ignore
          const action = arg.actions[next]
          const state = getStoreState(id)
          if (state) {
            const nextState = action(state as T, payload)
            mergeStore(id, nextState)
          } else {
            // efl err
          }
        },
      }),
      {},
    )
  }
}

export function getSelectors<T>(id: string, arg: CreateStoreArg<T>) {
  if (arg.selectors) {
    return Object.keys(arg.selectors).reduce((acc, next) => {
      // @ts-ignore
      const selector = arg.selectors[next]
      return {
        ...acc,
        [next]: () => {
          const state = getStoreState(id)
          if (state) {
            return selector(state)
          } else {
            // efl err
          }
        },
      }
    }, {})
  }
}

export function createStore<T>(id: string, arg: CreateStoreArg<T>) {
  const store = {
    id: id,
    state: { ...arg.initialState },
    initialState: arg.initialState,
    resetState: getResetStore<T>(id, arg),
  }
  const storeImpl = ax({ actions: getActions(id, arg), selectors: getSelectors(id, arg) }, store) as Store<T>
  const registered = registerStore(id, storeImpl)
  if (registered) {
    return storeImpl
  }
}

// eslint-disable-next-line no-unused-vars
export function selector<T, V>(id: string, projection?: (t: T) => V): V | undefined {
  const state = getStoreState(id)
  if (state) {
    return projection ? projection(state) : state
  } else {
    // efl err
  }
}

function updateSubscribed<T>(store: Store<T>) {
  const instances: Record<string, Instance> = getInstances()
  Object.keys(instances).forEach((instanceId) => {
    const instance = instances[instanceId]
    const def = getDef(instance.def)
    if (def?.subscribe) {
      const subscribeImpl = Array.isArray(def.subscribe) ? def.subscribe : [def.subscribe]
      if (subscribeImpl.includes(store.id)) {
        eofolUpdate(instanceId)
      }
    }
  })
}

export function setStoreImpl<T>(store: Store<T>, nextState: T) {
  store.state = nextState
  updateSubscribed<T>(store)
}

export function setStore<T>(id: string, nextState: T) {
  const store = getStore(id)
  if (store) {
    setStoreImpl(store, nextState)
  } else {
    // efl err
  }
}

export function mergeStore<T>(id: string, nextState: Partial<T>) {
  const store = getStore(id)
  if (store) {
    setStoreImpl(store, mergeDeep(store.state, nextState))
  } else {
    // efl err
  }
}
