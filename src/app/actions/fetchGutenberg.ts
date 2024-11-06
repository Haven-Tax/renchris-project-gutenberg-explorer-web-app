'use server'

import * as cheerio from 'cheerio'

// eslint-disable-next-line import/prefer-default-export
export const fetchGutenbergContent = async (bookID: number) => {
  const content = await fetch(`https://www.gutenberg.org/files/${bookID}/${bookID}-0.txt`)

  if (!content.ok) {
    throw new Error(`Failed to fetch content: ${content.statusText}`)
  }

  return content.text()
}

export const fetchGutenbergMetadata = async (bookID: number) => {
  const metadataResponse = await fetch(`https://www.gutenberg.org/ebooks/${bookID}`)

  if (!metadataResponse.ok) {
    throw new Error(`Failed to fetch metadata: ${metadataResponse.statusText}`)
  }

  const metadataHtml = await metadataResponse.text()
  const $ = cheerio.load(metadataHtml)

  const title = $('h1[itemprop="name"]').text().trim()
  const author = $('a[itemprop="creator"]').text().trim()
  const publicationDate = $('tr:contains("Release Date") td[itemprop="datePublished"]').text().trim()
  const language = $('tr:contains("Language") td').text().trim()
  const coverImage = $('img.cover-art').attr('src')

  return {
    title,
    author,
    publicationDate,
    language,
    coverImage,
  }
}
