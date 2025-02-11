export const deepCopyString = (str: string) => ` ${str}`.slice(1)

export const camelCaseToKebabCase = (attributeName: string) =>
  attributeName
    .split("")
    .reduce((acc, next) => acc + (next === next.toUpperCase() ? `-${next.toLowerCase()}` : next), "")
