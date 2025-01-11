const { join } = require("../util/fs")

const CWD = process.cwd()

const FILENAME = { DIRNAME_DIST: "/dist", DIRNAME_BUILD: "/build" }

module.exports = {
  PATH: {
    CWD,
    ...FILENAME,
    PATH_DIST: join(CWD, FILENAME.DIRNAME_DIST),
    PATH_BUILD: join(CWD, FILENAME.DIRNAME_BUILD),
  },
}
