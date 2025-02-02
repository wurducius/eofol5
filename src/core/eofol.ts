import { EofolRenderHandler } from "../types"
import { eofolInitImplWithOverlay, eofolUpdateImpl } from "./eofol-impl"
import { withEofolLog } from "../extract/eofol-log"

export const eofolInit = (handler: EofolRenderHandler) =>
  withEofolLog("Eofol init", "Initial render", eofolInitImplWithOverlay(handler))

// eslint-disable-next-line no-unused-vars
export const eofolUpdate = (id: string) => withEofolLog("Eofol update", "Update render", eofolUpdateImpl)

export const eofolForceUpdate = () => withEofolLog("Eofol force update", "Force update render", eofolUpdateImpl)
