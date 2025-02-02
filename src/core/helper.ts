import { getTimeNanoseconds, runtimeDuration, runtimeLog } from "../log"
import { getEnvEofolName } from "../../project/src/env"

export const withEofolLog = (startMsg: string, endMsg: string, handler: () => void) => {
  runtimeLog(startMsg)
  const timeStart = getTimeNanoseconds()
  handler()
  runtimeDuration(endMsg, timeStart)
}
export const withErrorOverlay = (handler: () => void) => {
  try {
    handler()
  } catch (ex: any) {
    console.error(
      `${getEnvEofolName()} compilation error: ${ex.message}${ex.stack ? ` - Stacktrace: ${ex.stack}` : ""}`,
    )
    const overlayElementLoading = document.getElementById("_eofol-error-overlay-msg-title-loading")
    const overlayElementTitle = document.getElementById("_eofol-error-overlay-msg-title")
    const overlayElementContent = document.getElementById("_eofol-error-overlay-msg-content")
    const overlayElementStack = document.getElementById("_eofol-error-overlay-msg-stack")
    if (overlayElementLoading) {
      overlayElementLoading.innerHTML = ""
    }
    if (overlayElementTitle) {
      overlayElementTitle.innerHTML = `${getEnvEofolName()} compilation error:`
    }
    if (overlayElementContent) {
      overlayElementContent.innerHTML = ex.message
    }
    if (overlayElementStack && ex.stack) {
      overlayElementStack.innerHTML = ex.stack
    }
  }
}
