import clsx from "clsx"
import { ButtonHTMLAttributes, forwardRef, PropsWithChildren } from "react"
import { Link, LinkProps } from "wouter"
import classes from "./Button.module.css"

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>
>(({ className, children, ...props }, forwardedRef) => (
  <button
    {...props}
    className={clsx(classes.button, className)}
    ref={forwardedRef}
  >
    {children}
  </button>
))

Button.displayName = "Button"

export const LinkButton = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, children, ...props }, forwardedRef) => (
    <Link {...props}>
      <a ref={forwardedRef} className={clsx(classes.button, className)}>
        {children}
      </a>
    </Link>
  ),
)

LinkButton.displayName = "LinkButton"
