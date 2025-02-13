import { getTheme } from "./theme"
import { base, baseUi, themed } from "./styles"

export const stylesInit = () => {
  const theme = getTheme()
  base(theme)
  baseUi(theme)
  themed(theme)
}
