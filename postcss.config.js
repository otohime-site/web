import OpenProps from "open-props"
import postcssJitProps from "postcss-jit-props"

export default {
  plugins: [postcssJitProps(OpenProps)],
}
