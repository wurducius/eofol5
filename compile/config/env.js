const { getINTERNALS } = require("../compile/internals")

const getENV = () => getINTERNALS().env

const envString = (name) => getENV()[name]
const envBool = (name) => envString(name) === "true"
const envNumber = (name) => Number(envString(name))

const getEnvBaseUrl = () => envString("BASE_URL")
const getEnvEofolRuntimeVerbose = () => envBool("EOFOL_RUNTIME_VERBOSE")
const getEnvVerbosityLevel = () => envNumber("EOFOL_VERBOSITY_LEVEL")
const getEnvEofolRootElementId = () => envString("EOFOL_ROOT_ELEMENT_ID")
const getEnvEofolRootElementIdPlaceholder = () => envString("EOFOL_ROOT_ELEMENT_ID_PLACEHOLDER")
const getEnvEofolViewsPlaceholder = () => envString("EOFOL_VIEWS_PLACEHOLDER")
const getEnvEofolNamePlaceholder = () => envString("EOFOL_NAME_PLACEHOLDER")
const getEnvEofolServiceWorkerFilename = () => envString("EOFOL_SERVICE_WORKER_FILENAME")
const getEnvCryptoIdLength = () => envNumber("CRYPTO_ID_LENGTH")
const getEnvEofolName = () => envString("EOFOL_NAME")

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
