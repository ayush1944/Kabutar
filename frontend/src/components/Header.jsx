import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { PiBird } from 'react-icons/pi';
import { UserContext } from '../context/user.context';



function Header() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    // Redirect to Login if not logged in
    useEffect(() => {
      if (!user) navigate('/login');
    }, [user, navigate]);
  
    // Handle Logout
    const handleLogout = () => {
      if (window.confirm('Are you sure you want to log out?')) {
        localStorage.removeItem('user');
        setUser(null);  
        navigate('/login'); 
      }
    };
  return (
    <div >
            {/* Navbar */}
      <nav className="bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-3xl font-bold flex items-center">
            <PiBird className="text-3xl mr-2" />
            Kabutar
          </Link>
          <div className="space-x-2 flex items-center">
            <Link to="/" className="px-3 py-2 rounded transition hover:bg-gray-400">Home</Link>
            <Link to="/about" className="px-3 py-2 rounded transition hover:bg-gray-400">About</Link>
            <Link to="/contact" className="px-3 py-2 rounded transition hover:bg-gray-400">Contact</Link>

            {user ? (
              <>
                <Link to="/profile" className="px-3 py-2 rounded transition hover:bg-gray-400">Profile</Link>
                <button onClick={handleLogout} className="px-3 py-2 rounded transition bg-red-500 hover:bg-red-700">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-2 rounded transition hover:bg-gray-400">Login</Link>
                <Link to="/signup" className="px-3 py-2 rounded transition hover:bg-gray-400">Signup</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
