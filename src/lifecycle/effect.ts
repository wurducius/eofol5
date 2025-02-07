import { Effect, LifecycleArg } from "../types"
import { arrayCombinator } from "../util"

const playEffectImpl = (arg: LifecycleArg) => (effect: Effect<any>) =>
  effect({ body: arg.body, props: arg.props, ...arg.stateTransforms })

export const playEffect = (arg: LifecycleArg) => {
  if (arg.def.effect) {
    arrayCombinator(playEffectImpl(arg))(arg.def.effect)
  }
}
