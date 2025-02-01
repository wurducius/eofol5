const { getEnvEofolRootElementIdPlaceholder, getEnvEofolRootElementId } = require("../config/env")

const replaceRootElementId = (content) =>
  content.toString().replaceAll(getEnvEofolRootElementIdPlaceholder(), getEnvEofolRootElementId())

module.exports = replaceRootElementId
