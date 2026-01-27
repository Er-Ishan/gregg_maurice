import { Link } from "react-router-dom";
import footerLogo from "../assets/greeg-white.png";

export default function Footer() {
  return (
    <footer className="footer-section text-white mt-5">
      <div className="container py-5">
        <div className="row g-5">

          {/* ABOUT */}
          <div className="col-md-6 col-lg-3">
            <img
              src={footerLogo}
              alt="Airport Parking"
              style={{ height: "170px" }}
              className="mb-3"
            />

            <p className="footer-text">
              Providing secure, affordable, and convenient airport parking
              with fast transfers to all Heathrow & Gatwick Terminals.
            </p>

            <div className="position-relative mt-3">
              <input
                className="form-control rounded-pill py-3 ps-4 pe-5"
                placeholder="Enter your email"
              />
              <button className="btn subscribe-btn rounded-pill position-absolute top-0 end-0 mt-1 me-1 px-4">
                Subscribe
              </button>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="col-md-6 col-lg-3">
            <h4 className="fw-bold mb-4">Quick Links</h4>
            <ul className="list-unstyled footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/howitworks">How It Works</Link></li>
              <li><Link to="/termsandconditions">Terms & Conditions</Link></li>
              <li><Link to="/privacypolicy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* BUSINESS HOURS */}
          <div className="col-md-6 col-lg-3">
            <h4 className="fw-bold mb-4">Business Hours</h4>

            <h5 className="fw-bold">Office Hours</h5>
            <p className="mb-1">Mon - Friday</p>
            <p className="mb-3">09:00 - 07:00</p>
{/* 
            <h5 className="fw-bold">Car Park Hours</h5>
            <p className="mb-3">04:30 - Midnight</p> */}
          </div>

          {/* CONTACT */}
          <div className="col-md-6 col-lg-3">
            <h4 className="fw-bold mb-4">Car Park Info</h4>

            <h5 className="fw-bold">Address</h5>
            <p>
              <a href="#" className="footer-link">
                36 Hamilton road UB33AS
              </a>
            </p>

            <h5 className="fw-bold">Email</h5>
            <p>
              <a
                href="mailto:support@greggmaurice.co.uk"
                className="footer-link"
              >
                support@greggmaurice.co.uk
              </a>
            </p>

            <h5 className="fw-bold">Phone</h5>
            <p>
              <a href="tel:01234567890" className="footer-link">
                +012 345 67890
              </a>
            </p>
          </div>

        </div>
      </div>

      {/* ======================
           CSS (UI ONLY)
      ======================= */}
      <style>{`
        .footer-section {
          background: #062A4F;
        }

        .footer-text {
          color: #e0f2fe;
          font-size: 15px;
          line-height: 1.6;
        }

        .footer-links li {
          margin-bottom: 10px;
        }

        .footer-links a,
        .footer-link {
          color: #e0f2fe;
          text-decoration: none;
          font-size: 15px;
          transition: all 0.3s ease;
        }

        .footer-links a:hover,
        .footer-link:hover {
          color: #facc15;
        }

        .subscribe-btn {
          background: #ffa200;
          color: #1e293b;
          font-weight: 600;
        }

        /* TABLET */
        @media (max-width: 992px) {
          .footer-text {
            font-size: 16px;
          }

          .footer-links a,
          .footer-link {
            font-size: 16px;
          }
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .footer-section {
            text-align: center;
          }

          .footer-text {
            font-size: 16px;
            line-height: 1.7;
          }

          .footer-links {
            padding-left: 0;
          }

          .footer-links a,
          .footer-link {
            font-size: 16px;
          }
        }
      `}</style>
    </footer>
  );
}
