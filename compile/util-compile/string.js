const camelCaseToKebabCase = (attributeName) =>
  attributeName
    .split("")
    .reduce(
      (acc, next, index) => acc + (index > 0 ? (next === next.toUpperCase() ? `-${next.toLowerCase()}` : next) : next),
      "",
    )

module.exports = { camelCaseToKebabCase }
