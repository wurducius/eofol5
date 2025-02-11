import { getEnvEofolName } from "./env"
import { counter, weather, forceUpdate, renderTest, store, lifecycleTest } from "./components"
import { eofolCreateRoot, eofolMount, EofolUI, FLEX_STYLE, numberInput } from "../../src"

eofolCreateRoot()

eofolMount(() => (
  <container>
    <centerFlexFull>
      <col className={FLEX_STYLE.flexCenter}>
        <h1>{getEnvEofolName()}</h1>
        <col className={FLEX_STYLE.flexCenter}>
          <counter />
          <weather />
          <forceUpdate />
          <renderTest>
            <div>CHILDREN PROPS</div>
          </renderTest>
          <store />
          <EofolUI.inputNumber value={5} />
          <lifecycleTest />
        </col>
      </col>
    </centerFlexFull>
  </container>
))
