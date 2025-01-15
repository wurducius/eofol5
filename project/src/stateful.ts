// @ts-ignore
import { Instance, mergeInstance } from "./internals"
import { div, eofolUpdate } from "../../src/dom"
import { Def, getDef } from "./defs"
import { generateId } from "../../src/util/crypto"
import { eofolError } from "./util"

const eofolErrorDefNotFound = (def: string) => {
  eofolError(`Def not found for name = "${def}".`)
}

const getStateSetter = (def: Def, idInstance: string, instance: Instance) => (nextState: any) => {
  const nextInstance = { ...instance, state: nextState }
  mergeInstance(idInstance, nextInstance)
  const nextCustom = def.render(nextInstance.state, getStateSetter(def, idInstance, instance))
  eofolUpdate("root", () => [
    // @ts-ignore
    div(undefined, [nextCustom], {
      style:
        "display:flex; flex-direction: column; justify-content:center; align-items: center; height: 100%; font-size: 36px",
    }),
  ])
}

export const createInstance = (idDef: string) => {
  const def = getDef(idDef)
  if (def) {
    const idInstance = generateId()
    const instance = { id: idInstance, def: idDef, state: def.initialState ? { ...def.initialState } : {} }
    const state = instance.state
    // @ts-ignore
    const setState = getStateSetter(def, idInstance, instance)
    mergeInstance(idInstance, instance)
    // @ts-ignore
    return def.render(state, setState)
  } else {
    eofolErrorDefNotFound(idDef)
    return undefined
  }
}
