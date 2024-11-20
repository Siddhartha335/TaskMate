import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"], // Lint these file types
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser, // Keep browser globals if you're working in a browser context
        process: "readonly", // Add Node.js global process
      },
    },
  },
  pluginJs.configs.recommended, // Use recommended JS config
  ...tseslint.configs.recommended, // Use recommended TypeScript config
];
