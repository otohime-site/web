import { gray, indigo, red, yellow } from "@radix-ui/colors"
import { createStitches } from "@stitches/react"

export const { styled } = createStitches({
  theme: {
    colors: {
      ...gray,
      ...yellow,
      ...red,
      ...indigo,
    },
  },
})
