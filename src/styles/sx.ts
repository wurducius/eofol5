import { camelCaseToKebabCase, getHash } from "../util"

export const css = (stylesObject: Record<string, string>) => {
  const cssRuleContent = Object.keys(stylesObject).reduce(
    (acc, next) => `${acc}${camelCaseToKebabCase(next)}:${camelCaseToKebabCase(stylesObject[next])};`,
    "",
  )
  const hash = `e${getHash(cssRuleContent)}`
  const cssRule = `.${hash}{${cssRuleContent}}`
  const stylesheet = document.styleSheets.item(document.styleSheets.length - 1)
  if (stylesheet) {
    stylesheet.insertRule(cssRule)
  }
  return hash
}
