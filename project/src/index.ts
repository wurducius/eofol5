import { e, h1, h2, eofolInit, centerFlex, centerFlexFull, col, container, numberInput } from "../../src"
import { COUNTER, EXAMPLE, FLAT } from "./components"
import { getEnvEofolName } from "./env"

/*
const LAYOUT = "layout"

defineComponent(LAYOUT, {
  render: () => container(centerFlexFull(col(div(div([h1("Eofol5"), e(COUNTER), e(EXAMPLE), e(FLAT)], "m-md"))))),
})

eofolInit(EOFOL_ROOT_ELEMENT_ID, () => [e(LAYOUT)])
*/

eofolInit(() =>
  container(
    centerFlexFull(
      col(
        [
          h1(getEnvEofolName()),
          h2("Controlled input example"),
          centerFlex(
            numberInput({
              initialValue: 42,
              onChange: (val) => {
                console.log(`Controlled input value changed: ${val}`)
              },
            }),
          ),
          e(COUNTER),
          e(EXAMPLE),
          e(FLAT),
        ],
        "m-md",
      ),
    ),
  ),
)
