import { getEnvCryptoIdLength } from "../../project/src/env"

const generateString = (length: number) => () =>
  Array(length)
    .fill("")
    .map(() => Math.random().toString(36).charAt(2))
    .join("")

export const generateId = generateString(getEnvCryptoIdLength())
