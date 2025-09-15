import { Progress as ArkProgess } from "@ark-ui/react/progress"
import clsx from "clsx"
import classes from "./Progress.module.css"

interface ProgressProps extends ArkProgess.RootProps {
  label?: string
}
export const Progress = ({ label, className, ...props }: ProgressProps) => (
  <ArkProgess.Root className={clsx(className, classes.progress)} {...props}>
    <ArkProgess.Label>{label}</ArkProgess.Label>
    <ArkProgess.ValueText />
    <ArkProgess.Track>
      <ArkProgess.Range />
    </ArkProgess.Track>
  </ArkProgess.Root>
)
