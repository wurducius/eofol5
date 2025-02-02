import {
  h1,
  h2,
  eofolInit,
  centerFlex,
  centerFlexFull,
  col,
  container,
  numberInput,
  button,
  eofolForceUpdate,
  div,
  generateId,
  define,
} from "../../src"
import { getEnvEofolName } from "./env"
import counter from "./components/counter"
import example from "./components/example"
import flat from "./components/flat"

/*
const LAYOUT = "layout"

defineComponent(LAYOUT, {
  render: () => container(centerFlexFull(col(div(div([h1("Eofol5"), e(COUNTER), e(EXAMPLE), e(FLAT)], "m-md"))))),
})

eofolInit(EOFOL_ROOT_ELEMENT_ID, () => [e(LAYOUT)])
*/

const eForceUpdate = define("force-update", {
  render: () =>
    col([
      button("Force update", undefined, undefined, {
        onclick: () => {
          eofolForceUpdate()
        },
      }),
      div(`Nonce: ${generateId()}`),
    ]),
})

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
          counter(),
          example(),
          flat(),
          eForceUpdate(),
        ],
        "m-md",
      ),
    ),
  ),
)
