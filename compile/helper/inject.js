const {
  getEnvEofolRootElementIdPlaceholder,
  getEnvEofolRootElementId,
  getEnvEofolViewsPlaceholder,
  getEnvEofolNamePlaceholder,
  getEnvEofolName,
} = require("../config/env")

const replace = (source, target) => (content) => content.replaceAll(source, target)

const injectRootId = replace(getEnvEofolRootElementIdPlaceholder(), getEnvEofolRootElementId())

const injectEofolName = replace(getEnvEofolNamePlaceholder(), getEnvEofolName())

const injectViews = (views) => (content) => replace(getEnvEofolViewsPlaceholder(), views)(content)

const injectDoctype = (content) => `<!DOCTYPE html>${content}`

const injectInternals = (content) => `let INTERNALS = ${content}\n`

module.exports = { injectRootId, injectEofolName, injectViews, injectDoctype, injectInternals }
