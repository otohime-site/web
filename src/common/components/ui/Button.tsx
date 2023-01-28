import {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  PropsWithChildren,
} from "react"
import { Link } from "react-router-dom"
import classes from "./Button.module.css"

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>
>(({ className, children }, forwardedRef) => (
  <button className={`${classes.button} ${className ?? ""}`} ref={forwardedRef}>
    {children}
  </button>
))

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
