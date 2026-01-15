import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddCourse.css';

const AddCourse = () => {
    const API_BASE_URL = import.meta.env.VITE_API_URL || '';
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        year_level: 1,
        description: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('/api/courses/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(res => {
                if (res.ok) {
                    alert('Course Added Successfully!');
                    navigate('/courses');
                } else {
                    res.text().then(text => {
                        console.error(text);
                        alert(`Failed to add course. Server responded: ${res.status} ${res.statusText}\n${text}`);
                    });
                }
            })
            .catch(err => {
                console.error("Error adding course:", err);
                alert(`Network Error: ${err.message}`);
            });
    };

    return (
        <div className="add-course-container">
            <h2>Add New Course</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Course Code</label>
                    <input
                        type="text"
                        placeholder="e.g. MATH5000"
                        required
                        value={formData.code}
                        onChange={e => setFormData({ ...formData, code: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label>Course Name</label>
                    <input
                        type="text"
                        placeholder="e.g. Advanced Topology"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label>Year Level</label>
                    <select
                        value={formData.year_level}
                        onChange={e => setFormData({ ...formData, year_level: parseInt(e.target.value) })}
                    >
                        <option value={1}>Year 1</option>
                        <option value={2}>Year 2</option>
                        <option value={3}>Year 3</option>
                        <option value={4}>Year 4</option>
                        <option value={5}>Elective / Advanced</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        placeholder="Brief description of the course content..."
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <button type="submit" className="btn-submit">Add Course</button>
            </form>
        </div>
    );
};

export default AddCourse;
