import { mergeDeep } from "./util"

// eslint-disable-next-line no-undef
export const getInternals = () => INTERNALS

export const mergeInternals = (nextInternals: any) => {
  // eslint-disable-next-line no-undef
  INTERNALS = mergeDeep(INTERNALS, nextInternals)
}

// @TODO finish
interface Instance {
  id: string
}

export const getInstances = () => getInternals().instances

// @ts-ignore
export const getInstance = (id: string) => getInternals().instances[id]

export const mergeInstance = (id: string, nextInstance: Instance) => {
  const instances = getInstances()
  // @ts-ignore
  instances[id] = mergeDeep(instances[id] ?? {}, nextInstance)
}
