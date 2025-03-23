import React, { useEffect, useState } from 'react'


function Header() {
  // Theme State
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  
  // Greeting State
  const [greeting, setGreeting] = useState('');

    // Set Greeting Based on Time
      useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');
      }, []);

        // Handle Logout
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
        localStorage.removeItem('user');
        setUser(null);  // Remove user from context
        navigate('/login'); // Redirect to login after logout
    }
};
  // Redirect to Login if not logged in
  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);
  // Handle Theme Toggle
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
    
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
    {/* Navbar */}
        <nav className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} p-4 shadow-md`}>
            <div className="container mx-auto flex justify-between items-center">
                <Link to={'/'} className="text-3xl font-bold flex items-center">
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

                {/* Theme Toggle Button */}
                <button 
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
                    className="px-3 py-2 rounded transition bg-blue-500 hover:bg-blue-700 text-white">
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Header