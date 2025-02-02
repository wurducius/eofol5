import { getEnvEofolRuntimeVerbose } from "../../project/src/env"

export const runtimeLog = (msg: string) => {
  if (getEnvEofolRuntimeVerbose()) {
    console.log(msg)
  }
}

export const runtimeDuration = (msg: string, startTime: number) =>
  // @ts-ignore
  runtimeLog(`${msg} took ${((getTimeNanoseconds() - startTime).toFixed(0) / 1000).toFixed(1)} ms`)

export const getTimeNanoseconds = () => window.performance.now() * 1000
