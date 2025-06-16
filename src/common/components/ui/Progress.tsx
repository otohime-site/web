import clsx from "clsx"
import { Label, ProgressBar, ProgressBarProps } from "react-aria-components"
import classes from "./Progress.module.css"

interface ProgressProps extends ProgressBarProps {
  label?: string
}

export const Progress = ({ label, className, ...props }: ProgressProps) => (
  <ProgressBar className={clsx(className, classes.progress)} {...props}>
    {({ percentage, valueText }) => (
      <>
        <Label> {label} </Label>
        <span className={classes.value}>{valueText}</span>
        <div className={classes.bar}>
          <div className={classes.fill} style={{ width: `${percentage}%` }} />
        </div>
      </>
    )}
  </ProgressBar>
)
