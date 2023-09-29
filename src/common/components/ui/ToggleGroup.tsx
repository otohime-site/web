import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import clsx from "clsx"
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"
import classes from "./ToggleGroup.module.css"

export const ToggleGroup = ToggleGroupPrimitive.Root
export const ToggleGroupItem = forwardRef<
  ElementRef<typeof ToggleGroupPrimitive.Item>,
  ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
>(({ children, className, ...props }, forwardedRef) => (
  <ToggleGroupPrimitive.Item
    {...props}
    className={clsx(classes["toggle-group-item"], className)}
    ref={forwardedRef}
  >
    {children}
  </ToggleGroupPrimitive.Item>
))

ToggleGroupItem.displayName = "ToggleGroupItem"
