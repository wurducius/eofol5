const { getINTERNALS } = require("../compile/internals")

const getENV = () => getINTERNALS().env

const getEnvBaseUrl = () => getENV().BASE_URL
const getEnvEofolRuntimeVerbose = () => getENV().EOFOL_RUNTIME_VERBOSE === "true"
// @ts-ignore
const getEnvVerbosityLevel = () => Number(getENV().EOFOL_VERBOSITY_LEVEL)
// @ts-ignore
const getEnvEofolRootElementId = () => getENV().EOFOL_ROOT_ELEMENT_ID
// @ts-ignore
const getEnvEofolRootElementIdPlaceholder = () => getENV().EOFOL_ROOT_ELEMENT_ID_PLACEHOLDER
// @ts-ignore
const getEnvEofolViewsPlaceholder = () => getENV().EOFOL_VIEWS_PLACEHOLDER
// @ts-ignore
const getEnvEofolNamePlaceholder = () => getENV().EOFOL_NAME_PLACEHOLDER
// @ts-ignore
const getEnvEofolServiceWorkerFilename = () => getENV().EOFOL_SERVICE_WORKER_FILENAME
// @ts-ignore
const getEnvCryptoIdLength = () => Number(getENV().CRYPTO_ID_LENGTH)
// @ts-ignore
const getEnvEofolName = () => getENV().EOFOL_NAME

module.exports = {
  getEnvEofolServiceWorkerFilename,
  getEnvEofolName,
  getEnvEofolRootElementId,
  getEnvBaseUrl,
  getEnvEofolRuntimeVerbose,
  getEnvEofolRootElementIdPlaceholder,
  getEnvEofolViewsPlaceholder,
  getEnvEofolNamePlaceholder,
  getEnvCryptoIdLength,
  getEnvVerbosityLevel,
}
