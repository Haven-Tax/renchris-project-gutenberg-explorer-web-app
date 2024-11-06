import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const books = sqliteTable('books', {
  bookID: integer('book_id').primaryKey().notNull(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  publicationDate: text('publication_date').notNull(),
  language: text('language').notNull(),
  coverImageURL: text('cover_image_url'),
  content: text('content').notNull(),
})

export type Book = InferSelectModel<typeof books>
export type InsertBook = InferInsertModel<typeof books>
