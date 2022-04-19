import React from 'react'
import { useDocumentTitle } from '../library/customHooks'

export default function PagesNotFound() {
  useDocumentTitle('Not Found')
  return (
    <main className="center">
      Pages Not Found
      <button href="/create-playlist">Back to Main Page</button>
    </main>
  )
}