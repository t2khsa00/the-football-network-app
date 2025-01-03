import { Link } from 'react-router-dom';
import './Header.css'; // Custom styles for header
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserCircle } from 'react-icons/fa'; // Using react-icons for better icons

const Header = () => {
  return (
    <header className="header">
      {/* Upper Section: Logo, Title, Language, Profile */}
      <div className="header-upper d-flex justify-content-between align-items-center p-3">
        {/* Logo Section */}
        <div className="d-flex align-items-center logo-section">
          <img src="/FootBallNetWork.png" alt="The Football Network Logo" className="logo" />
          <div className="title ms-2">The Football Network</div>
        </div>

        {/* Profile and Language Selector */}
        <div className="header-actions d-flex align-items-center gap-4">
          <select className="form-select language-select">
          <option value="en">English</option>
          <option value="es">Español</option>
          </select>
          <div className="profile-box">
            <span className="profile-title">Profile</span>
            <div className="profile-icon">
              <FaUserCircle />
            </div>
          </div>
        </div>
      </div>

      {/* Lower Section: Navigation Links, Search Bar */}
      <div className="header-lower d-flex justify-content-between align-items-center p-3">
        {/* Navbar Links */}
        <div className="navbar-links d-flex gap-4">
          <Link to="/news" className="nav-link">News</Link>
          <Link to="/matches" className="nav-link">Matches</Link>
          <Link to="/teams" className="nav-link">Teams</Link>
          <Link to="/leagues" className="nav-link">Leagues</Link>
          <Link to="/champions-league" className="nav-link">Champions League</Link> {/* Updated with Link */}
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input type="search" className="form-control search-input" placeholder="Search..." />
        </div>
      </div>
    </header>
  );
};

export default Header;
