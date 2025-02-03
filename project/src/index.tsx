import { eofolInit, centerFlex, centerFlexFull, col, container, numberInput, j } from "../../src"
import { getEnvEofolName } from "./env"
import { counter, example, flat, forceUpdate } from "./components"

eofolInit(() =>
  container(
    centerFlexFull(
      col(
        [
          <h1>{getEnvEofolName()}</h1>,
          <h2>Controlled input example</h2>,
          centerFlex(
            numberInput({
              initialValue: 42,
              onChange: (val) => {
                console.log(`Controlled input value changed: ${val}`)
              },
            }),
          ),
          <counter />,
          <example />,
          <flat />,
          <forceUpdate />,
        ],
        "m-md",
      ),
    ),
  ),
)
