import { define, div } from "../../../src"

const LIFECYCLE_TEST_VERBOSE = true

const logLifecycle = (msg: string) => {
  if (LIFECYCLE_TEST_VERBOSE) {
    console.log(`LIFECYCLE -> ${msg}`)
  }
}

// @ts-ignore
export default define("lifecycleTest", {
  render: () => {
    logLifecycle("render")
    return div("Lifecycle test")
  },
  constructor: () => {
    logLifecycle("constructor")
  },
  getDerivedStateFromProps: () => {
    logLifecycle("getDerivedStateFromProps")
  },
  onUpdated: () => {
    logLifecycle("onUpdated")
  },
  onMounted: () => {
    logLifecycle("onMounted:")
  },
  onBeforeUpdate: () => {
    logLifecycle("onBeforeUpdate")
  },
  onUnmounted: () => {
    logLifecycle("onUnmounted")
  },
  beforeMount: () => {
    logLifecycle("beforeMount")
  },
  beforeUnmount: () => {
    logLifecycle("beforeUnmount")
  },
  shouldUpdate: () => {
    logLifecycle("shouldUpdate")
    return true
  },
})
