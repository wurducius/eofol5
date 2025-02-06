import { Def, Effect, Instance } from "../types"
import { arrayCombinator } from "../util"
import { getStateTransforms } from "../component"

const playEffectImpl = (def: Def<any>, instance: Instance, idInstance: string) => (effect: Effect<any>) => {
  const stateTransforms = getStateTransforms(idInstance, instance, def.initialState)
  // @TODO add props and such
  effect({ ...stateTransforms })
}

export const playEffect = (def: Def<any>, idInstance: string, instance: Instance) => {
  if (def.effect) {
    arrayCombinator(playEffectImpl(def, instance, idInstance))(def.effect)
  }
}
