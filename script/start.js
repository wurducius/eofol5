const clean = require("./impl/clean")
const build = require("./impl/build")
const serve = require("./impl/serve")

console.clear()

clean()
build()
serve()
