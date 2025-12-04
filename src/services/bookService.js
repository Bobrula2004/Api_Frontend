// services/bookService.js
import axios from './api';

export const bookService = {
  // Get all books with pagination and filtering
  getBooks: (params = {}) => {
    return axios.get('/books/', params);
  },

  // Get a specific book by ID
  getBook: (id) => {
    return axios.get(`/books/${id}`);
  },

  // Create a new book
  createBook: (bookData) => {
    return axios.post('/books/', bookData);
  },

  // Update an existing book
  updateBook: (id, bookData) => {
    return axios.put(`/books/${id}`, bookData);
  },

  // Delete a book
  deleteBook: (id) => {
    return axios.delete(`/books/${id}`);
  }
};

export const authorService = {
  // Get all authors
  getAuthors: (params = {}) => {
    return axios.get('/authors/', params);
  },

  // Get a specific author by ID
  getAuthor: (id) => {
    return axios.get(`/authors/${id}`);
  },

  // Create a new author
  createAuthor: (authorData) => {
    return axios.post('/authors/', authorData);
  },

  // Update an existing author
  updateAuthor: (id, authorData) => {
    return axios.put(`/authors/${id}`, authorData);
  },

  // Delete an author
  deleteAuthor: (id) => {
    return axios.delete(`/authors/${id}`);
  }
};

export const genreService = {
  // Get all genres
  getGenres: (params = {}) => {
    return axios.get('/genres/', params);
  },

  // Get a specific genre by ID
  getGenre: (id) => {
    return axios.get(`/genres/${id}`);
  },

  // Create a new genre
  createGenre: (genreData) => {
    return axios.post('/genres/', genreData);
  },

  // Update an existing genre
  updateGenre: (id, genreData) => {
    return axios.put(`/genres/${id}`, genreData);
  },

  // Delete a genre
  deleteGenre: (id) => {
    return axios.delete(`/genres/${id}`);
  }
};