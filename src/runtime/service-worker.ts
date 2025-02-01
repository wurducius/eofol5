import { BASE_URL, EOFOL_SERVICE_WORKER_FILENAME } from "../constants"
import { isBrowser } from "../util"
import { runtimeLog } from "../log"

export const registerServiceworker = () => {
  const hostname = window.location.hostname
  const isLocal = hostname === "localhost"
  if (isLocal) {
    runtimeLog("Skipping service worker registration because environment is local.")
  } else {
    if (isBrowser() && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register(`${BASE_URL}${EOFOL_SERVICE_WORKER_FILENAME}`)
        .then(() => {
          runtimeLog("Service worker registered.")
        })
        .catch(() => {
          runtimeLog("Cannot register service worker.")
        })
    }
  }
}
