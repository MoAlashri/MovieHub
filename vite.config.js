import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      js,
      react: pluginReact,
      prettier: pluginPrettier,
    },
    extends: [
      "js/recommended",
      pluginReact.configs.flat.recommended,
      prettierConfig, 
    ],
    rules: {
      "prettier/prettier": "error",
    },
  },
]);
