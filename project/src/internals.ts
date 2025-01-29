const mergeDeep = (...objects: object[]) => {
  const isObject = (obj: object) => obj && typeof obj === "object"

  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach((key) => {
      // @ts-ignore
      const pVal = prev[key]
      // @ts-ignore
      const oVal = obj[key]

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        // @ts-ignore
        prev[key] = oVal ?? pVal
      } else if (isObject(pVal) && isObject(oVal)) {
        // @ts-ignore
        prev[key] = mergeDeep(pVal, oVal)
      } else {
        // @ts-ignore
        prev[key] = oVal
      }
    })

    return prev
  }, {})
}

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
