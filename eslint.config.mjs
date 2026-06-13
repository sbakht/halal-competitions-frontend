import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    ignores: ['dist', '.output', '.nuxt'],
  },
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-component-names': 'off',
      'vue/no-deprecated-router-link-tag-prop': 'off',
    },
  },
  {
    files: ['tests/**/*.spec.{js,ts}', '**/__tests__/**/*.{js,ts}'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
  },
  {
    files: ['utils/firebase.js'],
    rules: {
      'import/no-mutable-exports': 'off',
    },
  },
)
