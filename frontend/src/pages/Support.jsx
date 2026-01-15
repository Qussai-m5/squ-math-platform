import React, { useState } from 'react';
import './Support.css';

const Support = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for contacting us! We will get back to you shortly.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="support-container">
            <div className="faq-section">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-item">
                    <h3>How do I download a book?</h3>
                    <p>Go to the Digital Library and click the "Download PDF" button on any book card.</p>
                </div>
                <div className="faq-item">
                    <h3>How do I solve a math problem?</h3>
                    <p>Navigate to the "AI Solver" page, enter your problem, and click "Solve".</p>
                </div>
                <div className="faq-item">
                    <h3>Can I contribute books?</h3>
                    <p>Yes! If you are a staff member, log in to upload new textbooks.</p>
                </div>
            </div>

            <div className="contact-section">
                <h2>Contact Us</h2>
                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                        <label>Name</label>
                        <input name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Subject</label>
                        <input name="subject" value={formData.subject} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Message</label>
                        <textarea name="message" value={formData.message} onChange={handleChange} rows="5" required />
                    </div>
                    <button type="submit" className="btn">Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default Support;
