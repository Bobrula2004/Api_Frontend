// pages/BookDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookService } from '../services/bookService';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      const response = await bookService.getBook(id);
      setBook(response.data);
    } catch (err) {
      setError('Failed to load book details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await bookService.deleteBook(id);
        navigate('/books');
      } catch (err) {
        setError('Failed to delete book');
        console.error(err);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading book details...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 text-red-700 p-4 rounded">
          {error}
          <button 
            onClick={() => navigate('/books')}
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Вернуться к книгам
          </button>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 text-yellow-700 p-4 rounded">
          Книга не найдена
          <button 
            onClick={() => navigate('/books')}
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
              Вернуться к книгам
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.title}</h1>
              <p className="text-gray-600 text-lg mb-4">by {book.author?.name || 'Неизвестный автор'}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => navigate(`/books/edit/${book.id}`)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Изменить
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Удалить
              </button>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4 text-gray-700">
            <div>
              <p><span className="font-medium">Жанр:</span> {book.genre?.name || 'N/A'}</p>
              <p><span className="font-medium">Год публикации:</span> {book.publication_year || 'N/A'}</p>
              <p><span className="font-medium">Страниццы:</span> {book.page_count || 'N/A'}</p>
              <p><span className="font-medium">ISBN:</span> {book.isbn || 'N/A'}</p>
            </div>
            <div>
              <p><span className="font-medium">Создана:</span> {new Date(book.created_at).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Описание</h2>
            <p className="text-gray-600">
              {book.description || 'Описание не доступно'}
            </p>
          </div>
          
          <div className="mt-6">
            <button
              onClick={() => navigate('/books')}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
                Вернуться к книгам
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;