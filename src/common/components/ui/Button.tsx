import clsx from "clsx"
import {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  PropsWithChildren,
} from "react"
import { Interactive } from "react-interactive"
import { Link } from "wouter"
import classes from "./Button.module.css"
import colorClasses from "./colors.module.scss"

const colors = [
  "indigo",
  "red",
  "blue",
  "green",
  "yellow",
  "mauve",
  "violet",
  "indigo",
  "plum",
  "mauve",
] as const

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<
    ButtonHTMLAttributes<HTMLButtonElement> & {
      color: (typeof colors)[number]
    }
  >
>(({ color, className, children, ...props }, forwardedRef) => (
  <Interactive
    as="button"
    {...props}
    className={clsx(classes.button, colorClasses[color], className)}
    ref={forwardedRef}
  >
    {children}
  </Interactive>
))

Button.displayName = "Button"

export const LinkButton = forwardRef<
  ElementRef<typeof Link>,
  ComponentPropsWithoutRef<typeof Link> & { color: (typeof colors)[number] }
>(({ color, className, children, ...props }, forwardedRef) => (
  <Interactive as={Link} {...props} ref={forwardedRef}>
    <a className={clsx(classes.button, colorClasses[color], className)}>
      {children}
    </a>
  </Interactive>
))

LinkButton.displayName = "LinkButton"
