import React from 'react'
import './Navbar.css'
const Navbar = () => {
  return (
    <div className="navbarHeader text-white bg-black h-[60px] flex justify-between items-center px-6">
        <div className="navbarheadtext text-[2em]">
            CAMPUS PREMIER LEAGUE
        </div>
        <ul className="flex space-x-6 items-center text-[1.2em]">
            <li><a href="#" className="hover:text-gray-400">Home</a></li>
            <li><a href="#" className="hover:text-gray-400">About</a></li>
            <li><a href="#" className="hover:text-gray-400">Registration</a></li>
            <li><a href="#" className="hover:text-gray-400">Contact</a></li>
            <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-0 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Log in</button>
        </ul>
    </div>
  )
}

export default Navbar