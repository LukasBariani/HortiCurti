import { defineConfig } from "prisma/config";
import { config } from "dotenv";

config(); // carrega o .env antes de tudo

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});