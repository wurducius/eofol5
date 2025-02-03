import { Attributes, Classname, Properties, Props, VDOMChildren } from "../types"
import { eImpl } from "./create-element-vdom"

export const e = (
  tagName: string,
  children?: VDOMChildren,
  className?: Classname,
  attributes?: Attributes | Props,
  properties?: Properties,
) => eImpl(tagName, className, children, attributes, properties)

export const f = (
  tagName: string,
  className?: Classname,
  children?: VDOMChildren,
  attributes?: Attributes | Props,
  properties?: Properties,
) => eImpl(tagName, className, children, attributes, properties)

export const g = (props: {
  tagName: string
  children?: VDOMChildren
  className?: Classname
  attributes?: Attributes | Props
  properties?: Properties
}) => eImpl(props.tagName, props.className, props.children, props.attributes, props.properties)
