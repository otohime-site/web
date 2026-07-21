import { PropsWithChildren } from "react"
import MdiAlertCircleOutline from "~icons/mdi/alert-circle-outline"
import MdiAlertOutline from "~icons/mdi/alert-outline"
import MdiInformationOutline from "~icons/mdi/information-outline"

import classes from "./Alert.module.css"

type AlertSeverity = "info" | "error" | "warning"

const severityIcon = {
  info: MdiInformationOutline,
  error: MdiAlertCircleOutline,
  warning: MdiAlertOutline,
} satisfies Record<AlertSeverity, React.ComponentType>

export const Alert = ({
  severity,
  children,
}: PropsWithChildren<{ severity: AlertSeverity }>) => {
  const Icon = severityIcon[severity]

  return (
    <div
      className={classes.alert}
      data-severity={severity}
      role={severity === "info" ? "status" : "alert"}
    >
      <span className={classes.icon} aria-hidden="true">
        <Icon />
      </span>
      <div className={classes.content}>{children}</div>
    </div>
  )
}
