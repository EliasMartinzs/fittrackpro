import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";
import type { Config } from "drizzle-kit";

config({ path: "./env.local" });

export default defineConfig({
  schema: "./db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
}) satisfies Config;
