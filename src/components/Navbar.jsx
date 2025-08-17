import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbarHeader text-white bg-black h-[60px] flex justify-between items-center px-6 sticky top-0 z-50">
        <div className="navbarheadtext text-[2em]">
            <Link to="/">CAMPUS PREMIER LEAGUE</Link>
        </div>
        <ul className="flex space-x-8 items-center text-[1.1em]">
            <li><Link to="/" className="hover:text-gray-400">Home</Link></li>
            <li><Link to="/auction" className="hover:text-gray-400">Auction</Link></li>
            <li><Link to="/about" className="hover:text-gray-400">About</Link></li>
            <li><Link to="/rules" className="hover:text-gray-400">Rules</Link></li>
            <li><Link to="/contact" className="hover:text-gray-400">Contact</Link></li>
        </ul>
    </div>
  )
}

export default Navbar;
