import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"

import clsx from "clsx"
import classes from "./Radio.module.css"

export type RadioVariants = "normal" | "card"

export const RadioRoot = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & {
    variant?: RadioVariants
  }
>(({ className, variant, children, ...props }, forwardedRef) => (
  <RadioGroupPrimitive.Root
    {...props}
    className={clsx(
      variant === "card" && classes["radio-card-root"],
      className,
    )}
    ref={forwardedRef}
  >
    {children}
  </RadioGroupPrimitive.Root>
))

RadioRoot.defaultProps = {
  variant: "normal",
}
RadioRoot.displayName = "RadioRoot"

export const Radio = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Item>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, forwardedRef) => (
  <RadioGroupPrimitive.RadioGroupItem
    {...props}
    className={clsx(classes["radio"], className)}
    ref={forwardedRef}
  >
    <div className={classes["radio-button"]}>
      <RadioGroupPrimitive.RadioGroupIndicator
        className={classes["radio-indicator"]}
      />
    </div>
    {children}
  </RadioGroupPrimitive.RadioGroupItem>
))

Radio.displayName = "Radio"
