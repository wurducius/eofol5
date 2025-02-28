import { getEnvEofolName } from "../../project/src/env"
import { selectElementById } from "../util"

export const withErrorOverlay = (handler: () => void) => {
  try {
    return handler()
  } catch (ex: any) {
    console.error(
      `${getEnvEofolName()} compilation error: ${ex.message}${ex.stack ? ` - Stacktrace: ${ex.stack}` : ""}`,
    )
    selectElementById("_eofol-error-overlay-msg-title-loading", (e) => {
      // @ts-ignore
      e.setAttribute("style", "display: none;")
    })
    selectElementById("_eofol-error-overlay-container-error", (e) => {
      // @ts-ignore
      e.setAttribute("style", "display: flex;")
    })
    selectElementById("_eofol-error-overlay-msg-title", (e) => {
      e.innerHTML = `${getEnvEofolName()} compilation error:`
    })
    selectElementById("_eofol-error-overlay-msg-content", (e) => {
      e.innerHTML = ex.message
    })
    if (ex.stack) {
      selectElementById("_eofol-error-overlay-msg-stack", (e) => {
        e.innerHTML = ex.stack
      })
    }
  }
}
