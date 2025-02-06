import { VDOMChildren } from "../types"

export type StatefulData<T> = typeof READY | typeof LOADING | typeof ERROR | T

export const READY = undefined

export const isReady = (data: StatefulData<any>) => data === READY

export const LOADING = "LOADING"

export const isLoading = (data: StatefulData<any>) => data === LOADING

export const ERROR = "ERROR"

export const isError = (data: StatefulData<any>) => data === ERROR

export function renderCase<T>(
  arg: {
    ready: () => VDOMChildren
    loading: () => VDOMChildren
    error?: () => VDOMChildren
    // eslint-disable-next-line no-unused-vars
    good: (data: T) => VDOMChildren
  },
  data: StatefulData<any>,
) {
  if (isReady(data)) {
    return arg.ready()
  } else if (isLoading(data)) {
    return arg.loading()
  } else if (arg.error && isError(data)) {
    return arg.error()
  } else {
    return arg.good(data)
  }
}
