// pages/BooksList.js
import React, { useState, useEffect } from 'react';
import { bookService, authorService, genreService } from '../services/bookService';
import BookCard from '../components/BookCard';
import BookTable from '../components/BookTable';
import SearchFilter from '../components/SearchFilter';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  useEffect(() => {
    fetchData();
  }, [pagination.page]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [booksRes, authorsRes, genresRes] = await Promise.all([
        bookService.getBooks({
          params: {
            skip: (pagination.page - 1) * pagination.limit,
            limit: pagination.limit
          }
        }),
        authorService.getAuthors(),
        genreService.getGenres()
      ]);
      
      setBooks(booksRes.data.items);
      setPagination({
        page: booksRes.data.page,
        limit: booksRes.data.limit,
        total: booksRes.data.total,
        pages: booksRes.data.pages
      });
      setAuthors(authorsRes.data);
      setGenres(genresRes.data);
    } catch (err) {
      setError('Failed to load data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await bookService.deleteBook(id);
      // Refresh the list after deletion
      await fetchData();
    } catch (err) {
      setError('Failed to delete book');
      console.error(err);
    }
  };

  const handleSearch = async (filters) => {
    try {
      setLoading(true);
      const params = {
        skip: 0, // Reset to first page when searching
        limit: pagination.limit,
        ...(filters.title && { title: filters.title }),
        ...(filters.author_id && { author_id: parseInt(filters.author_id) }),
        ...(filters.genre_id && { genre_id: parseInt(filters.genre_id) }),
        ...(filters.publication_year && { publication_year: parseInt(filters.publication_year) })
      };
      
      const response = await bookService.getBooks({ params });
      setBooks(response.data.items);
      setPagination({
        page: response.data.page,
        limit: response.data.limit,
        total: response.data.total,
        pages: response.data.pages
      });
    } catch (err) {
      setError('Failed to search books');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  };

  if (loading && books.length === 0) {
    return <div className="text-center py-10">Загрузка книг...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Книги</h1>
        <div className="flex items-center space-x-4">
          <div className="flex border rounded-md overflow-hidden">
            <button
              className={`px-4 py-2 ${viewMode === 'cards' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setViewMode('cards')}
            >
              Cards
            </button>
            <button
              className={`px-4 py-2 ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setViewMode('table')}
            >
              Table
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <SearchFilter onSearch={handleSearch} authors={authors} genres={genres} />

      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map(book => (
            <BookCard key={book.id} book={book} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <BookTable books={books} onDelete={handleDelete} onEdit={() => {}} />
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="mt-8 flex justify-center items-center">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className={`relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                pagination.page === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              Предыдущая
            </button>
            
            <div className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              Page {pagination.page} of {pagination.pages}
            </div>
            
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.pages}
              className={`relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                pagination.page === pagination.pages 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              Следущая
            </button>
          </nav>
        </div>
      )}

      {books.length === 0 && !loading && (
        <div className="text-center py-10">
          <p className="text-gray-500">Книги не найдены.</p>
        </div>
      )}
    </div>
  );
};

export default BooksList;