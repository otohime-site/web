import {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  PropsWithChildren,
} from "react"
import { Link } from "react-router-dom"
import classes from "./Button.module.css"

export const Button = ({
  className,
  children,
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => (
  <button className={`${classes.button} ${className ?? ""}`}>{children}</button>
)

Button.displayName = "Button"

export const LinkButton = forwardRef<
  ElementRef<typeof Link>,
  ComponentPropsWithoutRef<typeof Link>
>((props, forwardedRef) => (
  <Link
    {...props}
    className={`${classes.button} ${props.className ?? ""}`}
    ref={forwardedRef}
  >
    {props.children}
  </Link>
))

LinkButton.displayName = "LinkButton"
