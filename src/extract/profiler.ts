import { getTimeNanoseconds, runtimeDuration, runtimeLog } from "../log"

export const withProfiler = (startMsg: string, endMsg: string, handler: () => void) => {
  runtimeLog(startMsg)
  const timeStart = getTimeNanoseconds()
  handler()
  runtimeDuration(endMsg, timeStart)
}
