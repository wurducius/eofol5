import { defineComponent } from "../runtime"
import { div, e } from "../render"
import { VDOMChildren } from "../types"

export const defineSimple = (tagName: string, className: string) =>
  defineComponent(tagName, {
    render: (state, mergeState, props) => div(props.children, className),
  })

export const renderSimple = (tagName: string) => (children: VDOMChildren) =>
  e(tagName, undefined, undefined, { children })
