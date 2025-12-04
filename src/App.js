import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BooksList from './pages/BooksList';
import BookForm from './pages/BookForm';
import BookDetails from './pages/BookDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<BooksList />} />
          <Route path="/books" element={<BooksList />} />
          <Route path="/books/new" element={<BookForm />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/books/edit/:id" element={<BookForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;