import { registerServiceworker } from "./service-worker"
import { runtimeLog } from "../log"
import { getEnvServiceWorker } from "../../project/src/env"
import { stylesInit } from "../../project/src/theme"

export const init = () => {
  runtimeLog("Eofol initialized")
  stylesInit()
  if (getEnvServiceWorker()) {
    registerServiceworker()
  }
}
