import { SegmentGroup } from "@ark-ui/react/segment-group"
import { forwardRef } from "react"

export const SegmentGroupItem = forwardRef<
  HTMLLabelElement,
  SegmentGroup.ItemProps
>((props, ref) => {
  const { asChild, children, ...rest } = props
  return (
    <SegmentGroup.Item {...rest} ref={ref}>
      <SegmentGroup.ItemControl />
      <SegmentGroup.ItemText asChild={asChild}>
        {children}
      </SegmentGroup.ItemText>
      <SegmentGroup.ItemHiddenInput />
    </SegmentGroup.Item>
  )
})

SegmentGroupItem.displayName = "SegmentGroupItem"
