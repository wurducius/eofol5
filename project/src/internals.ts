import { mergeDeep } from "./util"

// eslint-disable-next-line no-undef
export const getInternals = () => INTERNALS

export const mergeInternals = (nextInternals: any) => {
  //@ts-ignore
  // eslint-disable-next-line no-undef
  INTERNALS = mergeDeep(INTERNALS, nextInternals)
}

// @TODO finish
export interface Instance {
  id: string
  // @TODO state typing
  state: any
}

export const getInstances = () => getInternals().instances

// @ts-ignore
export const getInstance = (id: string) => getInternals().instances[id]

export const mergeInstance = (id: string, nextInstance: Instance) => {
  const instances = getInstances()
  // @ts-ignore
  instances[id] = mergeDeep(instances[id] ?? {}, nextInstance)
}
