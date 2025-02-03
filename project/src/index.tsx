import { eofolInit, centerFlex, centerFlexFull, col, container, numberInput, j } from "../../src"
import { getEnvEofolName } from "./env"
import { counter, example, flat, forceUpdate } from "./components"

eofolInit(() => (
  <eContainer>
    <eCenterFlexFull>
      <eCol>
        <h1>{getEnvEofolName()}</h1>
        <h2>Controlled input example</h2>
        <eCol>
          <counter />
          <example />
          <flat />
          <forceUpdate />
        </eCol>
      </eCol>
    </eCenterFlexFull>
  </eContainer>
))

/*
          numberInput({
          initialValue: 42,
          onChange: (val) => {
          console.log(`Controlled input value changed: ${val}`)
        }
        })
 */
