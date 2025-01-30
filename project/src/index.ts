import { div, e, eofolInit, h1 } from "../../src/dom"
import { COUNTER } from "./counter"
import { EXAMPLE } from "./example"

eofolInit("root", () => [
  div("container-md", div("flex-center-full flex-col", div("m-md", [h1(undefined, "Eofol5"), e(COUNTER), e(EXAMPLE)]))),
])
