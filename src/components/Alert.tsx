import { styled } from "./stitches.config"

export const Alert = styled("div", {
  variants: {
    severity: { info: {}, error: {}, warning: {} },
  },
})
