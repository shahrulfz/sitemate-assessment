/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // This allows using describe, test, expect, etc. without importing
    environment: "node", // Use the Node environment
  },
});
