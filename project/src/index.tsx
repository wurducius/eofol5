import { getEnvEofolName } from "./env"
import { counter, flat, forceUpdate } from "./components"
import { eofolInit } from "../../src"

eofolInit(() => (
  <eContainer>
    <eCenterFlexFull>
      <eCol className={"flex-center"}>
        <h1>{getEnvEofolName()}</h1>
        <eCol className={"flex-center"}>
          <counter />
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
