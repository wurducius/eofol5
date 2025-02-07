import { define } from "../runtime"
import { cx } from "../util"
import { div } from "../simple"

export const defineSimple = (tagName: string, className?: string) =>
  // @ts-ignore
  define(tagName, {
    render: (a) => div(a.props.children, cx(className, a.props && a.props.className)),
  })
