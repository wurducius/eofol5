import { button } from "../simple"

export const eButton = (children: string, onClick?: () => void, className?: string) =>
  button(
    children,
    className,
    {},
    {
      onclick: onClick,
    },
  )
