import { BASE } from "./components"
import { defineBase } from "./util"

export const CONTAINER_STYLE = {
  md: "container-md",
}

export const container = defineBase(BASE.container, CONTAINER_STYLE.md)
