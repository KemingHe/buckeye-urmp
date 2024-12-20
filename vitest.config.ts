// ./vitest.config.ts
//
// Root configuration file for the vitest test runner.

// Vitest essential imports.
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

// -----------------------------------------------------------------------------
export default defineConfig({
  plugins: [tsconfigPaths()],

  test: {
    // Test file patterns.
    include: [
      "scripts/**/*.test.ts",
      "src/**/*.test.ts",
      "src/**/*.test.tsx",
    ],

    // Disable test file watching.
    watch: false,

    // Setup files to run before all tests.
    setupFiles: ["vitest.setup.ts"],

    // Resolve path aliases use in test files for better import readability.
    alias: 
      // biome-ignore format: added alignment for clarity.
      {
        "@scripts/"   : new URL("./scripts/",         import.meta.url).pathname,
        "@src/"       : new URL("./src/",             import.meta.url).pathname,
        "@app/"       : new URL("./src/app/",         import.meta.url).pathname,
        "@components/": new URL("./src/components/",  import.meta.url).pathname,
        "@constants/" : new URL("./src/constants/",   import.meta.url).pathname,
        "@contexts/"  : new URL("./src/contexts/",    import.meta.url).pathname,
        "@guards/"    : new URL("./src/guards/",      import.meta.url).pathname,
        "@handlers/"  : new URL("./src/handlers/",    import.meta.url).pathname,
        "@hooks/"     : new URL("./src/hooks/",       import.meta.url).pathname,
        "@lib/"       : new URL("./src/lib/",         import.meta.url).pathname,
        "@schemas/"   : new URL("./src/schemas/",     import.meta.url).pathname,
        "@utils/"     : new URL("./src/utils/",       import.meta.url).pathname,
    }
  }
});
