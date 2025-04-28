import { tanstackConfig } from "@tanstack/eslint-config";
import * as reactHooks from "eslint-plugin-react-hooks";

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';


export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/build/**", "**/.next/**"],
  },
  reactHooks.configs["recommended-latest"],
  ...tanstackConfig,
);
