import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    plugins: { boundaries },
    rules: {
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            // Разрешаем импорты внутри одного слоя
            { from: "features", to: "features" },
            // Запрещаем импорты "снизу вверх"
            // (например, чтобы features не импортировали из widgets/pages)
            { from: "features", disallow: ["widgets", "pages"] },
          ],
        },
      ],
    },
    settings: {
      "boundaries/elements": [
        { type: "features", pattern: "src/features/*" },
        { type: "widgets", pattern: "src/widgets/*" },
        { type: "pages", pattern: "src/pages/*" },
      ],
    },
  },
]);

export default eslintConfig;
