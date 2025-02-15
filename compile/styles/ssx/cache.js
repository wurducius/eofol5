let ssxCache = ""

const getSsxCache = () => ssxCache

const setSsxCache = (nextValue) => {
  ssxCache = nextValue
}

const SSX_CACHE_SEPARATOR = "\n"

const resetSsxCache = () => setSsxCache("")

const appendSsxCache = (nextRule) => setSsxCache(`${getSsxCache()}${SSX_CACHE_SEPARATOR}${nextRule}`)

module.exports = { getSsxCache, setSsxCache, resetSsxCache, appendSsxCache }
