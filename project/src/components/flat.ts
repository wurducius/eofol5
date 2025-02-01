import { h3, defineFlat } from "../../../src"

export const FLAT = "flat"

defineFlat(FLAT, () => h3("Flat element example"))
