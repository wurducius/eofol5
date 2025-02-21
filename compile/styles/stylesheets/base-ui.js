const { ssy } = require("../../extract/ssx")

// eslint-disable-next-line no-unused-vars
const baseUi = (theme) => {
  const displayFlex = { display: "flex" }
  const centerFlex = { justifyContent: "center", alignItems: "center" }

  ssy("flex-base", { ...displayFlex })
  ssy("flex-col", { ...displayFlex, flexDirection: "column" })
  ssy("flex-row", { ...displayFlex, flexDirection: "row" })
  ssy("flex-center", { ...displayFlex, ...centerFlex })
  ssy("flex-center-full", { ...displayFlex, ...centerFlex, height: "100%" })
}

module.exports = baseUi
