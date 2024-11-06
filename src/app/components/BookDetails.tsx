'use client'

import React from 'react'
import Image from 'next/image'
import TextViewer from './TextViewer'

interface BookDetailsProps {
  metadata: {
    title: string;
    author: string;
    publicationDate: string;
    language: string;
    coverImageURL: string | null;
  } | null;
  content: string | null;
  setChunkContent: (content: string | null) => void;
}

const BookDetails: React.FC<BookDetailsProps> = ({ metadata, content, setChunkContent }) => (
  <div>
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
        {metadata.coverImageURL && (
          <Image
            src={metadata.coverImageURL}
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
        <TextViewer
          content={content}
          setChunkContent={setChunkContent}
          maxTokenLimit={30000}
        />
      </div>
    )}
  </div>
)

export default BookDetails
