import vitest from "@vitest/eslint-plugin"
import { defineConfig } from "eslint/config"

export default defineConfig({
  files: ["**/*.test.ts", "**/*.test.tsx"],
  plugins: { vitest },
  rules: {
    ...vitest.configs.recommended.rules,
  },
})
