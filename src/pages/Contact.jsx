import React, { useEffect, useState } from "react";
import Topbar from "../component/Topbar";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import Copyright from "../component/Copyright";
import ReCAPTCHA from "react-google-recaptcha";
import NavbarElement from "../component/NavbarElement";

const API = import.meta.env.VITE_API_URL;

const Contact = () => {
  const [userType, setUserType] = useState("guest");

  const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const checkScreen = () => setIsMobile(window.innerWidth <= 768);
      checkScreen();
      window.addEventListener("resize", checkScreen);
      return () => window.removeEventListener("resize", checkScreen);
    }, []);

  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    subject: "",
    message: "",
    ref_no: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    if (userType === "registered" && !form.ref_no.trim()) {
      setErrorMsg("Reference number is required for registered users.");
      setLoading(false);
      return;
    }

    if (!captchaToken) {
      setErrorMsg("Please verify that you are not a robot.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API}/api/support-ticket`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: form.customer_name,
          customer_email: form.customer_email,
          subject: form.subject,
          category:
            userType === "registered"
              ? "Registered User - Contact Page"
              : "Guest User - Contact Page",
          ref_no: userType === "registered" ? form.ref_no : null,
          message: form.message,
          captchaToken,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      setSuccessMsg(
        "Your message has been sent successfully. We will contact you soon."
      );
      setForm({
        customer_name: "",
        customer_email: "",
        subject: "",
        message: "",
        ref_no: "",
      });
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* {!isMobile && <Topbar />} */}
      <NavbarElement />

      <section className="contact-section py-5">
        <div className="container py-5">

          {/* HEADER */}
          <div className="text-center mb-5">
            <h2 className="contact-title">
              Reach Out To Us For Assistance Or Inquiries
            </h2>
            <p className="contact-subtitle">
              We’re Here to Help—Contact Us Today!
            </p>
          </div>

          <div className="row g-4 justify-content-center">

            {/* FORM */}
            <div className="col-lg-5">
              <div className="contact-form-card">

                <h5 className="text-white text-center mb-4">
                  Send Your Message
                </h5>

                {/* USER TYPE TABS */}
                <ul className="nav nav-pills mb-4 justify-content-center">
                  <li className="nav-item">
                    <button
                      type="button"
                      className={`nav-link ${
                        userType === "guest" ? "active" : "text-white"
                      }`}
                      onClick={() => setUserType("guest")}
                    >
                      Guest / Random Client
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className={`nav-link ${
                        userType === "registered" ? "active" : "text-white"
                      }`}
                      onClick={() => setUserType("registered")}
                    >
                      Registered User
                    </button>
                  </li>
                </ul>

                {successMsg && (
                  <div className="alert alert-success">{successMsg}</div>
                )}
                {errorMsg && (
                  <div className="alert alert-danger">{errorMsg}</div>
                )}

                {/* GUEST FORM */}
                {userType === "guest" && (
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="customer_name"
                      placeholder="Your Name"
                      className="form-control mb-3"
                      value={form.customer_name}
                      onChange={handleChange}
                      required
                    />

                    <input
                      type="email"
                      name="customer_email"
                      placeholder="Your Email"
                      className="form-control mb-3"
                      value={form.customer_email}
                      onChange={handleChange}
                      required
                    />

                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      className="form-control mb-3"
                      value={form.subject}
                      onChange={handleChange}
                      required
                    />

                    <textarea
                      name="message"
                      placeholder="Message"
                      className="form-control mb-3"
                      value={form.message}
                      onChange={handleChange}
                      required
                    />

                    <div className="mb-3 d-flex justify-content-center">
                      <ReCAPTCHA
                        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                        onChange={(token) => setCaptchaToken(token)}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn submit-btn w-100"
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                )}

                {/* REGISTERED FORM */}
                {userType === "registered" && (
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="ref_no"
                      placeholder="Reference Number *"
                      className="form-control mb-3"
                      value={form.ref_no}
                      onChange={handleChange}
                      required
                    />

                    <input
                      type="text"
                      name="customer_name"
                      placeholder="Your Name"
                      className="form-control mb-3"
                      value={form.customer_name}
                      onChange={handleChange}
                      required
                    />

                    <input
                      type="email"
                      name="customer_email"
                      placeholder="Your Email"
                      className="form-control mb-3"
                      value={form.customer_email}
                      onChange={handleChange}
                      required
                    />

                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      className="form-control mb-3"
                      value={form.subject}
                      onChange={handleChange}
                      required
                    />

                    <textarea
                      name="message"
                      placeholder="Message"
                      className="form-control mb-3"
                      value={form.message}
                      onChange={handleChange}
                      required
                    />

                    <div className="mb-3 d-flex justify-content-center">
                      <ReCAPTCHA
                        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                        onChange={(token) => setCaptchaToken(token)}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn submit-btn w-100"
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* INFO */}
            <div className="col-lg-5">
              <div className="contact-info-card">
                <div className="info-box">
                  <h5>Our Address</h5>
                  <p>
                    36 Hamilton road UB33AS 
                  </p>
                </div>

                <div className="info-box">
                  <h5>Contact Info</h5>
                  <p>
                    Email: support@greggmaurice.co.uk<br />
                    Phone: 074 044 50858
                  </p>
                </div>

                <div className="info-box">
                  <h5>Office Hours</h5>
                  <p>9 - 17<br />Monday – Friday</p>
                </div>

                <div className="info-box">
                  <h5>Car Park Hours</h5>
                  <p>4:30 - Midnight</p>
                </div>
              </div>
            </div>

            {/* MAP */}
            {/* <div className="col-12 pt-4">
              <iframe
                className="w-100 rounded"
                style={{ height: "380px" }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.622585603256!2d-87.62938432480341!3d41.90097317123923"
                loading="lazy"
              ></iframe>
            </div> */}
          </div>
        </div>

        {/* ======================
             CSS (UI ONLY)
        ======================= */}
        <style>{`
          .contact-section {
            background: linear-gradient(180deg, #f8fafc, #eef2ff);
          }

          .contact-title {
            font-weight: 700;
            color: #0f172a;
          }

          .contact-subtitle {
            color: #475569;
          }

          .contact-form-card {
            background: #062A4F;
            border-radius: 20px;
            padding: 36px;
            box-shadow: 0 30px 60px rgba(15,23,42,0.35);
          }

          .contact-form-card .form-control {
            height: 48px;
            border-radius: 8px;
          }

          textarea.form-control {
            height: 140px;
          }

          .submit-btn {
            background: #ffa200;
            color: #1e293b;
            font-weight: 600;
            height: 48px;
            border-radius: 8px;
          }

          .contact-info-card {
            background: #ffffff;
            border-radius: 20px;
            padding: 28px;
            box-shadow: 0 25px 50px rgba(15,23,42,0.12);
          }

          .info-box {
            background: #f8fafc;
            padding: 20px;
            border-radius: 14px;
            margin-bottom: 16px;
          }

          .info-box h5 {
            color: #062A4F;
            margin-bottom: 6px;
          }

          .info-box p {
            margin: 0;
            color: #475569;
          }
        `}</style>
      </section>

      <Footer />
      <Copyright />
    </>
  );
};

export default Contact;
