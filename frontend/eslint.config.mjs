// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'vue/no-unused-components': 'warn',
      'vue/require-default-prop': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  }
)
