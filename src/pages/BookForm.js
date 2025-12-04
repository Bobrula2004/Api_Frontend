// pages/BookForm.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookFormComponent from '../components/BookForm';

const BookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const handleSubmit = () => {
    // Navigate back to the books list after successful submission
    navigate('/books');
  };
  
  const handleCancel = () => {
    // Navigate back to the books list when canceling
    navigate('/books');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <BookFormComponent 
        bookId={id} 
        onSubmit={handleSubmit} 
        onCancel={handleCancel} 
      />
    </div>
  );
};

export default BookForm;