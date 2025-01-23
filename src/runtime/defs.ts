import { Def, DefInternal } from "../types"

const defsRegistry: Record<string, DefInternal<any>> = {}

export const getDefs = () => defsRegistry

export const getDef = (id: string): DefInternal<any> | undefined => defsRegistry[id]

export const addDef = (id: string, nextDef: Def<any>) => {
  defsRegistry[id] = { ...nextDef, id }
}

export function defineComponent<T>(id: string, def: Def<T>) {
  addDef(id, def)
}
