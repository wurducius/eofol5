import { div, e, eofolInit, h1 } from "../../src/dom"
import { COUNTER, EXAMPLE, FLAT } from "./components"
import { defineFlat } from "../../src/runtime"

const LAYOUT = "layout"

defineFlat(LAYOUT, {
  render: () =>
    div(
      "container-md",
      div("flex-center-full flex-col", div("m-md", [h1(undefined, "Eofol5"), e(COUNTER), e(EXAMPLE), e(FLAT)])),
    ),
})

// eofolInit("root", () => [e(LAYOUT)])

/*
eofolInit("root", () => [
  e(CONTAINER, undefined, [
    div("flex-center-full flex-col", div("m-md", [h1(undefined, "Eofol5"), e(COUNTER), e(EXAMPLE), e(FLAT)])),
  ]),
])
