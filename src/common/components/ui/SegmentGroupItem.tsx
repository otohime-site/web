import { SegmentGroup } from "@ark-ui/react/segment-group"
import { Ref } from "react"

export const SegmentGroupItem = ({
  ref,
  asChild,
  children,
  ...rest
}: SegmentGroup.ItemProps & { ref?: Ref<HTMLLabelElement> }) => (
  <SegmentGroup.Item {...rest} ref={ref}>
    <SegmentGroup.ItemControl />
    <SegmentGroup.ItemText asChild={asChild}>{children}</SegmentGroup.ItemText>
    <SegmentGroup.ItemHiddenInput />
  </SegmentGroup.Item>
)
