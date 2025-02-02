const fs = require("node:fs")
const { promises: fsPromises } = require("fs")
const { join } = require("./fs")

const CWD = process.cwd()

const eJoin = (...path) => join(CWD, ...path)

const eReadImpl = (path) => fs.readFileSync(path).toString()

const eRead = (...path) => eReadImpl(eJoin(...path))

const eReadFull = (...path) => eReadImpl(join(...path))

const eReadAsyncImpl = (path) => fsPromises.readFile(path).toString()

const eReadAsync = (...path) => eReadAsyncImpl(eJoin(...path))

const eReadFullAsync = (...path) => eReadAsyncImpl(join(...path))

const eWriteImpl = (content, path) => fs.writeSync(path, content)

const eWrite = (content, ...path) => eWriteImpl(content, eJoin(...path))

const eWriteFull = (content, ...path) => eWriteImpl(content, join(...path))

const eWriteAsyncImpl = (content, path) => fsPromises.writeFile(path, content)

const eWriteAsync = (content, ...path) => eWriteAsyncImpl(content, eJoin(...path))

const eWriteAsyncFull = (content, ...path) => eWriteAsyncImpl(content, join(...path))

module.exports = {
  eRead,
  eReadFull,
  eReadAsync,
  eReadFullAsync,
  eWrite,
  eWriteFull,
  eWriteAsync,
  eWriteAsyncFull,
}
