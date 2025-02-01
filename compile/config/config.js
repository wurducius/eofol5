const configDefault = require("./config-default")
const { join, read } = require("../util-compile")

const configProjectContent = read(join(process.cwd(), "eofol-config.json"))
const configProject = JSON.parse(configProjectContent.toString())

const configImpl = { ...configDefault, ...configProject }

const getConfig = () => configImpl

module.exports = getConfig
