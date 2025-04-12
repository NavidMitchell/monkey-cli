import perfectionist from 'eslint-plugin-perfectionist'
import unicorn from 'eslint-plugin-unicorn'

export default [
  {
    plugins: {
      perfectionist,
      unicorn
    },
    rules: {
      'perfectionist/sort-imports': 'off',
      'perfectionist/sort-named-imports': 'off',
      'unicorn/filename-case': 'off'
    }
  }
]