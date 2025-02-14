import { DefInternal, Instance, StateTransform } from "../../types"
import { mergeInstance } from "../../../project/src/internals"
import { eofolUpdate } from "../eofol"
import { mergeDeep } from "../../util"

const updateState = (idInstance: string, instance: Instance, nextState: any) => {
  mergeInstance(idInstance, { ...instance, state: nextState })
  eofolUpdate(idInstance)
}

export function getStateSetter<T>(idInstance: string, instance: Instance) {
  return function (nextState: T) {
    updateState(idInstance, instance, nextState)
  }
}

export function getStateMerge<T extends Record<string, any>>(idInstance: string, instance: Instance) {
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

export const initializeState = (def: DefInternal<any>) => (def.initialState ? { ...def.initialState } : {})

export function getStateTransforms<T>(idInstance: string, instance: Instance, initialState: T): StateTransform<T> {
  return {
    setState: getStateSetter(idInstance, instance),
    mergeState: getStateMerge(idInstance, instance),
    resetState: getResetState(idInstance, instance, initialState),
    state: getState(instance),
  }
}
