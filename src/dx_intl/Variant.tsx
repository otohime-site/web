import { FunctionComponent } from "react"
import styled from "@emotion/styled"
import STD from "./variants/std.svg"
import DX from "./variants/dx.svg"

const VariantImage = styled("img")`
  height: 1em;
`

const Variant: FunctionComponent<{
  deluxe: boolean
}> = ({ deluxe }) => <VariantImage src={deluxe ? DX : STD} />

export default Variant
