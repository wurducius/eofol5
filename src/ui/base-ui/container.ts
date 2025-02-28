import { BASE } from "./components"
import { defineBase } from "./util"
import { sy } from "../../extract/sx"

const CONTAINER = {
  w: 800,
  px: 32,
  py: 32,
}

export const CONTAINER_STYLE = {
  md: sy("container-md", {
    maxWidth: `${CONTAINER.w}px`,
    margin: "0 auto 0 auto",
    textAlign: "center",
    padding: `${CONTAINER.px}px ${CONTAINER.py}px`,
    height: `calc(100% - ${CONTAINER.px + CONTAINER.py}px)`,
  }),
}

export const container = defineBase(BASE.container, CONTAINER_STYLE.md)
