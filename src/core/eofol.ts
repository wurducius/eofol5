import { EofolRenderHandler } from "../types"
import { withEofolLog } from "./helper"
import { eofolInitImplWithOverlay, eofolUpdateImpl } from "./eofol-impl"

export const eofolInit = (handler: EofolRenderHandler) =>
  withEofolLog("Eofol init", "Initial render", eofolInitImplWithOverlay(handler))

// eslint-disable-next-line no-unused-vars
export const eofolUpdate = (id: string) => withEofolLog("Eofol update", "Update render", eofolUpdateImpl)

export const forceUpdate = () => withEofolLog("Eofol force update", "Force update render", eofolUpdateImpl)
