import { DefInternal, Props, StateTransform } from "../types"
import { getDef } from "../runtime"
import { eofolErrorDefNotFound } from "../log"
import { DEF_TYPE_COMPONENT } from "../eofol-constants"
import { renderInstanceGeneral } from "../render"

// @TODO removed children arg from propsImpl
export const renderInstanceFromDef = (def: DefInternal<any>, props?: Props | undefined, isNew?: boolean) => {
  const renderedInstance = renderInstanceGeneral(def, props, isNew)
  return def.render({
    ...(renderedInstance.stateTransforms as StateTransform<StateTransform<any>>),
    body: renderedInstance.bodyImpl,
    params: renderedInstance.paramsImpl,
    props: renderedInstance.propsImpl,
  })
}

export const renderInstance = (idDef: string, props?: Props | undefined, isNew?: boolean) => {
  const def = getDef(idDef)
  if (def) {
    if (def.type === DEF_TYPE_COMPONENT) {
      return renderInstanceFromDef(def, props, isNew)
    }
  } else {
    eofolErrorDefNotFound(idDef)
    return undefined
  }
}
