import clsx from "clsx"
import { forwardRef, InputHTMLAttributes, PropsWithChildren } from "react"
import classes from "./TextField.module.css"

export const TextField = forwardRef<
  HTMLInputElement,
  PropsWithChildren<InputHTMLAttributes<HTMLInputElement>>
>(({ className, children, ...props }, forwardedRef) => (
  <input
    type="text"
    {...props}
    className={clsx(classes["text-field"], className)}
    ref={forwardedRef}
  >
    {children}
  </input>
))

TextField.displayName = "TextField"
