import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <section className="hero">
                <h1>SQU Mathematics Platform</h1>
                <p>Your centralized repository for course materials, notes, and exams.</p>
                <div className="hero-btns">
                    <Link to="/courses" className="btn">Browse Courses</Link>
                    <Link to="/textbooks" className="btn" style={{ backgroundColor: 'var(--secondary-color)', marginLeft: '1rem' }}>Digital Library</Link>
                </div>
            </section>

            <section className="features">
                <div className="card">
                    <h3>📂 Organized Repository</h3>
                    <p>Access materials sorted by academic year and course code.</p>
                </div>
                <div className="card">
                    <h3>📚 Digital Library</h3>
                    <p>Find textbooks for Pure Math, Applied Math, and Statistics.</p>
                </div>
                <div className="card">
                    <h3>📤 Community Driven</h3>
                    <p>Share your own notes and solutions with fellow students.</p>
                </div>
            </section>
        </div>
    );
};

export default Home;
