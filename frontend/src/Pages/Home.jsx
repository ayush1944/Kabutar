import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user.context';
import axios from '../config/axios';
import { PiBird } from 'react-icons/pi';

function Home() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // Theme State
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  
  // Greeting State
  const [greeting, setGreeting] = useState('');

  // Project States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projects, setProjects] = useState([]);

  // Handle Theme Toggle
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Set Greeting Based on Time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  // Fetch Projects
  useEffect(() => {
    axios
      .get('/projects/all')
      .then((res) => setProjects(res.data.projects))
      .catch((err) => console.log(err));
  }, []);

  // Create New Project
  function createProject(e) {
    e.preventDefault()
    console.log({ projectName })

    axios.post('/projects/create', {
        name: projectName,
    })
        .then((res) => {
            console.log(res)
            setIsModalOpen(false)
        })
        .catch((error) => {
            console.log(error)
        })
}
  // Handle Logout
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('user');
      window.location.reload();
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Navbar */}
      <nav className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} p-4 shadow-md`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-3xl font-bold flex items-center">
            <PiBird className="text-4xl mr-2" />
            Kabutar
          </div>
          <div className="space-x-2 flex items-center">
            <Link to="/" className="px-3 py-2 rounded transition hover:bg-gray-700">Home</Link>
            <Link to="/about" className="px-3 py-2 rounded transition hover:bg-gray-700">About</Link>
            <Link to="/contact" className="px-3 py-2 rounded transition hover:bg-gray-700">Contact</Link>

            {user ? (
              <>
                <Link to="/profile" className="px-3 py-2 rounded transition hover:bg-gray-700">Profile</Link>
                <button onClick={handleLogout} className="px-3 py-2 rounded transition bg-red-500 hover:bg-red-700">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-2 rounded transition hover:bg-gray-700">Login</Link>
                <Link to="/signup" className="px-3 py-2 rounded transition hover:bg-gray-700">Signup</Link>
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

      <div className='flex '>
      {/* Project Section */}
      <main className="p-4 home-container border-r-2 w-80">
        <div className="projects flex flex-wrap gap-3">
        <button
                    onClick={() => setIsModalOpen(true)}
                    className="project p-4 border border-slate-300 rounded-md">
                    New Project
                    <i className="ri-link ml-2"></i>
                </button>

          {projects.map((project) => (
            <div key={project._id}
              onClick={() => navigate(`/project`, { state: { project } })}
              className="project flex flex-col gap-2 cursor-pointer p-4 border border-slate-300 rounded-md min-w-52 hover:bg-slate-200">
              <h2 className="font-semibold">{project.name}</h2>
              <div className="flex gap-2">
                <p><small><i className="ri-user-line"></i> Collaborators:</small></p>
                {project.users.length}
              </div>
            </div>
          ))}
        </div>

        {/* Project Creation Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md w-1/3">
              <h2 className="text-xl text-gray-600 mb-4">Create New Project</h2>
              <form onSubmit={createProject}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Project Name</label>
                  <input
                    onChange={(e) => setProjectName(e.target.value)}
                    value={projectName}
                    type="text"
                    className="mt-1 block w-full p-2 border text-gray-700 border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button type="button" className="mr-2 px-4 py-2 bg-gray-300 rounded-md" onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md" >Create</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

    {/* Main Content */}
      <div className="container h-[91vh] w-full main-container p-4  ">
        <h2 className="top-5 text-4xl font-semibold">{greeting}{user ? `, ${user.name}!` : '!'}</h2>
        <h1 className="text-6xl mt-16 font-bold ml-8">Kabutar</h1>
        <p className="mt-4 text-xl ml-8">A platform to connect, share thoughts, and interact with like-minded individuals.</p>
      </div>

      </div>
    </div>
  );
}

export default Home;
