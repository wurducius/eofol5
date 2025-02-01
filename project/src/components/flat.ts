import { defineFlat } from "../../../src/runtime"
import { h3 } from "../../../src/render"

export const FLAT = "flat"

defineFlat(FLAT, () => h3("Flat element example"))
