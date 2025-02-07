const envDefault = {
  BASE_URL: "/",
  EOFOL_RUNTIME_VERBOSE: false,
  EOFOL_VERBOSITY_LEVEL: 3,
  EOFOL_ROOT_ELEMENT_ID: "root",
  EOFOL_ROOT_ELEMENT_ID_PLACEHOLDER: "@root@",
  EOFOL_VIEWS_PLACEHOLDER: "@VIEWS@",
  EOFOL_NAME_PLACEHOLDER: "@EOFOL_NAME@",
  EOFOL_SERVICE_WORKER_FILENAME: "service-worker.js",
  CRYPTO_ID_LENGTH: 17,
  EOFOL_NAME: "Eofol5",
  PORT: 3000,
  HOST: "0.0.0.0",
  HTTPS: true,
  GENERATE_SOURCEMAP: true,
  CHOKIDAR_USEPOLLING: true,
  BUILD_PATH: "/build",
  EOFOL_STRICT: false,
  MODE: "development",
  SERVICE_WORKER: true,
  ANALYZE: false,
}

module.exports = envDefault
