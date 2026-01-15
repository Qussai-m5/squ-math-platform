import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import AddCourse from './pages/AddCourse';
import Textbooks from './pages/Textbooks';
import Upload from './pages/Upload';
import Login from './pages/Login';
import Support from './pages/Support';

import AISolver from './components/AISolver';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const handleLogin = (newToken) => {
        setToken(newToken);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <Router>
            <div className="app-container">
                <Navbar token={token} onLogout={handleLogout} />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route path="/courses/add" element={token ? <AddCourse /> : <Navigate to="/login" />} />
                        <Route path="/courses/:id" element={<CourseDetail />} />
                        <Route path="/textbooks" element={<Textbooks token={token} />} />
                        <Route path="/upload" element={token ? <Upload /> : <Navigate to="/login" />} />
                        <Route path="/login" element={token ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
                        <Route path="/support" element={<Support />} />
                    </Routes>
                </main>
                <AISolver />
                <footer className="footer">
                    <p>© 2026 SQU Math Department. All rights reserved.</p>
                </footer>
            </div>
        </Router>
    );
}

export default App; // Ensure export default is preserved
