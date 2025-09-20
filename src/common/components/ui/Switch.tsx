import { Switch as ArkSwitch } from "@ark-ui/react/switch"
import { forwardRef } from "react"

interface SwitchProps extends ArkSwitch.LabelBaseProps, ArkSwitch.RootProps {}

export const Switch = forwardRef<HTMLLabelElement, SwitchProps>(
  (props, ref) => {
    const { asChild, children, ...rest } = props
    return (
      <ArkSwitch.Root {...rest} ref={ref}>
        <ArkSwitch.Control>
          <ArkSwitch.Thumb />
        </ArkSwitch.Control>
        <ArkSwitch.Label asChild={asChild}>{children}</ArkSwitch.Label>
        <ArkSwitch.HiddenInput />
      </ArkSwitch.Root>
    )
  },
)

Switch.displayName = "Switch"
