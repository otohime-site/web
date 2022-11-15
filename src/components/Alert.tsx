import { styled } from "./stitches.config"

export const Alert = styled("div", {
  padding: "8px",
  variants: {
    severity: {
      info: {
        background: "$indigo3",
        color: "$indigo12",
      },
      error: {
        background: "$red3",
        color: "$red12",
      },
      warning: {
        background: "$yellow3",
        color: "$yellow12",
      },
    },
  },
})
