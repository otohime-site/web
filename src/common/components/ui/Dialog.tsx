import * as DialogPrimitive from "@radix-ui/react-dialog"
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"
import classes from "./Dialog.module.css"

export const Dialog = DialogPrimitive.Root
export const DialogContent = forwardRef<
  ElementRef<typeof DialogPrimitive.DialogContent>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.DialogContent>
>(({ children, ...props }, forwardedRef) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className={classes.overlay} />
    <DialogPrimitive.Content
      {...props}
      className={classes.content}
      ref={forwardedRef}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))

DialogContent.displayName = "DialogContent"

export const DialogTitle = DialogPrimitive.Title
export const DialogClose = DialogPrimitive.Close
