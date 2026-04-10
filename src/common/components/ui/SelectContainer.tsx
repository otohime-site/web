import { Portal } from "@ark-ui/react/portal"
import { CollectionItem, Select } from "@ark-ui/react/select"
import React from "react"
import IconArrowDropDown from "~icons/mdi/arrow-drop-down"

interface SelectContainerProps<T extends CollectionItem>
  extends
    Select.RootProps<T>,
    Pick<Select.ContentProps, "asChild" | "children"> {
  label: string
  ref?: React.Ref<HTMLDivElement>
}

export const SelectContainer = <T extends CollectionItem>({
  ref,
  asChild,
  children,
  label,
  ...rest
}: SelectContainerProps<T>) => (
  <Select.Root {...rest} ref={ref}>
    <Select.Label>{label}</Select.Label>
    <Select.Control>
      <Select.Trigger>
        <Select.ValueText />
        <Select.Indicator>
          <IconArrowDropDown />
        </Select.Indicator>
      </Select.Trigger>
    </Select.Control>
    <Portal>
      <Select.Positioner>
        <Select.Content asChild={asChild}>{children}</Select.Content>
      </Select.Positioner>
    </Portal>
    <Select.HiddenSelect />
  </Select.Root>
)
