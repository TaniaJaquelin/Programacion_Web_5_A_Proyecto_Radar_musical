import dotenv from "dotenv";
import { defineConfig } from "vitest/config";

dotenv.config({ path: ".env.test" });

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    testTimeout: 15000,
    coverage: {
      clean: false,
      reporter: ["text", "html", "json"],
      reportsDirectory: "./coverage",
      reportOnFailure: true,
    },
  },
});