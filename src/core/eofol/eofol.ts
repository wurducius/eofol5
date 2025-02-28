import { EofolRenderHandler } from "../../types"
import { eofolInitImplWithOverlay, eofolUnmountImpl, eofolUpdateImpl } from "./eofol-impl"
import { appendChild } from "../../util"
import { getEnvEofolRootElementId } from "../../../project/src/env"
import { withProfiler } from "../../extract"

export const eofolMount = (handler: EofolRenderHandler) =>
  withProfiler("Eofol init", "Initial render", eofolInitImplWithOverlay(handler))

export const eofolUpdate = (id: string) => withProfiler("Eofol update", "Update render", eofolUpdateImpl(id))

export const eofolForceUpdate = () =>
  withProfiler("Eofol force update", "Force update render", eofolUpdateImpl(undefined))

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
