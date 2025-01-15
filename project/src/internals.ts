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

const mergeDeep = (...objects) => {
  const isObject = (obj) => obj && typeof obj === "object"

  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach((key) => {
      const pVal = prev[key]
      const oVal = obj[key]

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = oVal ?? pVal
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = mergeDeep(pVal, oVal)
      } else {
        prev[key] = oVal
      }
    })

    return prev
  }, {})
}

export const mergeInstance = (id: string, nextInstance: Instance) => {
  const instances = getInstances()
  // @ts-ignore
  instances[id] = mergeDeep(instances[id] ?? {}, nextInstance)
}
