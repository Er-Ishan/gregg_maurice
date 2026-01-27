import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { FaInstagram, FaTwitter } from "react-icons/fa";

export default function Topbar() {
  return (
    <div
      className="container-fluid py-2"
      style={{
        background: "#3a1672",
        boxShadow: "0 8px 24px rgba(2,48,153,0.35)",
      }}
    >
      <div className="container">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">

          {/* LEFT SIDE */}
          <div
            id="topnav"
            className="d-flex align-items-center flex-wrap gap-4 text-white small"
            style={{ lineHeight: "1.6" }}
          >
            <span className="d-flex align-items-center">
              <FaMapMarkerAlt className="me-2" />
              CarPark Address: 36 Hamilton road UB33AS
            </span>

            <span className="d-flex align-items-center">
              <FaPhoneAlt className="me-2" />
              Airport Number: 0700 000 2233
            </span>

            <span className="d-flex align-items-center">
              <FaEnvelope className="me-2" />
              	info@thompsonparkandride.co.uk
            </span>
          </div>

          {/* DESKTOP SOCIAL ICONS */}
          <div
            id="sociallink"
            className="d-none d-lg-flex align-items-center gap-2"
          >
            {/* <div style={circleStyle}><FaFacebookF style={iconStyle} /></div>
            <div style={circleStyle}><FaInstagram style={iconStyle} /></div>
            <div style={circleStyle}><FaTwitter style={iconStyle} /></div>
            <div style={circleStyle}><FaLinkedinIn style={iconStyle} /></div> */}
          </div>

          {/* MOBILE ICONS */}
          <div
            id="mobileonly"
            className="d-flex d-lg-none align-items-center gap-2"
          >
            <div style={circleStyle}><FaPhoneAlt style={iconStyle} /></div>
            <div style={circleStyle}><FaEnvelope style={iconStyle} /></div>
            {/* <div style={circleStyle}><FaFacebookF style={iconStyle} /></div>
            <div style={circleStyle}><FaInstagram style={iconStyle} /></div>
            <div style={circleStyle}><FaTwitter style={iconStyle} /></div>
            <div style={circleStyle}><FaLinkedinIn style={iconStyle} /></div> */}
          </div>

        </div>
      </div>
    </div>
  );
}

/* =====================
   SEO-FRIENDLY THEME
   ===================== */

const circleStyle = {
  background: "#ffffff",
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.25s ease",
  boxShadow: "0 4px 14px rgba(2,48,153,0.25)",
};

const iconStyle = {
  color: "#023099",
  fontSize: "16px",
};
