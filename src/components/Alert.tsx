import { PropsWithChildren } from "react"
import classes from "./Alert.module.scss"

export const Alert = ({
  severity,
  children,
}: PropsWithChildren<{ severity: "info" | "error" | "warning" }>) => (
  <div className={classes.alert} data-severity={severity}>
    {children}
  </div>
)
