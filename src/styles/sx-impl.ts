import { StyleObject } from "../types"
import { camelCaseToKebabCase } from "../util"

export const injectStyle = (
  // eslint-disable-next-line no-unused-vars
  getName: (content: string) => string,
  prefix: string,
  postfix: string,
  stylesObject: StyleObject,
) => {
  const content = Object.keys(stylesObject).reduce(
    // @ts-ignore
    (acc, next) => `${acc}${camelCaseToKebabCase(next)}:${stylesObject[next]};`,
    "",
  )
  const name = getName(content)
  const rule = `${prefix}${name}${postfix}{${content}}`
  const stylesheet = document.styleSheets.item(document.styleSheets.length - 1)
  if (stylesheet) {
    stylesheet.insertRule(rule)
  }
  return name
}

export const syImpl = (name: string, prefix: string, postfix: string, stylesObject: StyleObject) =>
  injectStyle(() => name, prefix, postfix, stylesObject)
