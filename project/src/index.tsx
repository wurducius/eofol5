import { getEnvEofolName } from "./env"
import { counter, weather, forceUpdate, renderTest, store, lifecycleTest } from "./components"
import { define, eButton, eofolMount, EofolUI, FLEX_STYLE } from "../../src"

define("stateTest", {
  render: (a) => {
    return (
      <div>
        <h1>{`Value = ${a.state.value}`}</h1>
        {eButton({
          children: "Add",
          onClick: () => {
            a.mergeState({ value: a.state.value + 1 })
          },
        })}
      </div>
    )
  },
  initialState: { value: 0 },
})

/*
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
 */

eofolMount(() => (
  <div>
    <stateTest />
    <stateTest />
  </div>
))
