import { EofolRenderHandler } from "../types"
import { eofolInitImplWithOverlay, eofolUpdateImpl } from "./eofol-impl"
import { withProfiler } from "../extract/profiler/profiler"

export const eofolInit = (handler: EofolRenderHandler) =>
  withProfiler("Eofol init", "Initial render", eofolInitImplWithOverlay(handler))

// eslint-disable-next-line no-unused-vars
export const eofolUpdate = (id: string) => withProfiler("Eofol update", "Update render", eofolUpdateImpl)

export const eofolForceUpdate = () => withProfiler("Eofol force update", "Force update render", eofolUpdateImpl)
