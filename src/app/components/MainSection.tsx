'use client'

import React, { useState, useEffect } from 'react'
import { insertBook, fetchBookByID, fetchAllBooks } from '@actions/databaseActions'
import { analyzeTextWithGroq } from '@actions/askGroq'
import { fetchGutenbergContent, fetchGutenbergMetadata } from '../actions/fetchGutenberg'
import BooksGrid from './BooksGrid'
import AnalyzeTextPage from './AnalyzeTextPage'
import BookDetails from './BookDetails'
import InputSection from './InputSection'

const MainSection = () => {
  const placeholders = [
    'Enter a Project Gutenberg book ID',
  ]

  const [content, setContent] = useState<string | null>(null)
  const [chunkContent, setChunkContent] = useState<string | null>(null)
  const [metadata, setMetadata] = useState<{
    title: string;
    author: string;
    publicationDate: string;
    language: string;
    coverImageURL: string | null;
  } | null>(null)
  const [bookID, setBookID] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [qaHistory, setQaHistory] = useState<{ question: string; answer: string }[]>([])
  const [questionInput, setQuestionInput] = useState<string>('')
  const [isCooldown, setIsCooldown] = useState<boolean>(false)
  const [analyzeError, setAnalyzeError] = useState<string | null>(null)
  const [countdown, setCountdown] = useState<number>(60)
  const [books, setBooks] = useState<{ id: number; title: string }[]>([])

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const existingBooks = await fetchAllBooks()
        const formattedBooks = existingBooks.map((book) => ({
          id: book.bookID,
          title: book.title,
        }))
        setBooks(formattedBooks)
      } catch (error) {
        console.error('Error fetching books:', error)
      }
    }

    fetchBooks()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookID(e.target.value)
    setErrorMessage(null)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const parsedBookID = parseInt(bookID, 10)

    if (Number.isNaN(parsedBookID) || parsedBookID <= 0) {
      setErrorMessage('Invalid book ID. Please enter a valid number.')
      return
    }

    try {
      const bookFromDB = await fetchBookByID(parsedBookID)
      if (bookFromDB) {
        setContent(bookFromDB.content)
        setMetadata({
          title: bookFromDB.title,
          author: bookFromDB.author,
          publicationDate: bookFromDB.publicationDate,
          language: bookFromDB.language,
          coverImageURL: bookFromDB.coverImageURL || null,
        })
        setErrorMessage('Book already exists in and is retrieved from the database.')
        return
      }
      let posts
      try {
        posts = await fetchGutenbergContent(parsedBookID)
      } catch (error) {
        setErrorMessage('No valid book ID found for that number. Please try another ID.')
        return
      }
      const fetchedMetadata = await fetchGutenbergMetadata(parsedBookID)

      await insertBook({
        bookID: parsedBookID,
        title: fetchedMetadata.title,
        author: fetchedMetadata.author,
        publicationDate: fetchedMetadata.publicationDate,
        language: fetchedMetadata.language,
        coverImageURL: fetchedMetadata.coverImage || null,
        content: posts,
      })

      setContent(posts)
      setMetadata({
        title: fetchedMetadata.title,
        author: fetchedMetadata.author,
        publicationDate: fetchedMetadata.publicationDate,
        language: fetchedMetadata.language,
        coverImageURL: fetchedMetadata.coverImage || null,
      })

      console.log('Fetched book from Project Gutenberg:', fetchedMetadata)
    } catch (error) {
      if (error instanceof Error) {
        console.log('--errorr')
        console.log(error)
        console.log('--')
        if (error.message.includes('Not Found')) {
          setErrorMessage('No valid book ID found for that number. Please try another ID.')
        } else {
          setErrorMessage(`An error occurred while fetching the content: ${error.message}`)
        }
      } else {
        setErrorMessage('An unknown error occurred while fetching the content')
      }
    }
  }

  const handleAnalyzeText = async (question: string) => {
    if (isCooldown) return

    let answer: string
    try {
      answer = await analyzeTextWithGroq(question, chunkContent || '') || ''
      setQaHistory((prev) => [...prev, { question, answer: answer || 'No answer available' }])
      setIsCooldown(true)
      setAnalyzeError(null)
      setCountdown(60)

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            setIsCooldown(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (error) {
      const groqError = error as Error
      console.error('Error calling Groq API:', groqError.message)
      setAnalyzeError('An error occurred while analyzing the text. Please try again later.')
    }
  }

  const handleBookClick = async (buttonBookID: number) => {
    try {
      const bookFromDB = await fetchBookByID(buttonBookID)
      if (bookFromDB) {
        setContent(bookFromDB.content)
        setMetadata({
          title: bookFromDB.title,
          author: bookFromDB.author,
          publicationDate: bookFromDB.publicationDate,
          language: bookFromDB.language,
          coverImageURL: bookFromDB.coverImageURL || null,
        })
      }
    } catch (error) {
      console.error('Error fetching book details:', error)
      setErrorMessage('An error occurred while fetching the book details. Please try again later.')
    }
  }

  return (
    <div className="mt-10 flex flex-col justify-center items-center px-4">
      <InputSection
        placeholders={placeholders}
        handleChange={handleChange}
        onSubmit={onSubmit}
        errorMessage={errorMessage}
      />
      <BookDetails
        metadata={metadata}
        content={content}
        setChunkContent={setChunkContent}
      />
      {content && (
      <AnalyzeTextPage
        questionInput={questionInput}
        setQuestionInput={setQuestionInput}
        handleAnalyzeText={handleAnalyzeText}
        isCooldown={isCooldown}
        countdown={countdown}
        analyzeError={analyzeError}
        qaHistory={qaHistory}
      />
      )}
      <BooksGrid books={books} onBookClick={handleBookClick} />
    </div>
  )
}

export default MainSection
