import { Instance, mergeInstance } from "./internals"
import { eofolUpdate } from "../../src/dom"
import { Def, getDef } from "./defs"
import { generateId } from "../../src/util/crypto"
import { eofolError } from "./util"

const eofolErrorDefNotFound = (def: string) => {
  eofolError(`Def not found for name = "${def}".`)
}

const getStateSetter = (def: Def, idInstance: string, instance: Instance) => (nextState: any) => {
  const nextInstance = { ...instance, state: nextState }
  mergeInstance(idInstance, nextInstance)
  // @TODO pass rootElementId as argument
  eofolUpdate("root")
}

export const createInstance = (idDef: string) => {
  const def = getDef(idDef)
  if (def) {
    const idInstance = generateId()
    const instance = { id: idInstance, def: idDef, state: def.initialState ? { ...def.initialState } : {} }
    const state = instance.state
    const setState = getStateSetter(def, idInstance, instance)
    mergeInstance(idInstance, instance)
    return def.render(state, setState)
  } else {
    eofolErrorDefNotFound(idDef)
    return undefined
  }
}
