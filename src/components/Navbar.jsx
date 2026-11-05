import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
return ( <nav className="navbar">


  {/* Logo */}
  <Link to="/" className="navbar-logo">
    <h2>
      Stock<span>Pro</span>
    </h2>
  </Link>

  {/* Navigation Links */}
  <ul className="nav-links">
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#testimonials">Testimonials</a></li>
    <li><a href="#faq">FAQ</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>

  {/* Authentication Buttons */}
  <div className="nav-buttons">
    <Link to="/register" className="register-btn">
      Register
    </Link>

    <Link to="/login" className="login-btn">
      Login
    </Link>
  </div>

</nav>


);
};

export default Navbar;
