const { getConfig } = require("../src/config")
const { exists, mkdir, write, join } = require("../src/util/fs")

const config = getConfig()

const build = () => {
  const BUILD_PATH = config.PATH.PATH_BUILD
  if (!exists(BUILD_PATH)) {
    mkdir(BUILD_PATH)
  }

  write(
    join(BUILD_PATH, "index.html"),
    "<html>\n<head>\n  <title>EOFOL5</title>\n</head>\n<body>\n  <div>\n    TADA\n  </div>\n</body>\n</html>",
  )
}

module.exports = build
