import clsx from "clsx"
import { ButtonHTMLAttributes, forwardRef, PropsWithChildren } from "react"
import { Link, LinkProps } from "wouter"
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
  <button
    {...props}
    className={clsx(classes.button, colorClasses[color], className)}
    ref={forwardedRef}
  >
    {children}
  </button>
))

Button.displayName = "Button"

export const LinkButton = forwardRef<
  HTMLAnchorElement,
  LinkProps & { color: (typeof colors)[number] }
>(({ color, className, children, ...props }, forwardedRef) => (
  <Link {...props}>
    <a
      ref={forwardedRef}
      className={clsx(classes.button, colorClasses[color], className)}
    >
      {children}
    </a>
  </Link>
))

LinkButton.displayName = "LinkButton"
