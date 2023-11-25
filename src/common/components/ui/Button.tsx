import { Link, LinkProps } from "react-aria-components"

export const LinkButton = (props: LinkProps) => {
  return (
    <Link className="btn" {...props}>
      {props.children}
    </Link>
  )
}

LinkButton.displayName = "LinkButton"
