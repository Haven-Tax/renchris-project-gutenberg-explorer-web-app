'use server'

import { eq } from 'drizzle-orm'
import { books } from '@drizzle/schema'
import getDB from '@drizzle/db'

export const insertBook = async (bookData: {
  bookID: number;
  title: string;
  author: string;
  publicationDate: string;
  language: string;
  coverImageURL: string | null;
  content: string;
}) => {
  const db = await getDB()

  try {
    const existingBook = await db
      .select()
      .from(books)
      .where(eq(books.bookID, bookData.bookID))
      .get()

    if (existingBook) {
      throw new Error(`Book with ID ${bookData.bookID} already exists.`)
    }

    const insertedBook = await db
      .insert(books)
      .values(bookData)
      .returning()
      .prepare()
      .get()

    console.log('Book inserted successfully:', insertedBook)
    return insertedBook
  } catch (error) {
    const insertError = error as Error
    console.error('Error inserting book:', insertError.message)
    throw new Error(`Failed to insert book into the database: ${insertError.message}`)
  }
}

export const fetchBookByID = async (bookID: number) => {
  const db = await getDB()

  try {
    const book = await db
      .select()
      .from(books)
      .where(eq(books.bookID, bookID))
      .prepare()
      .get()

    if (!book) {
      return book
    }

    console.log('Fetched book:', book)
    return book
  } catch (error) {
    const fetchError = error as Error
    console.error('Error fetching book:', fetchError.message)
    throw new Error('Failed to fetch book from the database.')
  }
}

export const fetchAllBooks = async () => {
  const db = await getDB()

  try {
    const booksList = await db
      .select()
      .from(books)
      .prepare()
      .all()

    console.log('Fetched all books:', booksList)
    return booksList
  } catch (error) {
    const fetchError = error as Error
    console.error('Error fetching all books:', fetchError.message)
    throw new Error('Failed to fetch books from the database.')
  }
}
