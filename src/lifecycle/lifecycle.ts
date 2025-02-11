import { playConstructor } from "./constructor"
import { LifecycleArg, Props, VDOM } from "../types"
import { playEffect } from "./effect"
import { VDOM_TYPE } from "../eofol-constants"
import { wrapArray } from "../util"
import { renderVdomElement } from "../render"

const getRenderArg = (arg: LifecycleArg) => ({ ...arg.stateTransforms, props: arg.props })

const constructor = (arg: LifecycleArg) => {
  const { def, props, isNew } = arg
  playConstructor(def, props, isNew)
}

const getDerivedStateFromProps = (arg: LifecycleArg): Props => {
  if (arg.def.getDerivedStateFromProps) {
    return arg.def.getDerivedStateFromProps(getRenderArg(arg))
  } else {
    return arg.stateTransforms.state
  }
}

const beforeMount = (arg: LifecycleArg) => {
  if (arg.def.beforeMount) {
    arg.def.beforeMount(getRenderArg(arg))
  }
}

const render = (arg: LifecycleArg) => {
  const { def, props, idInstance, children } = arg
  return renderVdomElement({
    type: VDOM_TYPE.COMPONENT,
    tagName: undefined,
    children: wrapArray<VDOM>(children),
    id: idInstance,
    attributes: props,
    def: def.id,
  })
}

const afterMount = (arg: LifecycleArg) => {
  if (arg.def.onMounted) {
    arg.def.onMounted(getRenderArg(arg))
  }
  playEffect(arg)
}

const shouldUpdate = (arg: LifecycleArg): boolean => {
  if (arg.def.shouldUpdate) {
    return arg.def.shouldUpdate(getRenderArg(arg))
  } else {
    return true
  }
}

const beforeUpdate = (arg: LifecycleArg) => {
  if (arg.def.onBeforeUpdate) {
    arg.def.onBeforeUpdate(getRenderArg(arg))
  }
}

const afterUpdate = (arg: LifecycleArg) => {
  if (arg.def.onUpdated) {
    arg.def.onUpdated(getRenderArg(arg))
  }
  playEffect(arg)
}

const beforeUnmount = (arg: LifecycleArg) => {
  if (arg.def.beforeUnmount) {
    arg.def.beforeUnmount(getRenderArg(arg))
  }
}

// eslint-disable-next-line no-unused-vars
const unmount = (arg: LifecycleArg) => {}

const afterUnmount = (arg: LifecycleArg) => {
  if (arg.def.onUnmounted) {
    arg.def.onUnmounted(getRenderArg(arg))
  }
}

const renderDom = (arg: LifecycleArg) => arg.def.render(getRenderArg(arg))

export const lifecycle = {
  constructor,
  getDerivedStateFromProps,
  beforeMount,
  render,
  afterMount,
  shouldUpdate,
  beforeUpdate,
  afterUpdate,
  beforeUnmount,
  unmount,
  afterUnmount,
  renderDom,
}
