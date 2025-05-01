import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const isServer = typeof window === "undefined";

export const env = createEnv({
  server: {
    SERVER_URL: z.string().url().optional(),
    CLERK_SECRET_KEY: z.string(),
  },

  isServer,

  /**
   * The prefix that client-side variables must have. This is enforced both at
   * a type-level and at runtime.
   */
  clientPrefix: "VITE_",

  client: {
    VITE_CLERK_PUBLISHABLE_KEY: z.string(),
  },

  /**
   * What object holds the environment variables at runtime. This is usually
   * `process.env` or `import.meta.env`.
   */
  runtimeEnvStrict: {
    SERVER_URL: process.env.SERVER_URL,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    VITE_CLERK_PUBLISHABLE_KEY: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
  },

  /**
   * By default, this library will feed the environment variables directly to
   * the Zod validator.
   *
   * This means that if you have an empty string for a value that is supposed
   * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
   * it as a type mismatch violation. Additionally, if you have an empty string
   * for a value that is supposed to be a string with a default value (e.g.
   * `DOMAIN=` in an ".env" file), the default value will never be applied.
   *
   * In order to solve these issues, we recommend that all new projects
   * explicitly specify this option as true.
   */
  emptyStringAsUndefined: true,
});
