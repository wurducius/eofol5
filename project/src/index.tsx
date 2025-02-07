import { getEnvEofolName } from "./env"
import { counter, weather, forceUpdate, renderTest } from "./components"
import { eofolCreateRoot, eofolMount } from "../../src"

eofolCreateRoot()

eofolMount(() => (
  <eContainer>
    <eCenterFlexFull>
      <eCol className={"flex-center"}>
        <h1>{getEnvEofolName()}</h1>
        <eCol className={"flex-center"}>
          <counter />
          <weather />
          <forceUpdate />
          <renderTest>
            <div>CHILDREN PROPS</div>
          </renderTest>
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
