import { EOFOL_RUNTIME_VERBOSE } from "../constants"

export const runtimeLog = (msg: string) => {
  if (EOFOL_RUNTIME_VERBOSE) {
    console.log(msg)
  }
}

export const runtimeDuration = (msg: string, startTime: number) =>
  // @ts-ignore
  runtimeLog(`${msg} ${((getTimeNanoseconds() - startTime).toFixed(0) / 1000).toFixed(1)} ms`)

export const getTimeNanoseconds = () => window.performance.now() * 1000
