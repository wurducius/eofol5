import { button } from "../simple"
import { eButtonProps } from "./types"

export const eButton = (props: eButtonProps) => {
  const { children, className, onClick } = props

  return button(
    children,
    className,
    {},
    {
      onclick: onClick,
    },
  )
}
