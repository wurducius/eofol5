export const SERVICE_WORKER = {
  SCRIPT_FILENAME: "service-worker.js",
}

export const BASE_URL = "/"

export const isBrowser = () => typeof window !== "undefined" && typeof window.document !== "undefined"

export const registerServiceworker = () => {
  const hostname = window.location.hostname
  const isLocal = hostname === "localhost"
  if (isLocal) {
    console.log("Skipping service worker registration because environment is local.")
  } else {
    if (isBrowser() && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register(`${BASE_URL}${SERVICE_WORKER.SCRIPT_FILENAME}`)
        .then(() => {
          console.log("Service worker registered.")
        })
        .catch(() => {
          console.log("Cannot register service worker.")
        })
    }
  }
}
