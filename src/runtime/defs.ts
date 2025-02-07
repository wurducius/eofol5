import { Classname, Def, DEF_TYPE, DefInternal, Properties, Props, VDOM, VDOMChildren } from "../types"
import { e } from "../render"

const defsRegistry: Record<string, DefInternal<any>> = {}

export const getDefs = () => defsRegistry

export const getDef = (id: string): DefInternal<any> | undefined => defsRegistry[id]

export const addDef = (id: string, nextDef: Def<any>, defType: DEF_TYPE) => {
  defsRegistry[id] = { ...nextDef, id, type: defType }
}

export function defineComponent<T>(id: string, def: Def<T>) {
  addDef(id, def, "component")
}

export function define<T>(id: string, def: Def<T>) {
  defineComponent(id, def)
  return (children?: VDOMChildren, className?: Classname, props?: Props, properties?: Properties) =>
    e(id, children, className, props, properties) as VDOM
}
