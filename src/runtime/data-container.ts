import { StatefulData, VDOMChildren } from "../types"
import { ERROR, LOADING, READY } from "../eofol-constants"

export const isReady = (data: StatefulData<any>) => data === READY

export const isLoading = (data: StatefulData<any>) => data === LOADING

export const isError = (data: StatefulData<any>) => data === ERROR

export const setLoading = (mergeState: any, dataSetter: any) => {
  mergeState({ ...dataSetter(LOADING) })
}

export function renderCase<T>(
  arg: {
    ready: () => VDOMChildren
    loading: () => VDOMChildren
    // eslint-disable-next-line no-unused-vars
    error?: (errorData?: string) => VDOMChildren
    // eslint-disable-next-line no-unused-vars
    good: (data: T) => VDOMChildren
  },
  data: StatefulData<any>,
  errorData?: string,
) {
  if (isReady(data)) {
    return arg.ready()
  } else if (isLoading(data)) {
    return arg.loading()
  } else if (arg.error && isError(data)) {
    return arg.error(errorData)
  } else {
    return arg.good(data)
  }
}
