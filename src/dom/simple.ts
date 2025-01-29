import { Attributes, Classname, EofolNode, Properties, renderTag } from "./create-element"

export const simple =
  (tagName: string) =>
  (className?: Classname, children?: EofolNode, attributes?: Attributes, properties?: Properties) =>
    renderTag(tagName, className, children, attributes, properties)

export const div = simple("div")
export const span = simple("span")
export const p = simple("p")
export const h1 = simple("h1")
export const h2 = simple("h2")
export const h3 = simple("h3")
export const h4 = simple("h4")
export const h5 = simple("h5")
export const button = simple("button")
export const input = simple("input")
export const textarea = simple("textarea")
export const select = simple("select")
export const a = simple("a")
