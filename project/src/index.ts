import { button, div, eofolInit, h1 } from "../../src/dom"
import { showSnackbar } from "./snackbar"

// import x from "eofol-dev-server"
//console.log(x && "DEPENDENCIES PRESENT")

const helloWorld = h1(undefined, "HELLO WORLD FROM EOFOL!!!")
const snackbarButton = button(undefined, "Show snackbar", undefined, { onclick: () => showSnackbar("TADA") })
const container = div(undefined, [helloWorld, snackbarButton], {
  style:
    "display:flex; flex-direction: column; justify-content:center; align-items: center; height: 100%; font-size: 36px",
})

eofolInit("root", () => [container])
