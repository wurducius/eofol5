import { CRYPTO_ID_LENGTH } from "../constants"

const generateString = (length) => () =>
  Array(length)
    .fill("")
    .map(() => Math.random().toString(36).charAt(2))
    .join("")

export const generateId = generateString(CRYPTO_ID_LENGTH)
