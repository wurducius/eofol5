import { defineFlat } from "../runtime"
import { div, e } from "../dom"

export const FLEX = "eofol-flex"
export const ROW = "eofol-row"
export const COL = "eofol-col"
export const CENTER_FLEX = "eofol-center-flex"
export const CENTER_FLEX_FULL = "eofol-center-flex-full"

defineFlat(FLEX, (props) => div("flex-base", props.children))

defineFlat(ROW, (props) => div("flex-row", props.children))

defineFlat(COL, (props) => div("flex-col", props.children))

defineFlat(CENTER_FLEX, (props) => div("flex-center", props.children))

defineFlat(CENTER_FLEX_FULL, (props) => div("flex-center-full", props.children))

export const flex = e(FLEX)
export const row = e(ROW)
export const col = e(COL)
export const centerFlex = e(CENTER_FLEX)
export const centerFlexFull = e(CENTER_FLEX_FULL)
