import { syHtml, Theme } from "../../../src"

export const base = (theme: Theme) => {
  const {
    typography: { fontSize, formFontSize },
  } = theme

  const fontFamilyInherit = { fontFamily: "inherit" }

  const formStyle = { ...fontFamilyInherit, fontSize: `${formFontSize}px` }

  syHtml("button", { ...formStyle, fontWeight: 500, cursor: "pointer" })
  syHtml("input", { ...formStyle, height: "46px", padding: "0 16px" })
  syHtml("textarea", { ...formStyle })
  syHtml("select", { ...formStyle })

  syHtml("p", { margin: "0 0 0 0" })

  syHtml("h1", { ...fontFamilyInherit, fontSize: `${fontSize[1]}em` })
  syHtml("h2", { ...fontFamilyInherit, fontSize: `${fontSize[2]}em` })
  syHtml("h3", { ...fontFamilyInherit, fontSize: `${fontSize[3]}em` })
  syHtml("h4", { ...fontFamilyInherit, fontSize: `${fontSize[4]}em` })
  syHtml("h5", { ...fontFamilyInherit, fontSize: `${fontSize[5]}em` })
  syHtml("h6", { ...fontFamilyInherit, fontSize: `${fontSize[6]}em` })

  syHtml("a", { ...fontFamilyInherit, textDecoration: "none" })

  syHtml("button", {
    ...fontFamilyInherit,
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    padding: "0 16px",
    height: "48px",
  })

  syHtml("body", { width: "16px" }, "::-webkit-scrollbar")
  syHtml(
    "body",
    {
      height: "56px",
      borderRadius: "8px",
      border: "4px solid transparent",
      backgroundColor: "hsl(0, 0%, 67%)",
      backgroundClip: "content-box",
    },
    "::-webkit-scrollbar-thumb",
  )
}
