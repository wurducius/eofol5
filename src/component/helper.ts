import { DefInternal, EofolNode, Instance, Props, Body, VDOMChildren } from "../types"
import { initializeState } from "./state"

export const getProps = (props: Props | undefined, idInstance: string, def: DefInternal<any>, children: EofolNode) => {
  const propsImpl: Props = {
    ...(props ?? {}),
    id: idInstance,
    def: def.id,
  }
  if (children) {
    propsImpl.children = children
  }
  return propsImpl
}

export const getComponentInstance = (
  savedInstance: Instance | undefined,
  idInstance: string,
  def: DefInternal<any>,
  body?: Body | undefined,
) => {
  if (savedInstance) {
    return savedInstance
  } else {
    const instanceImpl: Instance = {
      id: idInstance,
      def: def.id,
      state: initializeState(def),
    }
    if (body) {
      instanceImpl.body = body
    }
    return instanceImpl
  }
}

export const addChildrenToProps = (props: Props | undefined, children: EofolNode | VDOMChildren | undefined) => {
  let propsImpl
  if (children) {
    propsImpl = { ...(props ?? {}), children }
  } else {
    propsImpl = props ?? {}
  }
  return propsImpl
}
