import {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  PropsWithChildren,
} from "react"
import { Interactive } from "react-interactive"
import { Link } from "react-router-dom"
import classes from "./Button.module.css"

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<
    ButtonHTMLAttributes<HTMLButtonElement> & { variant: "plum" }
  >
>(({ variant, className, children, ...props }, forwardedRef) => (
  <Interactive
    as="button"
    {...props}
    className={`${classes.button} ${variant} ${className ?? ""}`}
    ref={forwardedRef}
  >
    {children}
  </Interactive>
))

Button.displayName = "Button"

export const LinkButton = forwardRef<
  ElementRef<typeof Link>,
  ComponentPropsWithoutRef<typeof Link>
>(({ className, children, ...props }, forwardedRef) => (
  <Interactive
    as={Link}
    {...props}
    className={`${classes.button} ${className ?? ""}`}
    ref={forwardedRef}
  >
    {children}
  </Interactive>
))

LinkButton.displayName = "LinkButton"
