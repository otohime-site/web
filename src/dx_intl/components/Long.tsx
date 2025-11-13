import LONG from "../images/variants/long.svg"
import classes from "./Long.module.css"

const Long = ({ long }: { long: boolean }) =>
  long ? <img className={classes.long} src={LONG} /> : <></>

export default Long
