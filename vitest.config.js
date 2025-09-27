import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,        // ✅ ativa describe, it, expect, afterAll etc.
    environment: 'node',  // ✅ garante que não vai tentar usar DOM
  },
})