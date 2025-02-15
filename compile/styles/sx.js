const { sinjectStyle, ssyImpl } = require("./sx-impl")
const { getHash } = require("../util-compile")

const ssx = (stylesObject) => sinjectStyle((content) => `e${getHash(content)}`, ".", "", stylesObject)

const ssyHtml = (name, stylesObject, postfix) => ssyImpl(name, "", postfix ?? "", stylesObject)

const ssyId = (name, stylesObject, postfix) => ssyImpl(name, "#", postfix ?? "", stylesObject)

const ssy = (name, stylesObject, prefix, postfix) => ssyImpl(name, prefix ?? ".", postfix ?? "", stylesObject)

module.exports = { ssx, ssy, ssyId, ssyHtml }
