import React, { useState } from 'react';

const EditBookModal = ({ book = null, onClose, onSave, onDelete }) => {
    const isEditing = !!book;

    const [formData, setFormData] = useState({
        title: book?.title || '',
        author: book?.author || '',
        subject_area: book?.subject_area || 'PURE',
        description: book?.description || ''
    });

    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Use FormData to handle file uploads
        const data = new FormData();
        data.append('title', formData.title);
        data.append('author', formData.author);
        data.append('subject_area', formData.subject_area);
        data.append('description', formData.description);

        if (file) {
            data.append('file', file);
        }

        onSave(isEditing ? book.id : null, data);
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this book? This action cannot be undone.")) {
            onDelete(book.id);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{isEditing ? 'Edit Textbook' : 'Add New Textbook'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Author</label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Subject Area</label>
                        <select
                            name="subject_area"
                            value={formData.subject_area}
                            onChange={handleChange}
                        >
                            <option value="PURE">Pure Mathematics</option>
                            <option value="APPLIED">Applied Mathematics</option>
                            <option value="STATS">Statistics & Probability</option>
                            <option value="GENERAL">General / Other</option>
                        </select>
                    </div>

                    {/* File Upload Field */}
                    <div className="form-group">
                        <label>PDF File {isEditing && '(Optional - leave empty to keep current)'}</label>
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            required={!isEditing} // Required only when adding a new book
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                        />
                    </div>
                    <div className="modal-actions" style={{ justifyContent: 'space-between' }}>
                        {isEditing && (
                            <button type="button" className="btn btn-danger" onClick={handleDelete} style={{ marginRight: 'auto', backgroundColor: '#e74c3c', color: 'white', border: 'none' }}>
                                Delete
                            </button>
                        )}
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Cancel
                            </button>
                            <button type="submit" className="btn">
                                {isEditing ? 'Save Changes' : 'Upload Book'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBookModal;
