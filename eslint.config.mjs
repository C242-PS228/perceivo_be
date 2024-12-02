import globals from 'globals';
import pluginJs from '@eslint/js';
import daStyle from 'eslint-config-dicodingacademy';

/** @type {import('eslint').Linter.Config[]} */
export default [
  daStyle,
  { files: ['./src/*.js', './middleware/*.js', './handler/*.js'], languageOptions: { sourceType: 'commonjs', globals: { ...globals.node }, } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    rules: {
      'no-undef': 'off',
    },
  },
];