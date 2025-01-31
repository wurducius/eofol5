const { EOFOL_ROOT_ELEMENT_ID, EOFOL_ROOT_ELEMENT_ID_PLACEHOLDER } = require("../constants")

const replaceRootElementId = (content) =>
  content.toString().replaceAll(EOFOL_ROOT_ELEMENT_ID_PLACEHOLDER, EOFOL_ROOT_ELEMENT_ID)

module.exports = replaceRootElementId
