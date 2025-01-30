import { defineFlat } from "../../../src/runtime"
import { h3 } from "../../../src/dom"

export const FLAT = "flat"

defineFlat(FLAT, () => h3(undefined, "Flat element example"))
