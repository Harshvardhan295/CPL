import React from 'react';
import { Link } from 'react-router-dom';
// import './Navbar.css'; // Removed this line to resolve the path error

const Navbar = () => {
  return (
    <div className="navbarHeader text-white bg-black h-[60px] flex justify-between items-center px-6 sticky top-0 z-50">
        {/* The custom font class 'navbarheadtext' was removed to fix the CSS import issue. */}
        {/* You can apply a font using Tailwind classes if needed, e.g., 'font-serif' */}
        <div className="text-[2em] font-bold tracking-wider">
            <Link to="/">CAMPUS PREMIER LEAGUE</Link>
        </div>
        <ul className="flex space-x-8 items-center text-[1.1em]">
            <li><Link to="/" className="hover:text-gray-400">Home</Link></li>
            <li><Link to="/auction" className="hover:text-gray-400">Auction</Link></li>
            <li><Link to="/rules" className="hover:text-gray-400">Rules</Link></li>
            <li><Link to="/match-schedule" className="hover:text-gray-400">Match Schedule</Link></li>
            <li><Link to="/about-us" className="hover:text-gray-400">About Us</Link></li>
        </ul>
    </div>
  )
}

export default Navbar;
