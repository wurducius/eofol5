import { BASE_URL, EOFOL_SERVICE_WORKER_FILENAME } from "../constants"
import { isBrowser } from "../util"

export const registerServiceworker = () => {
  const hostname = window.location.hostname
  const isLocal = hostname === "localhost"
  if (isLocal) {
    console.log("Skipping service worker registration because environment is local.")
  } else {
    if (isBrowser() && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register(`${BASE_URL}${EOFOL_SERVICE_WORKER_FILENAME}`)
        .then(() => {
          console.log("Service worker registered.")
        })
        .catch(() => {
          console.log("Cannot register service worker.")
        })
    }
  }
}
