import {
  DialogContent,
  DialogOverlay,
  DialogProps,
  Root,
} from "@radix-ui/react-dialog"
import { PropsWithChildren } from "react"
import classes from "./Dialog.module.scss"

export const Dialog = ({
  children,
  ...dialogProps
}: PropsWithChildren<DialogProps>) => (
  <Root {...dialogProps}>
    <DialogOverlay className={classes.overlay} />
    <DialogContent className={classes.content}>{children}</DialogContent>
  </Root>
)
