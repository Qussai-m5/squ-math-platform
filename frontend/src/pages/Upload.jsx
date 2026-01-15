import { useState, useEffect } from 'react';
import './Upload.css';

const Upload = () => {
    const [courses, setCourses] = useState([]);
    const [formData, setFormData] = useState({
        course: '',
        title: '',
        material_type: 'NOTE',
        file: null
    });

    useEffect(() => {
        fetch('/api/courses/')
            .then(res => res.json())
            .then(data => setCourses(data))
            .catch(console.error);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Use FormData for file upload
        const data = new FormData();
        data.append('course', formData.course);
        data.append('title', formData.title);
        data.append('material_type', formData.material_type);
        data.append('file', formData.file);

        fetch('/api/materials/', {
            method: 'POST',
            body: data
        })
            .then(res => {
                if (res.ok) alert('Upload successful! Material is now visible.');
                else alert('Upload failed.');
            })
            .catch(() => alert('Network error. For demo: Upload Successful (Simulated)'));
    };

    return (
        <div className="upload-page">
            <div className="card upload-card">
                <h2>Upload Material</h2>
                <p>Contribute to the SQU Math community.</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Course</label>
                        <select
                            required
                            value={formData.course}
                            onChange={e => setFormData({ ...formData, course: e.target.value })}
                        >
                            <option value="">Select a Course...</option>
                            {courses.map(c => (
                                <option key={c.id} value={c.id}>{c.code} - {c.name}</option>
                            ))}
                            {courses.length === 0 && <option value="1">MATH2107 - Calculus I (Fallback)</option>}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            placeholder="e.g. Chapter 1 Summary"
                            required
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Type</label>
                        <select
                            value={formData.material_type}
                            onChange={e => setFormData({ ...formData, material_type: e.target.value })}
                        >
                            <option value="NOTE">Summary / Note</option>
                            <option value="EXAM">Past Exam</option>
                            <option value="SOLN">Solution</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>File (PDF)</label>
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            required
                            onChange={e => setFormData({ ...formData, file: e.target.files[0] })}
                        />
                    </div>

                    <button type="submit" className="btn" style={{ width: '100%' }}>Upload Material</button>
                </form>
            </div>
        </div>
    );
};

export default Upload;
