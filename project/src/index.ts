import { div, e, h1 } from "../../src/render"
import { COUNTER, EXAMPLE, FLAT } from "./components"
import { defineFlat } from "../../src/runtime"
import { EOFOL_ROOT_ELEMENT_ID } from "../../src/constants"
import { eofolInit } from "../../src/core"

const LAYOUT = "layout"

defineFlat(LAYOUT, () =>
  div(div(div([h1("Eofol5"), e(COUNTER), e(EXAMPLE), e(FLAT)], "m-md"), "flex-center-full flex-col"), "container-md"),
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
  div(div(div([h1("Eofol5"), e(COUNTER), e(EXAMPLE), e(FLAT)], "m-md"), "flex-center-full flex-col"), "container-md"),
])
