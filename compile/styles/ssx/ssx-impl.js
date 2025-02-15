const { camelCaseToKebabCase } = require("../../util-compile")
const { appendSsxCache } = require("./cache")

const sinjectStyle = (getName, prefix, postfix, stylesObject) => {
  const content = Object.keys(stylesObject).reduce(
    // @ts-ignore
    (acc, next) => `${acc}${camelCaseToKebabCase(next)}:${stylesObject[next]};`,
    "",
  )
  const name = getName(content)
  const rule = `${prefix}${name}${postfix}{${content}}`
  appendSsxCache(rule)
}

const ssyImpl = (name, prefix, postfix, stylesObject) => sinjectStyle(() => name, prefix, postfix, stylesObject)

module.exports = { sinjectStyle, ssyImpl }
