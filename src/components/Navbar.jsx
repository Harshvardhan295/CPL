import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="navbarHeader text-white bg-black h-[60px] flex justify-between items-center px-6 sticky top-0 z-50">
      <div className="navbarheadtext text-[2em]">
        <Link to="/">
          <span className="hidden sm:inline">CAMPUS PREMIER LEAGUE</span>
          <span className="sm:hidden">CPL</span>
        </Link>
      </div>
      <div className="hidden md:flex space-x-8 items-center text-[1.1em]">
        <Link to="/" className="hover:text-gray-400">Home</Link>
        <Link to="/auction" className="hover:text-gray-400">Auction</Link>
        <Link to="/about" className="hover:text-gray-400">About</Link>
        <Link to="/rules" className="hover:text-gray-400">Rules</Link>
        <Link to="/contact" className="hover:text-gray-400">Contact</Link>
      </div>
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-[60px] left-0 w-full bg-black flex flex-col items-center md:hidden">
          <Link to="/" className="py-2 hover:text-gray-400" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/auction" className="py-2 hover:text-gray-400" onClick={() => setIsOpen(false)}>Auction</Link>
          <Link to="/rules" className="py-2 hover:text-gray-400" onClick={() => setIsOpen(false)}>Rules</Link>
          <Link to="/about" className="py-2 hover:text-gray-400" onClick={() => setIsOpen(false)}>About Us</Link>
        </div>
      )}
    </div>
  )
}

export default Navbar;