import { Slider as ArkSlider } from "@ark-ui/react/slider"
import clsx from "clsx"
import { ReactNode } from "react"
import classes from "./Slider.module.css"

interface SliderProps extends ArkSlider.RootProps {
  label?: ReactNode
  // Overrides the value text, which defaults to the raw numbers
  valueText?: ReactNode
}

// Single- or range-thumb slider styled through Slider.module.css.
// The thumb count follows the length of `value`/`defaultValue`.
export const Slider = ({
  label,
  valueText,
  className,
  ...props
}: SliderProps) => (
  <ArkSlider.Root className={clsx(className, classes.slider)} {...props}>
    {label != null ? <ArkSlider.Label>{label}</ArkSlider.Label> : null}
    <ArkSlider.ValueText>{valueText}</ArkSlider.ValueText>
    <ArkSlider.Control>
      <ArkSlider.Track>
        <ArkSlider.Range />
      </ArkSlider.Track>
      {(props.value ?? props.defaultValue ?? [0]).map((_, index) => (
        // The index is the thumb's identity for the slider machine
        // eslint-disable-next-line @eslint-react/no-array-index-key
        <ArkSlider.Thumb key={index} index={index}>
          <ArkSlider.HiddenInput />
        </ArkSlider.Thumb>
      ))}
    </ArkSlider.Control>
  </ArkSlider.Root>
)
