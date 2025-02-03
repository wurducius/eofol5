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

export function getState(instance: Instance) {
  return { ...instance.state }
}

export function getStateTransforms<T>(idInstance: string, instance: Instance, initialState: T) {
  return {
    setState: getStateSetter(idInstance, instance),
    mergeState: getStateMerge(idInstance, instance),
    resetState: getResetState(idInstance, instance, initialState),
    state: getState(instance),
  }
}
