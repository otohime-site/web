import clsx from "clsx"
import { Link, LinkProps } from "wouter"

export const LinkButton = ({
  className,
  ...props
}: LinkProps & { className?: string }) => {
  return (
    <Link {...props} asChild>
      <a className={clsx("btn", className)}>{props.children}</a>
    </Link>
  )
}

LinkButton.displayName = "LinkButton"
