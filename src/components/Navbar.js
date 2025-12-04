// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">Library Management</Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300">Books</Link>
          </li>
          <li>
            <Link to="/books/new" className="hover:text-gray-300">Add Book</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;