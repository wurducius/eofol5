import { BASE } from "./components"
import { EofolProps } from "../../types"
import { cx } from "../../util"
import { defineBase } from "./util"

export const FLEX_STYLE = {
  flexBase: "flex-base",
  flexRow: "flex-row",
  flexCol: "flex-col",
  flexCenter: "flex-center",
  flexCenterFull: "flex-center-full",
}

export const flex = defineBase(BASE.flex, FLEX_STYLE.flexBase)
export const flexRow = defineBase(BASE.row, FLEX_STYLE.flexRow)
export const flexCol = defineBase(BASE.col, FLEX_STYLE.flexCol)
export const flexCenter = defineBase(BASE.centerFlex, FLEX_STYLE.flexCenter)
export const flexCenterFull = defineBase(BASE.centerFlexFull, FLEX_STYLE.flexCenterFull)

export type FlexProps = EofolProps<{ direction?: "row" | "col"; center?: boolean; full?: boolean }>

export const eFlex = (props: FlexProps | undefined) => {
  const propsImpl = props ?? {}
  return flex(propsImpl.children, undefined, {
    className: cx(
      propsImpl.direction === "row" && FLEX_STYLE.flexRow,
      propsImpl.direction === "col" && FLEX_STYLE.flexCol,
      propsImpl.center && FLEX_STYLE.flexCenter,
      propsImpl.full && FLEX_STYLE.flexCenterFull,
      propsImpl.className,
    ),
  })
}
