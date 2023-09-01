import clsx from "clsx"
import { forwardRef, InputHTMLAttributes, PropsWithChildren } from "react"
import { Interactive } from "react-interactive"
import classes from "./TextField.module.css"

export const TextField = forwardRef<
  HTMLInputElement,
  PropsWithChildren<InputHTMLAttributes<HTMLInputElement>>
>(({ className, children, ...props }, forwardedRef) => (
  <Interactive
    as="input"
    type="text"
    {...props}
    className={clsx(classes["text-field"], className)}
    ref={forwardedRef}
  >
    {children}
  </Interactive>
))

TextField.displayName = "TextField"
