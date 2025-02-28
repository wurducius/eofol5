import { getHash } from "../../util"
import { StyleObject } from "../../types"
import { injectStyle, syImpl } from "./sx-impl"

export const sx = (stylesObject: StyleObject) =>
  injectStyle((content) => `e${getHash(content)}`, ".", "", stylesObject, true)

export const syHtml = (name: string, stylesObject: StyleObject, postfix?: string) =>
  syImpl(name, "", postfix ?? "", stylesObject)

export const syId = (name: string, stylesObject: StyleObject, postfix?: string) =>
  syImpl(name, "#", postfix ?? "", stylesObject)

export const sy = (name: string, stylesObject: StyleObject, prefix?: string, postfix?: string) =>
  syImpl(name, prefix ?? ".", postfix ?? "", stylesObject)
