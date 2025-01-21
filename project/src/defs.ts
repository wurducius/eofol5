import { EofolNode } from "../../src/dom"

export type Props = Record<string | "id" | "def", any>

// @TODO finish
export interface DefInternal extends Def {
  id: string
}

// @TODO finish
export interface Def {
  // eslint-disable-next-line no-unused-vars
  render: (state: any, setState: (nextState: any) => void, props: Props) => EofolNode
  initialState: any
}

const defsRegistry: Record<string, DefInternal> = {}

export const getDefs = () => defsRegistry

export const getDef = (id: string): DefInternal | undefined => defsRegistry[id]

export const addDef = (id: string, nextDef: Def) => {
  defsRegistry[id] = { ...nextDef, id }
}

// @TODO finish
export const defineComponent = (id: string, def: Def) => {
  addDef(id, def)
}
