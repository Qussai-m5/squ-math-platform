import { useState, useEffect } from 'react';
import './Textbooks.css';
import EditBookModal from './EditBookModal';

const Textbooks = ({ token }) => {
    // ... existing state ...
    const [books, setBooks] = useState([]);
    const [filter, setFilter] = useState('ALL');

    const [editingBook, setEditingBook] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = () => {
        fetch('/api/textbooks/')
            .then(res => res.json())
            .then(data => setBooks(data))
            .catch(err => console.error("Failed to fetch books", err));
    };

    const handleEditClick = (book) => {
        setEditingBook(book);
    };

    const handleAddClick = () => {
        setIsAdding(true);
    };

    const handleSave = async (id, formData) => {
        const isCreating = !id;
        const url = isCreating ? '/api/textbooks/' : `/api/textbooks/${id}/`;
        const method = isCreating ? 'POST' : 'PATCH';

        try {
            const headers = {};
            // Only add authorization header if token exists
            if (token) {
                headers['Authorization'] = `Token ${token}`;
            }

            const response = await fetch(url, {
                method: method,
                headers: headers,
                body: formData,
            });

            if (response.ok) {
                setEditingBook(null);
                setIsAdding(false);
                fetchBooks(); // Refresh list
            } else {
                alert(`Failed to ${isCreating ? 'add' : 'update'} book`);
            }
        } catch (error) {
            console.error('Error saving book:', error);
            alert('Error saving book');
        }
    };

    const handleDelete = async (id) => {
        try {
            const headers = {};
            if (token) {
                headers['Authorization'] = `Token ${token}`;
            }

            const response = await fetch(`/api/textbooks/${id}/`, {
                method: 'DELETE',
                headers: headers,
            });

            if (response.ok) {
                setEditingBook(null);
                fetchBooks(); // Refresh list
            } else {
                alert('Failed to delete book');
            }
        } catch (error) {
            console.error('Error deleting book:', error);
            alert('Error deleting book');
        }
    };

    const filteredBooks = books.filter(book => {
        const matchesSubject = filter === 'ALL' || book.subject_area === filter;
        const matchesSearch =
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSubject && matchesSearch;
    });

    return (
        <div>
            <div className="page-header">
                <h2>Digital Library</h2>
                <div className="header-actions">
                    <input
                        type="text"
                        placeholder="Search books..."
                        className="search-input"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <select value={filter} onChange={e => setFilter(e.target.value)} className="filter-select">
                        <option value="ALL">All Subjects</option>
                        <option value="PURE">Pure Mathematics</option>
                        <option value="APPLIED">Applied Mathematics</option>
                        <option value="STATS">Statistics</option>
                    </select>
                    {token && (
                        <button className="btn" onClick={handleAddClick}>+ Add Book</button>
                    )}
                </div>
            </div>

            <div className="book-grid">
                {filteredBooks.map(book => (
                    <div key={book.id} className="card book-card">
                        <div className="book-cover-placeholder">📖</div>
                        <div className="book-info">
                            <h3>{book.title}</h3>
                            <p className="author">by {book.author}</p>
                            <span className="current-subject">{book.subject_display}</span>
                            <div className="card-actions">
                                <a href={book.file} download className="btn btn-sm" target="_blank" rel="noopener noreferrer">
                                    Download PDF
                                </a>
                                {token && (
                                    <button className="btn-edit" onClick={() => handleEditClick(book)}>
                                        Edit
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {(editingBook || isAdding) && (
                <EditBookModal
                    book={editingBook}
                    onClose={() => { setEditingBook(null); setIsAdding(false); }}
                    onSave={handleSave}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default Textbooks;
