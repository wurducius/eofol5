import { Instance } from "../types"
import { mergeInstance } from "../../project/src/internals"
import { eofolUpdate } from "../core"
import { mergeDeep } from "../util"

const updateState = (idInstance: string, instance: Instance, nextState: any) => {
  const nextInstance = { ...instance, state: nextState }
  mergeInstance(idInstance, nextInstance)
  eofolUpdate(idInstance)
}

export function getStateSetter<T>(idInstance: string, instance: Instance) {
  return function (nextState: T) {
    updateState(idInstance, instance, nextState)
  }
}

export function getStateMerge<T>(idInstance: string, instance: Instance) {
  return function (nextState: T) {
    updateState(idInstance, instance, mergeDeep(instance.state, nextState))
  }
}

export function getResetState<T>(idInstance: string, instance: Instance, initialState: T) {
  return function () {
    updateState(idInstance, instance, initialState)
  }
}
