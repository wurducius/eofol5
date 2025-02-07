import { Def, Effect, Instance, Props } from "../types"
import { arrayCombinator } from "../util"
import { getStateTransforms } from "../component"

const playEffectImpl =
  (def: Def<any>, instance: Instance, idInstance: string, props: Props | undefined) => (effect: Effect<any>) =>
    effect({ body: instance.body, props: props ?? {}, ...getStateTransforms(idInstance, instance, def.initialState) })

export const playEffect = (def: Def<any>, idInstance: string, instance: Instance, props: Props | undefined) => {
  if (def.effect) {
    arrayCombinator(playEffectImpl(def, instance, idInstance, props))(def.effect)
  }
}
