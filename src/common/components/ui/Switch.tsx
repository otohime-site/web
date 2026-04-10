import { Switch as ArkSwitch } from "@ark-ui/react/switch"
import { Ref } from "react"

interface SwitchProps extends ArkSwitch.LabelBaseProps, ArkSwitch.RootProps {
  ref?: Ref<HTMLLabelElement>
}

export const Switch = ({ ref, asChild, children, ...rest }: SwitchProps) => (
  <ArkSwitch.Root {...rest} ref={ref}>
    <ArkSwitch.Control>
      <ArkSwitch.Thumb />
    </ArkSwitch.Control>
    <ArkSwitch.Label asChild={asChild}>{children}</ArkSwitch.Label>
    <ArkSwitch.HiddenInput />
  </ArkSwitch.Root>
)
