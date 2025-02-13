import { EofolRenderHandler } from "../../types"
import { eofolInitImplWithOverlay, eofolUnmountImpl, eofolUpdateImpl } from "./eofol-impl"
import { withProfiler } from "../../extract/profiler/profiler"
import { appendChild } from "../../util"
import { getEnvEofolRootElementId } from "../../../project/src/env"

export const eofolMount = (handler: EofolRenderHandler) =>
  withProfiler("Eofol init", "Initial render", eofolInitImplWithOverlay(handler))

// eslint-disable-next-line no-unused-vars
export const eofolUpdate = (id: string) => withProfiler("Eofol update", "Update render", eofolUpdateImpl)

export const eofolForceUpdate = () => withProfiler("Eofol force update", "Force update render", eofolUpdateImpl)

export const eofolUnmount = () => withProfiler("Eofol unmount", "Unmount", eofolUnmountImpl)

export const eofolCreateRoot = (selectors?: string | undefined, tagName?: string) => {
  const parent = document.querySelector(selectors ?? "body")
  if (parent) {
    const root = document.createElement(tagName ?? "div")
    root.setAttribute("id", getEnvEofolRootElementId())
    appendChild(parent, root)
  } else {
    // efl err
  }
}
