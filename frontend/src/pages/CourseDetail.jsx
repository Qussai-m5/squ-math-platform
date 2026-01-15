import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CourseDetail.css';

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [materials, setMaterials] = useState([]);
    const [activeTab, setActiveTab] = useState('NOTE'); // NOTE, EXAM, SOLN

    useEffect(() => {
        // Fetch Course Info
        fetch(`/api/courses/${id}/`)
            .then(res => res.json())
            .then(data => setCourse(data))
            .catch((err) => {
                console.error("Failed to fetch course", err);
                // Fallback for demo
                setCourse({
                    id: 1,
                    code: 'MATH2107',
                    name: 'Calculus I',
                    year_display: 'Year 1',
                    description: 'Limits, derivatives, integrals.'
                });
            });

        // Fetch Materials for this course
        fetch(`/api/materials/?course=${id}`)
            .then(res => res.json())
            .then(data => setMaterials(data))
            .catch(console.error);
    }, [id]);

    if (!course) return <div className="loading">Loading Course Data...</div>;

    const filteredMaterials = materials.filter(m => m.material_type === activeTab);

    const handleMaterialDelete = (materialId) => {
        if (window.confirm('Delete this material?')) {
            fetch(`/api/materials/${materialId}/`, { method: 'DELETE' })
                .then(res => {
                    if (res.ok) {
                        setMaterials(materials.filter(m => m.id !== materialId));
                    }
                })
                .catch(console.error);
        }
    };

    const getFileUrl = (fileUrl) => {
        if (!fileUrl) return '#';
        // If it's already a full URL, strip the domain to go through proxy (avoids CORS download issues)
        try {
            const urlObj = new URL(fileUrl, 'http://localhost:8000'); // Base for relative urls
            if (urlObj.pathname.startsWith('/media')) {
                return urlObj.pathname;
            }
            return fileUrl;
        } catch (e) {
            return fileUrl;
        }
    };

    const MaterialList = ({ items }) => {
        if (items.length === 0) return <p className="no-data">No materials uploaded yet.</p>;
        return (
            <div className="material-list">
                {items.map(item => (
                    <div key={item.id} className="material-item">
                        <div className="material-info">
                            <a href={getFileUrl(item.file)} download className="material-link">
                                {item.title}
                            </a>
                            <span className="upload-date">{new Date(item.uploaded_at).toLocaleDateString()}</span>
                        </div>
                        <div className="material-actions">
                            <a
                                href={getFileUrl(item.file)}
                                download
                                className="btn-icon"
                                title="Download"
                            >
                                ⬇️
                            </a>
                            <button
                                className="btn-icon btn-delete-small"
                                onClick={() => handleMaterialDelete(item.id)}
                                title="Delete"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="course-detail">
            <div className="course-header">
                <Link to="/courses" className="back-link">← Back to Courses</Link>
                <h1>{course.code}: {course.name}</h1>
                <p className="description">{course.description}</p>
                <div className="year-badge">{course.year_display}</div>
            </div>

            <div className="tabs">
                <button
                    className={`tab-btn ${activeTab === 'NOTE' ? 'active' : ''}`}
                    onClick={() => setActiveTab('NOTE')}
                >
                    📝 Summaries / Notes
                </button>
                <button
                    className={`tab-btn ${activeTab === 'EXAM' ? 'active' : ''}`}
                    onClick={() => setActiveTab('EXAM')}
                >
                    ⚖️ Past Exams
                </button>
                <button
                    className={`tab-btn ${activeTab === 'SOLN' ? 'active' : ''}`}
                    onClick={() => setActiveTab('SOLN')}
                >
                    ✅ Solutions
                </button>
            </div>

            <MaterialList items={filteredMaterials} />
        </div>
    );
};

export default CourseDetail;
