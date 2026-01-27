import React, { useEffect, useState } from "react";
import Topbar from "../component/Topbar";
import NavbarElement from "../component/NavbarElement";
import Footer from "../component/Footer";
import Copyright from "../component/Copyright";

const PrivatePolicy = () => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth <= 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <>
      {/* {!isMobile && <Topbar />} */}
      <NavbarElement />

      <section className="container-fluid policy-section py-5">
        <div className="container my-5">

          {/* OUTER WRAPPER */}
          <div className="policy-wrapper mx-auto p-4 p-md-5">

            {/* TITLE */}
            <h2 className="fw-bold mb-4 policy-title">
              <i className="fas fa-file-contract me-2" />
              Privacy Policy
            </h2>

            {/* POLICY ITEMS */}
            {[
              {
                icon: "fas fa-credit-card",
                title: "Data We Collect",
                text: "We collect booking information, contact details, vehicle information, and website usage data."
              },
              {
                icon: "fas fa-ban",
                title: "How We Use Your Data",
                text: "To process bookings, enhance the user experience, ensure security, and deliver customer support."
              },
              {
                icon: "fas fa-car-crash",
                title: "Data Security",
                text: "All personal data is securely stored and never shared without permission."
              },
              {
                icon: "fas fa-shield-alt",
                title: "Cookies",
                text: "Our site uses cookies to improve functionality and optimise performance."
              },
              {
                icon: "fas fa-shuttle-van",
                title: "User Rights",
                text: "Users may request correction or deletion of personal data at any time."
              }
            ].map((item, idx) => (
              <div key={idx} className="policy-card mb-4">
                <h5 className="fw-bold mb-1">
                  <i className={`${item.icon} me-2`} />
                  {item.title}
                </h5>
                <p className="mb-0">
                  {item.text}
                </p>
              </div>
            ))}

          </div>
        </div>

        {/* ======================
             CSS (UI ONLY)
        ======================= */}
        <style>{`
          .policy-section {
            background: linear-gradient(180deg, #f8fafc, #eef2ff);
          }

          .policy-wrapper {
            background: #ffffff;
            border-radius: 24px;
            max-width: 1100px;
            box-shadow: 0 30px 60px rgba(15,23,42,0.12);
          }

          .policy-title {
            font-size: 36px;
            color: #0f172a;
          }

          .policy-title i {
            color: #2563eb;
          }

          .policy-card {
            background: #f8fafc;
            border-radius: 16px;
            padding: 20px 24px;
            border-left: 6px solid #ffa200;
          }

          .policy-card h5 {
            color: #0f172a;
            margin-bottom: 6px;
            font-size: 18px;
          }

          .policy-card i {
            color: #2563eb;
          }

          .policy-card p {
            color: #475569;
            font-size: 15px;
            line-height: 1.7;
          }

          /* TABLET */
          @media (max-width: 992px) {
            .policy-title {
              font-size: 32px;
            }

            .policy-card h5 {
              font-size: 17px;
            }

            .policy-card p {
              font-size: 16px;
            }
          }

          /* MOBILE */
          @media (max-width: 768px) {
            .policy-title {
              font-size: 26px;
            }

            .policy-wrapper {
              padding: 24px 20px !important;
            }

            .policy-card {
              padding: 18px 20px;
            }

            .policy-card h5 {
              font-size: 16px;
            }

            .policy-card p {
              font-size: 16px;
            }
          }
        `}</style>
      </section>

      <Footer />
      <Copyright />
    </>
  );
};

export default PrivatePolicy;
