import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import clsx from "clsx"
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"
import classes from "./ToggleGroup.module.css"
import colorClasses from "./colors.module.scss"
import { colors } from "./constants"

export const ToggleGroup = ToggleGroupPrimitive.Root
export const ToggleGroupItem = forwardRef<
  ElementRef<typeof ToggleGroupPrimitive.Item>,
  ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & {
    color?: (typeof colors)[number]
  }
>(({ children, className, color, ...props }, forwardedRef) => (
  <ToggleGroupPrimitive.Item
    {...props}
    className={clsx(
      classes["toggle-group-item"],
      colorClasses[color ?? "mauve"],
      className,
    )}
    ref={forwardedRef}
  >
    {children}
  </ToggleGroupPrimitive.Item>
))

ToggleGroupItem.displayName = "ToggleGroupItem"
