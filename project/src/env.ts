import { getENV } from "./internals"

export const getEnvBaseUrl = () => getENV().BASE_URL
export const getEnvEofolRuntimeVerbose = () => getENV().EOFOL_RUNTIME_VERBOSE === "true"
// @ts-ignore
export const getEnvVerbosityLevel = () => Number(getENV().EOFOL_VERBOSITY_LEVEL)
// @ts-ignore
export const getEnvEofolRootElementId = () => getENV().EOFOL_ROOT_ELEMENT_ID
// @ts-ignore
export const getEnvEofolRootElementIdPlaceholder = () => getENV().EOFOL_ROOT_ELEMENT_ID_PLACEHOLDER
// @ts-ignore
export const getEnvEofolViewsPlaceholder = () => getENV().EOFOL_VIEWS_PLACEHOLDER
// @ts-ignore
export const getEnvEofolNamePlaceholder = () => getENV().EOFOL_NAME_PLACEHOLDER
// @ts-ignore
export const getEnvEofolServiceWorkerFilename = () => getENV().EOFOL_SERVICE_WORKER_FILENAME
// @ts-ignore
export const getEnvCryptoIdLength = () => Number(getENV().CRYPTO_ID_LENGTH)
// @ts-ignore
export const getEnvEofolName = () => getENV().EOFOL_NAME
