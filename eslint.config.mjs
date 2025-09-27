import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  {
    languageOptions: {
      parserOptions: {
        extraFileExtensions: ['.react'],
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.recommended,
  tseslint.configs.stylistic,
  prettierConfig,

  {
    files: ['**/*.{ts,tsx,mts,cts}'],

    rules: {
      'no-undef': 'off',
    },
  }
);
