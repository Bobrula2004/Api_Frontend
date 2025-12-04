// components/SearchFilter.js
import React, { useState } from 'react';

const SearchFilter = ({ onSearch, authors, genres }) => {
  const [filters, setFilters] = useState({
    title: '',
    author_id: '',
    genre_id: '',
    publication_year: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  const resetFilters = () => {
    const resetFilters = {
      title: '',
      author_id: '',
      genre_id: '',
      publication_year: ''
    };
    setFilters(resetFilters);
    onSearch(resetFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={filters.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search by title"
          />
        </div>
        
        <div>
          <label htmlFor="author_id" className="block text-sm font-medium text-gray-700 mb-1">
            Author
          </label>
          <select
            id="author_id"
            name="author_id"
            value={filters.author_id}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Authors</option>
            {authors.map(author => (
              <option key={author.id} value={author.id}>{author.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="genre_id" className="block text-sm font-medium text-gray-700 mb-1">
            Genre
          </label>
          <select
            id="genre_id"
            name="genre_id"
            value={filters.genre_id}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="publication_year" className="block text-sm font-medium text-gray-700 mb-1">
            Year
          </label>
          <input
            type="number"
            id="publication_year"
            name="publication_year"
            value={filters.publication_year}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Publication year"
            min="1000"
            max="2100"
          />
        </div>
        
        <div className="flex items-end space-x-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Search
          </button>
          <button
            type="button"
            onClick={resetFilters}
            className="w-full bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchFilter;