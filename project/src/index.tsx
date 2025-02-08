import { getEnvEofolName } from "./env"
import { counter, weather, forceUpdate, renderTest, store, lifecycleTest } from "./components"
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
          <store />
          <inputNumber value={5} />
          <lifecycleTest />
        </eCol>
      </eCol>
    </eCenterFlexFull>
  </eContainer>
))
