import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user.context';
import axios from '../config/Axios';
import { PiBird } from 'react-icons/pi';
import { CiLink } from "react-icons/ci";

function Home() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Greeting State
  const [greeting, setGreeting] = useState('');

  // Project States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projects, setProjects] = useState([]);

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

  // Set Greeting Based on Time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  // Fetch Projects Function
  const fetchProjects = () => {
    axios.get('/projects/all')
      .then((res) => setProjects(res.data.projects))
      .catch((err) => console.log("Error fetching projects:", err));
  };

  // Fetch Projects when the component mounts
  useEffect(() => {
    fetchProjects();
  }, []);

  // Create New Project
  function createProject(e) {
    e.preventDefault();
    axios.post('/projects/create', { name: projectName })
      .then(() => {
        fetchProjects(); 
        setIsModalOpen(false); 
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="min-h-screen bg-gray-900 text-slate-200">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 shadow-md">
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

      <div className="flex">
        {/* Project Section */}
        <main className="p-4 home-container border-r-2 w-80">
          <h2 className="text-2xl font-semibold">Projects</h2>
          <p className="text-gray-500">Create or join projects to collaborate with others.</p>
          <button 
            onClick={() => {
              if (!user) {
                navigate('/login'); 
              } else {
                setIsModalOpen(true);
              }
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-1"
          >
            New Project
            <div className="text-xl"><CiLink /></div>
          </button>
          <div className="mt-5 w-full projects flex flex-wrap gap-3">
            {projects.map((project) => (
              <div key={project._id}
                onClick={() => navigate(`/project`, { state: { project } })}
                className="project flex flex-col gap-2 cursor-pointer p-4 border border-slate-300 rounded-md min-w-52 hover:bg-slate-700"
              >
                <h2 className="font-semibold">{project.name}</h2>
                <div className="flex gap-2">
                  <p><small><i className="ri-user-line"></i> Collaborators</small>:</p>
                  {project.users.length}
                </div>
              </div>
            ))}
          </div>

          {/* Project Creation Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-md shadow-md w-1/3">
                <h2 className="text-xl text-gray-700 mb-4">Create New Project :</h2>
                <form onSubmit={createProject}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Project Name</label>
                    <input
                      onChange={(e) => setProjectName(e.target.value)}
                      value={projectName}
                      type="text"
                      className="mt-1 block w-full p-2 border border-gray-300 text-gray-700 rounded-md" 
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <button type="button" className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md" onClick={() => setIsModalOpen(false)}>Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Create</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>

        {/* Main Content */}
        <div className="container h-[91vh] w-full main-container p-4">
          <h2 className="top-5 text-4xl font-semibold">{greeting}{user ? `, ${user.name}!` : '!'}</h2>
          <h1 className="text-6xl mt-16 font-bold ml-8">Kabutar</h1>
          <p className="mt-4 text-xl ml-8">A platform to connect, share thoughts, and interact with like-minded individuals.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;