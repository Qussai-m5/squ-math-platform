import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Courses.css';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('/api/courses/')
            .then(res => res.json())
            .then(data => {
                setCourses(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch courses", err);
                setLoading(false);
                // Fallback data for demo
                setCourses([
                    { id: 1, code: 'MATH2107', name: 'Calculus I', year_display: 'Year 1', description: 'Limits, derivatives, integrals.' },
                    { id: 2, code: 'MATH3301', name: 'Linear Algebra', year_display: 'Year 2', description: 'Vector spaces, matrices.' },
                ]);
            });
    }, []);

    const filteredCourses = courses.filter(course =>
        course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id, e) => {
        e.preventDefault(); // Prevent navigating to detail
        if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
            fetch(`/api/courses/${id}/`, { method: 'DELETE' })
                .then(res => {
                    if (res.ok) {
                        setCourses(courses.filter(c => c.id !== id));
                    } else {
                        alert('Failed to delete course');
                    }
                })
                .catch(err => console.error(err));
        }
    };

    return (
        <div className="courses-page">
            <div className="page-header">
                <h2>Mathematics Courses</h2>
                <div className="actions">
                    <Link to="/courses/add" className="btn" style={{ marginRight: '1rem' }}>+ Add Course</Link>
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-bar"
                    />
                </div>
            </div>

            {loading ? <p>Loading...</p> : (
                <div className="course-grid">
                    {filteredCourses.map(course => (
                        <div key={course.id} className="course-card">
                            <Link to={`/courses/${course.id}`} className="course-link">
                                <h3>{course.code}</h3>
                                <h4>{course.name}</h4>
                                <span className="year-tag">Year {course.year_level}</span>
                                <p>{course.description.substring(0, 100)}...</p>
                            </Link>
                            <button
                                className="btn-delete"
                                onClick={(e) => handleDelete(course.id, e)}
                                title="Delete Course"
                            >
                                🗑️
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Courses;
