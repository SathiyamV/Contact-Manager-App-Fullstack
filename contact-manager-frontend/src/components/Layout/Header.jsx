import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-white text-xl font-bold flex items-center">
              <svg className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Contact Manager
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/home" className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md">Home</Link>
            <Link to="/contacts" className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md">Contacts</Link>
            <Link to="/profile" className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md">Profile</Link>
            <button className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600">Logout</button>
          </div>

          {/* Hamburger Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-indigo-700 p-2 rounded-md focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-indigo-600">
          <Link
            to="/home"
            className="text-white block px-3 py-2 rounded-md hover:bg-indigo-700"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/contacts"
            className="text-white block px-3 py-2 rounded-md hover:bg-indigo-700"
            onClick={() => setIsOpen(false)}
          >
            Contacts
          </Link>
          <Link
            to="/profile"
            className="text-white block px-3 py-2 rounded-md hover:bg-indigo-700"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
          <button
            className="text-white block w-full text-left px-3 py-2 rounded-md hover:bg-red-600"
            onClick={() => {
              setIsOpen(false);
              // Add logout logic here
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;