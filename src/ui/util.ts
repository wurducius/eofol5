import { define } from "../runtime"
import { div } from "../render"
import { cx } from "../util"

export const defineSimple = (tagName: string, className: string) =>
  define(tagName, {
    render: (a) => div(a.props.children, cx(className, a.props && a.props.className)),
  })
