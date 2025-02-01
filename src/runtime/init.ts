import { registerServiceworker } from "./service-worker"
import { runtimeLog } from "../log"

export const init = () => {
  runtimeLog("Eofol initialized")
  registerServiceworker()
}
