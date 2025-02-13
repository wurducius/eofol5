import { Attributes, Classname, Properties, VDOM, VDOMChildren } from "../../types"
import { renderTag } from "../../core/render"

export const simple =
  (tagName: string) =>
  (children?: VDOMChildren, className?: Classname, attributes?: Attributes, properties?: Properties) =>
    renderTag(tagName, className, children, attributes, properties) as VDOM
