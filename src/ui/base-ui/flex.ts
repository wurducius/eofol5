import { defineSimple } from "../util"
import { BASE } from "./components"
import { VDOMChildren } from "../../types"
import { cx } from "../../util"

export const FLEX_STYLE = {
  flexBase: "flex-base",
  flexRow: "flex-row",
  flexCol: "flex-col",
  flexCenter: "flex-center",
  flexCenterFull: "flex-center-full",
}

export const flex = defineSimple(BASE.flex, FLEX_STYLE.flexBase)
export const flexRow = defineSimple(BASE.row, FLEX_STYLE.flexRow)
export const flexCol = defineSimple(BASE.col, FLEX_STYLE.flexCol)
export const flexCenter = defineSimple(BASE.centerFlex, FLEX_STYLE.flexCenter)
export const flexCenterFull = defineSimple(BASE.centerFlexFull, FLEX_STYLE.flexCenterFull)

export type FlexProps = { children?: VDOMChildren; direction?: "row" | "col"; center?: boolean; full?: boolean }

export const eFlex = (props: FlexProps | undefined) => {
  const propsImpl = props ?? {}
  return flex(
    propsImpl.children,
    cx(
      propsImpl.direction === "row" && FLEX_STYLE.flexRow,
      propsImpl.direction === "col" && FLEX_STYLE.flexCol,
      propsImpl.center && FLEX_STYLE.flexCenter,
      propsImpl.full && FLEX_STYLE.flexCenterFull,
    ),
  )
}
