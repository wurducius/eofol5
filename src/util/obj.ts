export const ax = (fields: Record<string, any>, initial?: Object) =>
  Object.keys(fields).reduce((acc, next) => {
    const value = fields[next]
    if (value !== undefined) {
      // @ts-ignore
      acc[next] = value
    }
    return acc
  }, initial ?? {})

export const hx = (
  fields: Record<string, any>,
  // eslint-disable-next-line no-unused-vars
  handler: (propertyName: string, propertyValue: any) => void,
) =>
  Object.keys(fields).forEach((propertyName) => {
    const propertyValue = fields[propertyName]
    if (propertyValue !== undefined) {
      handler(propertyName, propertyValue)
    }
  })

export const wrapArray = (arg: any) => (Array.isArray(arg) ? arg : [arg]).filter(Boolean)
