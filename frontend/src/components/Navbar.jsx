import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ token, onLogout }) => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">SQU Math Platform</Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/courses">Courses</Link></li>
                <li><Link to="/textbooks">Digital Library</Link></li>
                <li><Link to="/support">Support</Link></li>
                {token ? (
                    <li><button className="btn-logout" onClick={onLogout}>Logout</button></li>
                ) : (
                    <li><Link to="/login" className="btn-login-nav">Login</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
