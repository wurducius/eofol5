import { div, e, eofolInit, h1 } from "../../src/dom"
import { COUNTER, EXAMPLE, FLAT } from "./components"
import { defineFlat } from "../../src/runtime"
import { EOFOL_ROOT_ELEMENT_ID } from "../../src/constants"

const LAYOUT = "layout"

defineFlat(LAYOUT, () =>
  div(
    "container-md",
    div("flex-center-full flex-col", div("m-md", [h1(undefined, "Eofol5"), e(COUNTER), e(EXAMPLE), e(FLAT)])),
  ),
)

// eofolInit(EOFOL_ROOT_ELEMENT_ID, () => [e(LAYOUT)])

/*
eofolInit(EOFOL_ROOT_ELEMENT_ID, () => [
  e(CONTAINER, undefined, [
    div("flex-center-full flex-col", div("m-md", [h1(undefined, "Eofol5"), e(COUNTER), e(EXAMPLE), e(FLAT)])),
  ]),
])
*/

eofolInit(EOFOL_ROOT_ELEMENT_ID, () => [
  div(
    "container-md",
    div("flex-center-full flex-col", div("m-md", [h1(undefined, "Eofol5"), e(COUNTER), e(EXAMPLE), e(FLAT)])),
  ),
])
