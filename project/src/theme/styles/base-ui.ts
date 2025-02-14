import { sy, Theme } from "../../../../src"

// eslint-disable-next-line no-unused-vars
export const baseUi = (theme: Theme) => {
  const displayFlex = { display: "flex" }
  const centerFlex = { justifyContent: "center", alignItems: "center" }

  sy("flex-base", { ...displayFlex })
  sy("flex-col", { ...displayFlex, flexDirection: "column" })
  sy("flex-row", { ...displayFlex, flexDirection: "row" })
  sy("flex-center", { ...displayFlex, ...centerFlex })
  sy("flex-center-full", { ...displayFlex, ...centerFlex, height: "100%" })
}
