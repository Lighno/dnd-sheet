//  @ts-check
import * as tailwindcss from "prettier-plugin-tailwindcss";

/** @type {import('prettier').Config} */
const config = {
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  plugins: [tailwindcss],
  tailwindPreserveWhitespace: true,
};

export default config;
