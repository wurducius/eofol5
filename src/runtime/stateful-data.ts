import { StatefulData } from "../types"
import { ERROR, LOADING, READY } from "../eofol-constants"

export const isReady = (data: StatefulData<any>) => data === READY

export const isLoading = (data: StatefulData<any>) => data === LOADING

export const isError = (data: StatefulData<any>) => data === ERROR

export const setLoading = (mergeState: any, dataSetter: any) => {
  mergeState({ ...dataSetter(LOADING) })
}
