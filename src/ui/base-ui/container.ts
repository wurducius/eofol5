import { defineSimple } from "../util"
import { BASE } from "./components"

export const CONTAINER_STYLE = {
  md: "container-md",
}

export const container = defineSimple(BASE.container, CONTAINER_STYLE.md)
