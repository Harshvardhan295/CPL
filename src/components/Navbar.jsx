import React from 'react'
import './Navbar.css'
const Navbar = () => {
  return (
    <div className="navbarHeader text-white bg-black h-[60px] flex justify-between items-center px-6">
        <div className="navbarheadtext text-[2em]">
            CAMPUS PREMIER LEAGUE
        </div>
        <ul className="flex space-x-8 items-center text-[1.1em]">
            <li><a href="#" className="hover:text-gray-400">Home</a></li>
            <li><a href="#" className="hover:text-gray-400">About</a></li>
            <li><a href="#" className="hover:text-gray-400">Registration</a></li>
            <li><a href="#" className="hover:text-gray-400">Contact</a></li>
        </ul>
    </div>
  )
}

export default Navbar