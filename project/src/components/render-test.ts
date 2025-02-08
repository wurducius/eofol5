import { define, div } from "../../../src"
import forceUpdate from "./force-update"
import counter from "./counter"

// @ts-ignore
export default define("renderTest", {
  render: (a) => div([forceUpdate(), counter(), ...a.props.children]),
})
