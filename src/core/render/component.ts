import { DefInternal, Props } from "../../types"
import { lifecycle } from "../lifecycle"
import { mergeInstance } from "../../../project/src/internals"
import { initComponentProps, renderComponentDerivedStateFromProps, renderComponentInit } from "./render-general"

export const mountComponent = (def: DefInternal<any>, props: Props) => {
  const lifecycleArg = renderComponentInit(def, initComponentProps(def, props), true)
  lifecycle.constructor(lifecycleArg)
  renderComponentDerivedStateFromProps(lifecycleArg)
  mergeInstance(lifecycleArg.idInstance, lifecycleArg.instance)
  lifecycle.beforeMount(lifecycleArg)
  const rendered = lifecycle.render(lifecycleArg)
  lifecycle.afterMount(lifecycleArg)
  return rendered
}

export const updateComponent = (def: DefInternal<any>, props: Props) => {
  const lifecycleArg = renderComponentInit(def, props, false)
  renderComponentDerivedStateFromProps(lifecycleArg)
  mergeInstance(lifecycleArg.idInstance, lifecycleArg.instance)
  lifecycle.beforeUpdate(lifecycleArg)
  const rendered = lifecycle.render(lifecycleArg)
  lifecycle.afterUpdate(lifecycleArg)
  return rendered
}

export const unmountComponent = (def: DefInternal<any>, props: Props) => {
  // @TODO
  console.log("UNMOUNT COMPONENT")
  const lifecycleArg = renderComponentInit(def, props, false)
  lifecycle.beforeUnmount(lifecycleArg)
  lifecycle.unmount(lifecycleArg)
  lifecycle.afterUnmount(lifecycleArg)
}
