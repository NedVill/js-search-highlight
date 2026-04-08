import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx, js, jsx}"],
    rules: {
      "no-console": "warn",
      "custom/class-names-import-checker": "error",
      "custom/name-required-for-data-testid": "error",
      "custom/if-statement-deep-checker": "error",
      "custom/if-else-statement-early-exit": "error",
      "custom/only-props-type": ["error"],
      "custom/multiline-var-spacing": ["error"],
    },
  },
  {
    ignores: [
      "**/dist",
      "**/public",
      "**/static",
      "**/.*",
      "**/*.config.js",
      "node_modules",
      "tmp",
      "build",
      "coverage",
    ],
  },
];
