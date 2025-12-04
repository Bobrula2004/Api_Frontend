// components/BookCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      onDelete(book.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{book.title}</h3>
        <p className="text-gray-600 mb-1"><span className="font-medium">Author:</span> {book.author?.name || 'N/A'}</p>
        <p className="text-gray-600 mb-1"><span className="font-medium">Genre:</span> {book.genre?.name || 'N/A'}</p>
        <p className="text-gray-600 mb-1"><span className="font-medium">Year:</span> {book.publication_year || 'N/A'}</p>
        <p className="text-gray-600 mb-2"><span className="font-medium">Pages:</span> {book.page_count || 'N/A'}</p>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{book.description || 'No description available'}</p>
        <div className="flex justify-between items-center">
          <Link 
            to={`/books/${book.id}`} 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View Details
          </Link>
          <div className="space-x-2">
            <Link 
              to={`/books/edit/${book.id}`} 
              className="text-green-600 hover:text-green-800 font-medium"
            >
              Edit
            </Link>
            <button 
              onClick={handleDelete}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;