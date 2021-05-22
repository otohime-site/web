import React, { FunctionComponent } from "react"
import STD from "./variants/std.svg"
import DX from "./variants/dx.svg"
import styled from "@emotion/styled"


const VariantImage = styled("img")`
  height: 1em;
`

const Variant: FunctionComponent<{
  deluxe: boolean
}> = ({ deluxe }) => <VariantImage src={deluxe ? DX : STD} />

export default Variant
