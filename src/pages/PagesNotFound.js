import React from 'react'
import { useDocumentTitle } from '../library/customHooks'

export default function PagesNotFound() {
  useDocumentTitle('Not Found')
  return (
    <main className="container mx-auto text-center py-60">
      <h1 className="text-8xl font-bold text-sky-600"> 404 </h1>
      <h3 className="font-semibold text-gray-400"> Page Not Found </h3>
      <button href="/create-playlist">Back to Main Page</button>
    </main>
  )
}