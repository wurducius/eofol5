import { h1, h2, eofolInit, centerFlex, centerFlexFull, col, container, numberInput } from "../../src"
import { getEnvEofolName } from "./env"
import { counter, example, flat, forceUpdate } from "./components"

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
          forceUpdate(),
        ],
        "m-md",
      ),
    ),
  ),
)
