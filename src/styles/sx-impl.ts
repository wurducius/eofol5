import { StyleObject } from "../types"

const camelCaseToKebabCase = (attributeName: string) =>
  attributeName
    .split("")
    .reduce(
      (acc, next, index) => acc + (index > 0 ? (next === next.toUpperCase() ? `-${next.toLowerCase()}` : next) : next),
      "",
    )

export const injectStyle = (
  // eslint-disable-next-line no-unused-vars
  getName: (content: string) => string,
  prefix: string,
  postfix: string,
  stylesObject: StyleObject,
) => {
  const cssRuleContent = Object.keys(stylesObject).reduce(
    // @ts-ignore
    (acc, next) => `${acc}${camelCaseToKebabCase(next)}:${stylesObject[next]};`,
    "",
  )
  const name = getName(cssRuleContent)
  const cssRule = `${prefix}${name}${postfix}{${cssRuleContent}}`
  const stylesheet = document.styleSheets.item(document.styleSheets.length - 1)
  if (stylesheet) {
    stylesheet.insertRule(cssRule)
  }
  return name
}

export const syImpl = (name: string, prefix: string, postfix: string, stylesObject: StyleObject) =>
  injectStyle(() => name, prefix, postfix, stylesObject)
