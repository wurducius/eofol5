import { StatefulData, VDOMChildren } from "../types"
import { centerFlex, spinner } from "../ui"
import { div } from "../render"
import { isError, isLoading, isReady } from "./stateful-data"

const readyDefault = () => centerFlex(div("Ready..."))

const loadingDefault = () => centerFlex(spinner())

const errorDefault = (errorData?: string) => centerFlex(div(errorData ? `Error: ${errorData}` : "Error"))

export function renderCase<T>(
  arg: {
    ready?: () => VDOMChildren
    loading?: () => VDOMChildren
    // eslint-disable-next-line no-unused-vars
    error?: (errorData?: string) => VDOMChildren
    // eslint-disable-next-line no-unused-vars
    good: (data: T) => VDOMChildren
  },
  data: StatefulData<any>,
  errorData?: string,
) {
  if (isReady(data)) {
    return arg.ready ? arg.ready() : readyDefault()
  } else if (isLoading(data)) {
    return arg.loading ? arg.loading() : loadingDefault()
  } else if (isError(data)) {
    return arg.error ? arg.error(errorData) : errorDefault(errorData)
  } else {
    return arg.good(data)
  }
}
