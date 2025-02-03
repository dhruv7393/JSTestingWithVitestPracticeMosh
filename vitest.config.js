import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    clearMocks: true, // All mocks are cleared before each test
  },
});
