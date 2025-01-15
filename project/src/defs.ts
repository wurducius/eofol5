import { EofolNode } from "../../src/dom"

// @TODO finish
interface DefInternal extends Def {
  id: string
}

// @TODO finish
interface Def {
  render: () => EofolNode
  // @TODO state typing
  state: any
}

const defsRegistry: Record<string, DefInternal> = {}

export const getDefs = () => defsRegistry

export const getDef = (id: string): Def | undefined => defsRegistry[id]

export const addDef = (id: string, nextDef: Def) => {
  defsRegistry[id] = { ...nextDef, id }
}

// @TODO finish
export const defineComponent = (id: string, def: Def) => {
  addDef(id, def)
}
