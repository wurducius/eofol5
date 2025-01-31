import { defineFlat } from "../runtime"
import { div, e } from "../render"

export const FLEX = "eofol-flex"
export const ROW = "eofol-row"
export const COL = "eofol-col"
export const CENTER_FLEX = "eofol-center-flex"
export const CENTER_FLEX_FULL = "eofol-center-flex-full"

defineFlat(FLEX, (props) => div(props.children, "flex-base"))

defineFlat(ROW, (props) => div(props.children, "flex-row"))

defineFlat(COL, (props) => div(props.children, "flex-col"))

defineFlat(CENTER_FLEX, (props) => div(props.children, "flex-center"))

defineFlat(CENTER_FLEX_FULL, (props) => div(props.children, "flex-center-full"))

export const flex = e(FLEX)
export const row = e(ROW)
export const col = e(COL)
export const centerFlex = e(CENTER_FLEX)
export const centerFlexFull = e(CENTER_FLEX_FULL)
