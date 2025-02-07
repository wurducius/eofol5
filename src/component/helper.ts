import { DefInternal, EofolNode, Instance, Props, Body, VDOMChildren } from "../types"
import { initializeState } from "./state"
import { ax } from "../util"

export const getProps = (props: Props | undefined, idInstance: string, def: DefInternal<any>, children: EofolNode) =>
  ax(
    { children },
    {
      ...(props ?? {}),
      id: idInstance,
      def: def.id,
    },
  )

export const getComponentInstance = (
  savedInstance: Instance | undefined,
  idInstance: string,
  def: DefInternal<any>,
  body?: Body | undefined,
) =>
  savedInstance ??
  (ax(
    { body },
    {
      id: idInstance,
      def: def.id,
      state: initializeState(def),
    },
  ) as Instance)

export const addChildrenToProps = (props: Props | undefined, children: EofolNode | VDOMChildren | undefined) =>
  ax({ children }, props ?? {})
