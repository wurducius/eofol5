import { getEnvEofolName } from "./env"
import { counter, weather, forceUpdate, renderTest, store, lifecycleTest } from "./components"
import { eofolCreateRoot, eofolMount, EofolUI, FLEX_STYLE } from "../../src"

eofolCreateRoot()

eofolMount(() => (
  <container>
    <flexCenterFull>
      <flexCol className={FLEX_STYLE.flexCenter}>
        <h1>{getEnvEofolName()}</h1>
        <flexCol className={FLEX_STYLE.flexCenter}>
          <counter />
          <weather />
          <forceUpdate />
          <renderTest>
            <div>CHILDREN PROPS</div>
          </renderTest>
          <store />
          <EofolUI.inputNumber value={5} />
          <lifecycleTest />
        </flexCol>
      </flexCol>
    </flexCenterFull>
  </container>
))
