import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../config/Axios'
import { UserContext } from '../context/user.context'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate()

  function SubmitHandler(e) {
    e.preventDefault();
    axios.post('/users/signup',{ 
      name, 
      email, 
      password 
    }).then(res => {
      console.log(res.data)
      localStorage.setItem('token', res.data.token)
      setUser(res.data.user)
      navigate('/')
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4 md:p-8">
      <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-xl md:text-2xl font-bold mb-6 text-center">Signup</h1>
        <form onSubmit={SubmitHandler}>
        <div className="mb-4">
            <label className="block mb-2">Name:</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email:</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2">Password:</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            onClick={SubmitHandler}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Signup
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup