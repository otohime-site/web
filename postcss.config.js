import OpenProps from "open-props"
import postcssJitProps from "postcss-jit-props"
import postcssNesting from "postcss-nesting"
import postcssPresetEnv from "postcss-preset-env"

export default {
  plugins: [postcssJitProps(OpenProps), postcssNesting(), postcssPresetEnv()],
}
