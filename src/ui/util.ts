import { defineComponent } from "../runtime"
import { div, e } from "../render"
import { Classname, VDOMChildren } from "../types"

export const cx = (...styles: Classname[]) => styles.filter(Boolean).join(" ")

export const defineSimple = (tagName: string, className: string) =>
  defineComponent(tagName, {
    render: (state, mergeState, props) => div(props.children, cx(className, props && props.className)),
  })

// @TODO Awful hack passing className by props
export const renderSimple = (tagName: string) => (children: VDOMChildren, className?: string) =>
  e(tagName, undefined, undefined, { children, className })
