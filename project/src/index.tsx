import { getEnvEofolName } from "./env"
import { counter, example, flat, forceUpdate } from "./components"
import { eofolInit } from "../../src"

eofolInit(() => (
  <eContainer>
    <eCenterFlexFull>
      <eCol className={"flex-center"}>
        <h1>{getEnvEofolName()}</h1>
        <h2>Controlled input example</h2>
        <eCol className={"flex-center"}>
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
