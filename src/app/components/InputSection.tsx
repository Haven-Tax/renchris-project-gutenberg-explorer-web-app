'use client'

import React from 'react'
import PlaceholdersAndVanishInput from '@components/ui/placeholder'

interface InputSectionProps {
  placeholders: string[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  errorMessage: string | null;
}

const InputSection: React.FC<InputSectionProps> = ({
  placeholders,
  handleChange,
  onSubmit,
  errorMessage,
}) => (
  <div className="w-full">
    <PlaceholdersAndVanishInput
      placeholders={placeholders}
      onChange={handleChange}
      onSubmit={onSubmit}
      disabled={false}
    />
    {errorMessage && (
      <p className="text-red-500 justify-self-center mt-2">{errorMessage}</p>
    )}
  </div>
)

export default InputSection
