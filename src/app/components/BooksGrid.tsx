'use client'

import React from 'react'

interface Book {
  id: number;
  title: string;
}

interface BooksGridProps {
  books: Book[];
  onBookClick: (id: number) => void;
}

const BooksGrid: React.FC<BooksGridProps> = ({ books, onBookClick }) => (
  <div className="my-10 w-full">
    <h2 className="text-xl font-bold">Existing Books</h2>
    <div className="grid grid-cols-2 gap-4 mt-4">
      {books.map((book) => (
        <button
          type="button"
          key={book.id}
          className="relative inline-flex h-12 overflow-hidden rounded-xl p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 relative inline-flex h-full w-full overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-200"
          onClick={() => onBookClick(book.id)}
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#A77BCA_50%,#E2CBFF_100%)]" />
          <span className="hover:animate-shimmer inline-flex h-12 items-center justify-center rounded-xl border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-gray-300 backdrop-blur-3xl flex flex-col">
            <span className="text-lg font-semibold">
              <span className="font-normal">
                ID:
                {' '}
              </span>
              {book.id}
            </span>
            <span className="text-base text-slate-300">{book.title}</span>
          </span>
        </button>
      ))}
    </div>
  </div>
)

export default BooksGrid
