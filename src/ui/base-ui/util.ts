import { define } from "../../runtime"
import { div } from "../simple"
import { cx } from "../../util"

export const defineBase = (tagName: string, className?: string) =>
  // @ts-ignore
  define(tagName, {
    render: (a) => div(a.props.children, cx(className, a.props && a.props.className)),
  })
