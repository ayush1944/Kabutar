import React from 'react'
import { Route, Routes, BrowserRouter} from 'react-router-dom'
import Login from '../Pages/Login';
import Home from '../Pages/Home';
import Signup from '../Pages/Signup';
import About from '../Pages/About';
import Contact from '../Pages/Contact';
import Profile from '../Pages/Profile';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;