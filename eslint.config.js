import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], languageOptions: { globals: globals.browser },
rules: {
      // 🚨 Regra principal para forçar a omissão de ponto e vírgula (Estilo)
      "@typescript-eslint/semi": ["error", "never"],
      
      // Remove a regra base do ESLint que conflita com a regra do TypeScript-ESLint
      "semi": "off",

      // Boas Práticas (Exemplos)
      // Força o uso de 'interface' em vez de 'type' para objetos (preferência comum em TS)
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      
      // Proíbe variáveis não utilizadas (ajuda a manter o código limpo e reutilizável)
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],

      // Garante o uso de types explícitos para funções (melhora a clareza e segurança)
      "@typescript-eslint/explicit-function-return-type": ["off", { 
        "allowExpressions": true 
      }], // Desligado se for muito restritivo, mas é uma boa prática
      
      // Outras boas práticas para um projeto Node/Next (ESM)
      "indent": ["error", 2, { "SwitchCase": 1 }], // Indentação com 2 espaços
      "quotes": ["error", "single", { "avoidEscape": true }], // Aspas simples
      "no-console": ["error", { "allow": ["warn", "error"] }], // Proíbe console.log em produção
    } },
  tseslint.configs.recommended,
]);
