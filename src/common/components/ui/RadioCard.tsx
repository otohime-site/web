import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"

import classes from "./RadioCard.module.css"

export const RadioCardRoot = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, children, ...props }, forwardedRef) => (
  <RadioGroupPrimitive.Root
    {...props}
    className={`${classes["radio-card-root"]} ${className}`}
    ref={forwardedRef}
  >
    {children}
  </RadioGroupPrimitive.Root>
))

RadioCardRoot.displayName = "RadioCardRoot"

export const RadioCard = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Item>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, forwardedRef) => (
  <RadioGroupPrimitive.RadioGroupItem
    {...props}
    className={`${classes["radio-card"]} ${className}`}
    ref={forwardedRef}
  >
    <div className={classes["radio-card-button"]}>
      <RadioGroupPrimitive.RadioGroupIndicator
        className={classes["radio-card-indicator"]}
      />
    </div>
    {children}
  </RadioGroupPrimitive.RadioGroupItem>
))

RadioCard.displayName = "RadioCard"
