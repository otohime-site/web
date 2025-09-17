import { Link, LinkProps } from "wouter"

export const LinkButton = (props: LinkProps) => {
  return (
    <Link {...props} asChild>
      <a className="btn">{props.children}</a>
    </Link>
  )
}

LinkButton.displayName = "LinkButton"
