import DX from "../images/variants/dx.svg"
import STD from "../images/variants/std.svg"
import classes from "./Variant.module.css"

const Variant = ({ deluxe }: { deluxe: boolean }) => (
  <img className={classes.variant} src={deluxe ? DX : STD} />
)

export default Variant
