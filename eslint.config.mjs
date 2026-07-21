import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // GSAP must be imported and its plugins registered in exactly one place:
  // src/lib/gsap.ts. Everywhere else imports the re-exported, plugin-ready gsap.
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/lib/gsap.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "gsap",
              message: "Import gsap from '@/lib/gsap' instead — plugins are registered there.",
            },
            {
              name: "@gsap/react",
              message: "Import useGSAP from '@/lib/gsap' instead.",
            },
          ],
          patterns: [
            {
              group: ["gsap/*"],
              message: "Import GSAP plugins from '@/lib/gsap' instead — they are registered there.",
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
