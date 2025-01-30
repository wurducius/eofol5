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
*/

// @TODO extract try/catch block
try {
  eofolInit("root", () => [
    div(
      "container-md",
      div("flex-center-full flex-col", div("m-md", [h1(undefined, "Eofol5"), e(COUNTER), e(EXAMPLE), e(FLAT)])),
    ),
  ])
} catch (ex: any) {
  console.error(`Eofol5 compilation error: ${ex.message}${ex.stack ? ` - Stack: ${ex.stack}` : ""}`)
  const overlayElementTitle = document.getElementById("_eofol-error-overlay-msg-title")
  const overlayElementContent = document.getElementById("_eofol-error-overlay-msg-content")
  const overlayElementStack = document.getElementById("_eofol-error-overlay-msg-stack")
  if (overlayElementTitle) {
    overlayElementTitle.innerHTML = "Eofol5 compilation error:"
  }
  if (overlayElementContent) {
    overlayElementContent.innerHTML = ex.message
  }
  if (overlayElementStack && ex.stack) {
    overlayElementStack.innerHTML = ex.stack
  }
}
