import { isBrowser } from "../util"
import { runtimeLog } from "../log"
import { getEnvBaseUrl, getEnvEofolServiceWorkerFilename } from "../../project/src/env"

export const registerServiceworker = () => {
  const hostname = window.location.hostname
  const isLocal = hostname === "localhost"
  if (isLocal) {
    runtimeLog("Skipping service worker registration because environment is local.")
  } else {
    if (isBrowser() && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register(`${getEnvBaseUrl()}${getEnvEofolServiceWorkerFilename()}`)
        .then(() => {
          runtimeLog("Service worker registered.")
        })
        .catch(() => {
          runtimeLog("Cannot register service worker.")
        })
    }
  }
}
