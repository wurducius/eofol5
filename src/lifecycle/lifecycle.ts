import { playConstructor } from "./constructor"
import { LifecycleArg, Props, StateTransform, VDOM } from "../types"
import { playEffect } from "./effect"
import { renderVdomElement } from "../vdom"
import { VDOM_TYPE } from "../eofol-constants"
import { wrapArray } from "../util"

const constructor = (arg: LifecycleArg) => {
  const { def, props, isNew } = arg
  return playConstructor(def, props, isNew) ?? {}
}

const getDerivedStateFromProps = (arg: LifecycleArg): Props => {
  return arg.props
}

const beforeMount = (arg: LifecycleArg) => {}

const render = (arg: LifecycleArg, isVDOM: boolean) => {
  const { def, props, idInstance, children, stateTransforms, body } = arg
  if (isVDOM) {
    return renderVdomElement({
      type: VDOM_TYPE.COMPONENT,
      tagName: undefined,
      children: wrapArray<VDOM>(children),
      id: idInstance,
      attributes: props,
      def: def.id,
    })
  } else {
    return def.render({
      ...(stateTransforms as StateTransform<StateTransform<any>>),
      body,
      props,
    })
  }
}

const afterMount = (arg: LifecycleArg) => {
  const { def, props, idInstance, instance } = arg
  playEffect(def, idInstance, instance, props)
}

const shouldUpdate = (arg: LifecycleArg): boolean => {
  return true
}

const beforeUpdate = (arg: LifecycleArg) => {}

const afterUpdate = (arg: LifecycleArg) => {
  const { def, props, idInstance, instance } = arg
  playEffect(def, idInstance, instance, props)
}

const beforeUnmount = (arg: LifecycleArg) => {}

const unmount = (arg: LifecycleArg) => {}

const afterUnmount = (arg: LifecycleArg) => {}

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
}
