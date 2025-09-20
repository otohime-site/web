import { RadioGroup } from "@ark-ui/react/radio-group"
import { forwardRef } from "react"

export const RadioGroupItem = forwardRef<
  HTMLLabelElement,
  RadioGroup.ItemProps
>((props, ref) => {
  const { asChild, children, ...rest } = props
  return (
    <RadioGroup.Item {...rest} ref={ref}>
      <RadioGroup.ItemControl />
      <RadioGroup.ItemText asChild={asChild}>{children}</RadioGroup.ItemText>
      <RadioGroup.ItemHiddenInput />
    </RadioGroup.Item>
  )
})

RadioGroupItem.displayName = "RadioGroupItem"
