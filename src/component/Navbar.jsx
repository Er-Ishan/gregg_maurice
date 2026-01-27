import { Link } from "react-router-dom";
import logo from "/img/thompson_logo.png";
import "./style.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg py-2" style={{ background: "#fff" }}>

      {/* FULL WIDTH CONTAINER */}
      <div className="container-fluid px-3 px-lg-5 d-flex align-items-center justify-content-between">

        {/* LOGO */}
        <Link to="/" className="navbar-brand m-0">
          <img
            src={logo}
            alt="Logo"
            style={{ height: "70px", width: "auto" }}
          />
        </Link>

        {/* MOBILE TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
        >
          <span className="fa fa-bars"></span>
        </button>

        {/* MENU */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarMenu">
          <ul className="navbar-nav text-center gap-lg-4">

            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">About Us</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/product">Our Product</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/howitworks">How It Works</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/faq">FAQ</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/privacypolicy">Privacy Policy</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/termsandconditions">Terms & Conditions</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}
