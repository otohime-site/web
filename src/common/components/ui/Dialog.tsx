import * as DialogPrimitive from "@radix-ui/react-dialog"
import clsx from "clsx"
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"
import classes from "./Dialog.module.css"

export const Dialog = DialogPrimitive.Root
export const DialogContent = forwardRef<
  ElementRef<typeof DialogPrimitive.DialogContent>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.DialogContent>
>(({ children, className, ...props }, forwardedRef) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className={classes.overlay} />
    <DialogPrimitive.Content
      {...props}
      className={clsx(classes.content, className)}
      ref={forwardedRef}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))

DialogContent.displayName = "DialogContent"

export const DialogTitle = DialogPrimitive.Title
export const DialogClose = DialogPrimitive.Close
