import React from 'react';
import '../css/Navbar.css'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='brand'>
            <Link to="/">Movie App</Link>
        </div>
        <div className='navbar-links'>
            <Link to="/" className='nav-link'>Home</Link>
            <Link to="/favorites" className='nav-link'>Favorites</Link>
        </div>
    </div>
  )
}

export default Navbar