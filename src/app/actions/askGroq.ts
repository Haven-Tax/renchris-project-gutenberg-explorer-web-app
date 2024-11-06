'use server'

import Groq from 'groq-sdk'

const { GROQ_API_KEY } = process.env
const groq = new Groq({ apiKey: GROQ_API_KEY })

const conversationHistory: { role: string; content: string }[] = []

// eslint-disable-next-line import/prefer-default-export
export const analyzeTextWithGroq = async (question: string, bookContext: string) => {
  try {
    if (conversationHistory.length === 0 || conversationHistory[0].content !== bookContext) {
      conversationHistory.push({ role: 'system', content: bookContext })
    }

    conversationHistory.push({ role: 'user', content: question })

    const completion = await groq.chat.completions.create({
      messages: conversationHistory.map((msg) => ({
        ...msg,
        role: msg.role as 'user' | 'assistant' | 'system',
        name: 'default',
      })),
      model: 'llama3-8b-8192',
    })

    const responseMessage = completion.choices[0].message.content

    if (responseMessage) {
      conversationHistory.push({ role: 'assistant', content: responseMessage })
    }

    console.log(responseMessage)

    return responseMessage
  } catch (error) {
    console.error('Error calling Groq API:', error)
    throw new Error('Failed to analyze text with Groq.')
  }
}
