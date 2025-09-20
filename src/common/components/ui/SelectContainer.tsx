import { Portal } from "@ark-ui/react/portal"
import { CollectionItem, Select } from "@ark-ui/react/select"
import React, { ForwardedRef, forwardRef } from "react"
import IconArrowDropDown from "~icons/mdi/arrow-drop-down"

interface SelectContainerProps<T extends CollectionItem>
  extends Select.RootProps<T>,
    Pick<Select.ContentProps, "asChild" | "children"> {
  label: string
}

const SelectContainerInner = <T extends CollectionItem>(
  props: SelectContainerProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  const { asChild, children, label, ...rest } = props
  return (
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
}

// The forwardRef in TypeScript does not support generics props...
export const SelectContainer = forwardRef(SelectContainerInner) as <T>(
  props: SelectContainerProps<T> & { ref?: ForwardedRef<HTMLDivElement> },
) => ReturnType<typeof SelectContainerInner>
