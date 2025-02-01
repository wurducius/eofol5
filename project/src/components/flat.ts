import { defineFlat, h2 } from "../../../src"

export const FLAT = "flat"

defineFlat(FLAT, () => h2("Flat element example"))
