import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    exclude: ["**/node_modules/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/*.config.*",
        "**/*.test.{ts,tsx}",
        "**/tests/**",
        "**/__snapshots__/**",
        "**/types/**",
        "**/*.d.ts",
      ],
    },
    pool: "threads",
    css: {
      modules: {
        classNameStrategy: "non-scoped",
      },
    },
  },
});
