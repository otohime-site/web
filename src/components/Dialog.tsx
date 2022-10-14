import { blackA } from "@radix-ui/colors"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { styled } from "./stitches.config"

export const DialogRoot = DialogPrimitive.Root
export const DialogPortol = DialogPrimitive.Portal
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: blackA.blackA9,
  position: "fixed",
  inset: 0,
})
export const DialogContent = styled(DialogPrimitive.Content, {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  maxWidth: "900px",
  borderRadius: 8,
  padding: 24,
})
export const DialogTitle = DialogPrimitive.Title
export const DialogClose = DialogPrimitive.Close
