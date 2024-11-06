'use server'

import { createClient, type Client } from '@libsql/client'
import { drizzle, type LibSQLDatabase } from 'drizzle-orm/libsql'
import * as schema from './schema'

const getDB = async (): Promise<LibSQLDatabase<typeof schema>> => {
  let url: string
  let authToken: string | undefined
  let turso: Client

  if (process.env.secrets) {
    const secretObject = JSON.parse(process.env.secrets)
    url = secretObject.TURSO_MAIN_DATABASE_URL
    authToken = secretObject.TURSO_AUTH_TOKEN
  } else if (process.env.NODE_ENV === 'production') {
    url = process.env.TURSO_MAIN_DATABASE_URL || ''
    authToken = process.env.TURSO_AUTH_TOKEN || ''
  } else {
    url = 'file:sqlite.db'
    authToken = undefined
  }

  try {
    turso = createClient({ url, authToken })
  } catch (err) {
    const createClientError = err as Error
    throw new Error(`Failed to create Turso client: ${createClientError.message}`)
  }

  const db: LibSQLDatabase<typeof schema> = drizzle(turso, { schema })

  return db
}

export default getDB
