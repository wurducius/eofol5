import { EOFOL_RUNTIME_VERBOSE } from "../constants"

export const runtimeLog = (msg: string) => {
  if (EOFOL_RUNTIME_VERBOSE) {
    console.log(msg)
  }
}
