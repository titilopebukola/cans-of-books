// import { Navbar, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import Burger from "./Burger/Burger";
export default function Header() {
  return (
    <header className="header">
      <div className="header-container container">
        <div className="logo-container">
          <h1 className="logo">Favourite Books</h1> <br />
          <span className="logo-strapline">A guide to discover your true Worth </span>
        </div>
        <Burger />
        <nav className="header-nav">
          <Link to="/" className="header-nav-link">
            <li className="header-nav-list-item">Home</li>
          </Link>
          <Link to="/about" className="header-nav-link">
            <li className="header-nav-list-item">About</li>
          </Link>
          <Link to="/bestbooks" className="header-nav-link">
            <li className="header-nav-list-item">Best Books</li>
          </Link>
        </nav>
      </div>
    </header>
  );
}
