import {
  e,
  h1,
  h2,
  EOFOL_NAME,
  EOFOL_ROOT_ELEMENT_ID,
  eofolInit,
  centerFlex,
  centerFlexFull,
  col,
  container,
  numberInput,
} from "../../src"
import { COUNTER, EXAMPLE, FLAT } from "./components"

/*
const LAYOUT = "layout"

defineComponent(LAYOUT, {
  render: () => container(centerFlexFull(col(div(div([h1("Eofol5"), e(COUNTER), e(EXAMPLE), e(FLAT)], "m-md"))))),
})

eofolInit(EOFOL_ROOT_ELEMENT_ID, () => [e(LAYOUT)])
*/

eofolInit(EOFOL_ROOT_ELEMENT_ID, () =>
  container(
    centerFlexFull(
      col(
        [
          h1(EOFOL_NAME),
          h2("Controlled input example"),
          centerFlex(
            numberInput({
              initialValue: 42,
              onChange: (val) => {
                console.log(val)
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
