import type { Config } from 'drizzle-kit'

export default {
  schema: './drizzle/schema.ts',
  out: './drizzle/migrations',
  dialect: 'sqlite',
  driver: 'turso',
  dbCredentials: {
    url: process.env.NODE_ENV === 'production'
      ? process.env.TURSO_MAIN_DATABASE_URL || 'Turso Database URL was not found'
      : 'file:sqlite.db',
    authToken: process.env.NODE_ENV === 'production'
      ? process.env.TURSO_AUTH_TOKEN || 'Turso Auth Token was not found'
      : undefined,
  },
} satisfies Config
