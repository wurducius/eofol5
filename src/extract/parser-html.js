const HTMLParser = require("node-html-parser")

const parseHtml = (content) => HTMLParser.parse(content.toString())

module.exports = parseHtml
