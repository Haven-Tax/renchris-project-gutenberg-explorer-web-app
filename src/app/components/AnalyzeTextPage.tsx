'use client'

import React from 'react'
import PlaceholdersAndVanishInput from '@components/ui/placeholder'

interface AnalyzeTextPageProps {
  questionInput: string;
  setQuestionInput: (value: string) => void;
  handleAnalyzeText: (question: string) => void;
  isCooldown: boolean;
  countdown: number;
  analyzeError: string | null;
  qaHistory: { question: string; answer: string }[];
}

const AnalyzeTextPage: React.FC<AnalyzeTextPageProps> = ({
  questionInput,
  setQuestionInput,
  handleAnalyzeText,
  isCooldown,
  countdown,
  analyzeError,
  qaHistory,
}) => (
  <div className="w-full">
    <div className="mt-10 w-full text-center">
      <h2 className="text-xl mb-4 font-bold">Analyze Text Page</h2>
      <PlaceholdersAndVanishInput
        placeholders={['Ask a question about the text...', 'Ask for a page summary', 'Ask about the sentiment of the writing']}
        onChange={(e) => setQuestionInput(e.target.value)}
        onSubmit={(e) => {
          e.preventDefault()
          handleAnalyzeText(questionInput)
        }}
        disabled={isCooldown}
      />
      {isCooldown && (
        <p className="text-red-500 mt-2">
          Please wait
          {' '}
          {countdown}
          {' '}
          seconds before asking another question.
        </p>
      )}
      {analyzeError && (
        <p className="text-red-500 mt-2">{analyzeError}</p>
      )}
    </div>
    <div className="mt-6 w-full">
      {qaHistory.map((qa, index) => (
        <div key={`${qa.question}-${qa.answer}`} className="border p-4 my-2 rounded-lg shadow-md">
          <p className="font-semibold">Question:</p>
          <p>{qa.question}</p>
          <p className="font-semibold mt-2">Answer:</p>
          <p>{qa.answer}</p>
        </div>
      ))}
    </div>
  </div>
)

export default AnalyzeTextPage
