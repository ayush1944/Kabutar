import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/user.context'

function Home() {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">Kabutar</div>
          <div className="space-x-2">
            <Link to="/" className="px-2 py-1 md:px-3 md:py-2 rounded hover:bg-gray-700">Home</Link>
            <Link to="/about" className="px-2 py-1 md:px-3 md:py-2 rounded hover:bg-gray-700">About</Link>
            <Link to="/contact" className="px-2 py-1 md:px-3 md:py-2 rounded hover:bg-gray-700">Contact</Link>
            {user ? (
              <>
              <Link to="/profile" className="px-2 py-1 md:px-3 md:py-2 rounded hover:bg-gray-700">Profile</Link>
              <button onClick={() => { localStorage.removeItem('user'); window.location.reload(); }} className="px-2 py-1 md:px-3 md:py-2 rounded hover:bg-gray-700">Logout</button>
              </>
) : (
              <>
                <Link to="/login" className="px-2 py-1 md:px-3 md:py-2 rounded hover:bg-gray-700">Login</Link>
                <Link to="/signup" className="px-2 py-1 md:px-3 md:py-2 rounded hover:bg-gray-700">Signup</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <>
        <div className='container mx-auto p-4'>
          <h1 className="text-4xl font-bold">Kabutar</h1>
          <p>Welcome to Kabutar, a platform where you can connect with like-minded individuals and share your thoughts, experiences, and ideas.</p>
          {user ? <h1>Welcome, {user.name}</h1> : <h1>Please log in.</h1>}
        </div>
      </>
    </div>
  )
}

export default Home