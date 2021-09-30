import { styled } from "@mui/material/styles"
import { FunctionComponent } from "react"
import DX from "./variants/dx.svg"
import STD from "./variants/std.svg"

const VariantImage = styled("img")`
  height: 1em;
`

const Variant: FunctionComponent<{
  deluxe: boolean
}> = ({ deluxe }) => <VariantImage src={deluxe ? DX : STD} />

export default Variant
