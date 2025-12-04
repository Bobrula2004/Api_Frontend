// components/BookCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить книгу?')) {
      onDelete(book.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{book.title}</h3>
        <p className="text-gray-600 mb-1"><span className="font-medium">Автор:</span> {book.author?.name || 'N/A'}</p>
        <p className="text-gray-600 mb-1"><span className="font-medium">Жанр:</span> {book.genre?.name || 'N/A'}</p>
        <p className="text-gray-600 mb-1"><span className="font-medium">Год:</span> {book.publication_year || 'N/A'}</p>
        <p className="text-gray-600 mb-2"><span className="font-medium">Страницы:</span> {book.page_count || 'N/A'}</p>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{book.description || 'No description available'}</p>
        <div className="flex justify-between items-center">
          <Link 
            to={`/books/${book.id}`} 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Подробнее
          </Link>
          <div className="space-x-2">
            <Link 
              to={`/books/edit/${book.id}`} 
              className="text-green-600 hover:text-green-800 font-medium"
            >
              Изменить
            </Link>
            <button 
              onClick={handleDelete}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;