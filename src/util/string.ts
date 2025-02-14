export const deepCopyString = (str: string) => ` ${str}`.slice(1)

export const camelCaseToKebabCase = (attributeName: string) =>
  attributeName
    .split("")
    .reduce(
      (acc, next, index) => acc + (index > 0 ? (next === next.toUpperCase() ? `-${next.toLowerCase()}` : next) : next),
      "",
    )
