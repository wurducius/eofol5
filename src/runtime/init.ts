import { registerServiceworker } from "./service-worker"
import { EOFOL_NAME } from "../constants"
import { runtimeLog } from "../log"

export const init = () => {
  runtimeLog(`${EOFOL_NAME} init`)
  registerServiceworker()
}
