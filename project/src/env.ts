import { getENV } from "./internals"

// @ts-ignore
const envString = (name: string) => getENV()[name]
const envBool = (name: string) => envString(name) === "true"
const envNumber = (name: string) => Number(envString(name))

export const getEnvBaseUrl = () => envString("BASE_URL")
export const getEnvEofolRuntimeVerbose = () => envBool("EOFOL_RUNTIME_VERBOSE")
export const getEnvVerbosityLevel = () => envNumber("EOFOL_VERBOSITY_LEVEL")
export const getEnvEofolRootElementId = () => envString("EOFOL_ROOT_ELEMENT_ID")
export const getEnvEofolRootElementIdPlaceholder = () => envString("EOFOL_ROOT_ELEMENT_ID_PLACEHOLDER")
export const getEnvEofolViewsPlaceholder = () => envString("EOFOL_VIEWS_PLACEHOLDER")
export const getEnvEofolNamePlaceholder = () => envString("EOFOL_NAME_PLACEHOLDER")
export const getEnvEofolServiceWorkerFilename = () => envString("EOFOL_SERVICE_WORKER_FILENAME")
export const getEnvCryptoIdLength = () => envNumber("CRYPTO_ID_LENGTH")
export const getEnvEofolName = () => envString("EOFOL_NAME")
export const getEnvPort = () => envNumber("PORT")
export const getEnvHost = () => envString("HOST")
export const getEnvHTTPS = () => envBool("HTTPS")
export const getEnvGenerateSourceMap = () => envBool("GENERATE_SOURCEMAP")
export const getEnvChokidarUsePolling = () => envBool("CHOKIDAR_USEPOLLING")
export const getEnvBuildPath = () => envString("BUILD_PATH")
export const getEnvEofolStrictMode = () => envBool("EOFOL_STRICT")
export const getEnvMode = () => envString("MODE")
export const getEnvServiceWorker = () => envBool("SERVICE_WORKER")
export const getEnvAnalyze = () => envBool("ANALYZE")
