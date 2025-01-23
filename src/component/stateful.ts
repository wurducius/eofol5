import { DefInternal, EofolNode, Instance, Props } from "../types"
import { generateId } from "../util/crypto"
import { eofolErrorDefNotFound } from "../log"
import { getDef, getInstance, mergeInstance } from "../runtime"
import { eofolUpdate } from "../runtime/eofol"

function getStateSetter<T>(idInstance: string, instance: Instance) {
  return function (nextState: T) {
    const nextInstance = { ...instance, state: nextState }
    mergeInstance(idInstance, nextInstance)
    eofolUpdate(idInstance)
  }
}

export const renderInstanceFromDef = (def: DefInternal<any>, props?: Props, children?: EofolNode, isNew?: boolean) => {
  const idInstance = isNew ? generateId() : (props?.id ?? generateId())
  const savedInstance = isNew ? undefined : getInstance(idInstance)
  const instance = savedInstance ?? {
    id: idInstance,
    def: def.id,
    state: def.initialState ? { ...def.initialState } : {},
  }
  const state = { ...instance.state }
  const setState = getStateSetter(idInstance, instance)
  mergeInstance(idInstance, instance)
  return def.render(state, setState, { ...props, id: idInstance, def: def.id, children })
}

export const renderInstance = (idDef: string, props?: Props, children?: EofolNode, isNew?: boolean) => {
  const def = getDef(idDef)
  if (def) {
    return renderInstanceFromDef(def, props, children, isNew)
  } else {
    eofolErrorDefNotFound(idDef)
    return undefined
  }
}
