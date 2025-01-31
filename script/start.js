const clean = require("./impl/clean")
const build = require("./impl/build")
const serve = require("./impl/serve")
const Watchpack = require("watchpack")
const { primary } = require("@eofol/eofol-dev-utils")

const listOfFiles = []
const listOfNotExistingItems = []
const listOfDirectories = ["src", "project"]

const wp = new Watchpack({
  aggregateTimeout: 1000,
  poll: true,
  followSymlinks: true,
  ignored: "**/.git",
})

wp.watch({
  files: listOfFiles,
  directories: listOfDirectories,
  missing: listOfNotExistingItems,
  startTime: Date.now() - 10000,
})

const recompile = async () => {
  console.log(primary("Recompiling..."))
  await build()
}

const handleChange = async () => {
  await recompile()
}

const handleRemove = async () => {
  await recompile()
}

wp.on("change", handleChange)
wp.on("remove", handleRemove)

console.clear()

clean()
build().then(() => {
  serve()
})
