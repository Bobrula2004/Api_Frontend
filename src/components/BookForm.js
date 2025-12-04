// components/BookForm.js
import React, { useState, useEffect } from 'react';
import { bookService, authorService, genreService } from '../services/bookService';

const BookForm = ({ bookId, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    isbn: '',
    publication_year: '',
    description: '',
    page_count: '',
    author_id: '',
    genre_id: ''
  });
  
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch authors and genres
    const fetchData = async () => {
      try {
        const [authorsRes, genresRes] = await Promise.all([
          authorService.getAuthors(),
          genreService.getGenres()
        ]);
        setAuthors(authorsRes.data);
        setGenres(genresRes.data);
      } catch (err) {
        setError('Failed to load authors and genres');
        console.error(err);
      }
    };

    fetchData();

    // If editing, fetch the book data
    if (bookId) {
      fetchBookData();
    }
  }, [bookId]);

  const fetchBookData = async () => {
    try {
      setLoading(true);
      const response = await bookService.getBook(bookId);
      setFormData(response.data);
    } catch (err) {
      setError('Failed to load book data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (bookId) {
        await bookService.updateBook(bookId, formData);
      } else {
        await bookService.createBook(formData);
      }
      onSubmit();
    } catch (err) {
      console.error('Ошибка сохранения книги:', err);
      setError(err.response?.data?.detail || 'An error occurred while saving the book');
    } finally {
      setLoading(false);
    }
  };

  if (loading && bookId) {
    return <div className="text-center py-10">Загрузка...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">
        {bookId ? 'Изменить книгу' : 'Добавить новую книгу'}
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Название *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Название книги"
            />
          </div>
          
          <div>
            <label htmlFor="isbn" className="block text-sm font-medium text-gray-700 mb-1">
              ISBN
            </label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="ISBN номер"
            />
          </div>
          
          <div>
            <label htmlFor="publication_year" className="block text-sm font-medium text-gray-700 mb-1">
              Год публикации
            </label>
            <input
              type="number"
              id="publication_year"
              name="publication_year"
              value={formData.publication_year}
              onChange={handleChange}
              min="1000"
              max="2100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Год издания"
            />
          </div>
          
          <div>
            <label htmlFor="page_count" className="block text-sm font-medium text-gray-700 mb-1">
              Количество страниц
            </label>
            <input
              type="number"
              id="page_count"
              name="page_count"
              value={formData.page_count}
              onChange={handleChange}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Количество страниц"
            />
          </div>
          
          <div>
            <label htmlFor="author_id" className="block text-sm font-medium text-gray-700 mb-1">
              Автор *
            </label>
            <select
              id="author_id"
              name="author_id"
              value={formData.author_id}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Выбрать автора</option>
              {authors.map(author => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="genre_id" className="block text-sm font-medium text-gray-700 mb-1">
              Жанр *
            </label>
            <select
              id="genre_id"
              name="genre_id"
              value={formData.genre_id}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Выберите жанр</option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mt-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Описание
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Описание книги"
          />
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Отмена
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white ${
              loading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
          >
            {loading ? 'Сохранение...' : (bookId ? 'Обновить книгу' : 'Создать книгу')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;