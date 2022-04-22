import React from 'react'
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../../library/customHooks'

const NotFound: React.FC = () => {
  useDocumentTitle('Page Not Found');
  return (
    <main className="container mx-auto text-center py-60">
      <h1 className="text-8xl font-bold text-sky-600"> 404 </h1>
      <h3 className="font-semibold text-gray-400"> Page Not Found </h3>
      <Link to="/create-playlist"><button>Back to Main Page</button></Link>
    </main>
  )
}

export default NotFound;