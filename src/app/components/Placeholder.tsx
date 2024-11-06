'use client'

import React, { useState } from 'react'
import PlaceholdersAndVanishInput from '@components/ui/placeholder'
import Image from 'next/image'
import { insertBook, fetchBookByID } from '@actions/databaseActions'
import { fetchGutenbergContent, fetchGutenbergMetadata } from '../actions/fetchGutenberg'
import TextViewer from './TextViewer'

const PlaceholdersAndVanishInputDemo = () => {
  const placeholders = [
    'Enter a Project Gutenberg book ID',
  ]

  const [content, setContent] = useState<string | null>(null)
  const [metadata, setMetadata] = useState<{
    title: string;
    author: string;
    publicationDate: string;
    language: string;
    coverImage: string | undefined;
  } | null>(null)
  const [bookID, setBookID] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

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
      // First, check if the book exists in the database
      try {
        const bookFromDB = await fetchBookByID(parsedBookID)
        if (bookFromDB) {
        // If the book is found in the database, set the content and metadata
          setContent(bookFromDB.content)
          setMetadata({
            title: bookFromDB.title,
            author: bookFromDB.author,
            publicationDate: bookFromDB.publicationDate,
            language: bookFromDB.language,
            coverImageURL: bookFromDB.coverImageURL || null,
          })
          setErrorMessage('Book already exists in the database.')
        }
      } catch (err) {
        // If the book is not found in the database, fetch it from Project Gutenberg
        const posts = await fetchGutenbergContent(parsedBookID)
        const fetchedMetadata = await fetchGutenbergMetadata(parsedBookID)

        // Save the fetched book to the database
        await insertBook({
          bookID: parsedBookID,
          title: fetchedMetadata.title,
          author: fetchedMetadata.author,
          publicationDate: fetchedMetadata.publicationDate,
          language: fetchedMetadata.language,
          coverImageURL: fetchedMetadata.coverImage || null,
          content: posts,
        })

        // Set the content and metadata after saving
        setContent(posts)
        setMetadata({
          title: fetchedMetadata.title,
          author: fetchedMetadata.author,
          publicationDate: fetchedMetadata.publicationDate,
          language: fetchedMetadata.language,
          coverImageURL: fetchedMetadata.coverImage || null,
        })

        console.log('Fetched book from Project Gutenberg:', fetchedMetadata)
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('Not Found')) {
        setErrorMessage('No valid book ID found for that number. Please try another ID.')
      } else if (error instanceof Error) {
        setErrorMessage(`An error occurred while fetching the content: ${error.message}`)
      } else {
        setErrorMessage('An unknown error occurred while fetching the content')
      }
    }
  }

  return (
    <div className="mt-10 flex flex-col justify-center items-center px-4">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
      {errorMessage && (
        <p className="text-red-500 mt-2">{errorMessage}</p>
      )}
      {metadata && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">{metadata.title}</h2>
          <p>
            <strong>Author:</strong>
            {' '}
            {metadata.author}
          </p>
          <p>
            <strong>Publication Date:</strong>
            {' '}
            {metadata.publicationDate}
          </p>
          <p>
            <strong>Language:</strong>
            {' '}
            {metadata.language}
          </p>
          {metadata.coverImage && (
            <Image
              src={metadata.coverImage}
              alt={`${metadata.title} cover`}
              className="mt-2"
              width={500}
              height={750}
            />
          )}
        </div>
      )}
      {content && (
        <div className="mt-4 w-full">
          <h3 className="text-md font-semibold">Content:</h3>
          <TextViewer content={content} />
        </div>
      )}
    </div>
  )
}

export default PlaceholdersAndVanishInputDemo
