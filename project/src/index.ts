import { div, e, h1 } from "../../src/render"
import { COUNTER, EXAMPLE, FLAT } from "./components"
import { EOFOL_NAME, EOFOL_ROOT_ELEMENT_ID } from "../../src/constants"
import { eofolInit } from "../../src/core"
import { centerFlexFull, col, container } from "../../src/ui"

/*
const LAYOUT = "layout"

defineComponent(LAYOUT, {
  render: () => container(centerFlexFull(col(div(div([h1("Eofol5"), e(COUNTER), e(EXAMPLE), e(FLAT)], "m-md"))))),
})

eofolInit(EOFOL_ROOT_ELEMENT_ID, () => [e(LAYOUT)])
*/

eofolInit(EOFOL_ROOT_ELEMENT_ID, () =>
  container(centerFlexFull(col(div(div([h1(EOFOL_NAME), e(COUNTER), e(EXAMPLE), e(FLAT)], "m-md"))))),
)
