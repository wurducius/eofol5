import { Instance, mergeInstance } from "./internals"
import { eofolUpdate } from "../../src/dom"
import { generateId } from "../../src/util/crypto"
import { eofolError } from "../../src/component/logger"
import { Def, DefInternal, EofolNode, Props } from "../../src/types"
import { getDef } from "../../src/runtime/defs"

const eofolErrorDefNotFound = (def: string) => {
  eofolError(`Def not found for name = "${def}".`)
}

const getStateSetter = (def: Def<any>, idInstance: string, instance: Instance) => (nextState: any) => {
  const nextInstance = { ...instance, state: nextState }
  mergeInstance(idInstance, nextInstance)
  eofolUpdate(idInstance)
}

export const createInstanceFromDef = (def: DefInternal<any>, props?: Props, children?: EofolNode) => {
  const idInstance = generateId()
  const instance = { id: idInstance, def: def.id, state: def.initialState ? { ...def.initialState } : {} }
  const state = { ...instance.state }
  const setState = getStateSetter(def, idInstance, instance)
  mergeInstance(idInstance, instance)
  return def.render(state, setState, { ...props, id: idInstance, def: def.id, children })
}

export const createInstance = (idDef: string, props?: Props, children?: EofolNode) => {
  const def = getDef(idDef)
  if (def) {
    return createInstanceFromDef(def, props, children)
  } else {
    eofolErrorDefNotFound(idDef)
    return undefined
  }
}
