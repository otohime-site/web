import { RadioGroup } from "@ark-ui/react/radio-group"
import { Ref } from "react"

export const RadioGroupItem = ({
  ref,
  asChild,
  children,
  ...rest
}: RadioGroup.ItemProps & { ref?: Ref<HTMLLabelElement> }) => (
  <RadioGroup.Item {...rest} ref={ref}>
    <RadioGroup.ItemControl />
    <RadioGroup.ItemText asChild={asChild}>{children}</RadioGroup.ItemText>
    <RadioGroup.ItemHiddenInput />
  </RadioGroup.Item>
)
