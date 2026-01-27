import React, { useEffect, useState } from "react";
import Topbar from "../component/Topbar";
import NavbarElement from "../component/NavbarElement";
import Footer from "../component/Footer";
import Copyright from "../component/Copyright";



const Faq = () => {

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

      <section className="container-fluid faq-section py-5">
        <div className="container py-5">

          {/* SECTION TITLE */}
          <div className="text-center mb-5">
            <h2 className="fw-bold faq-title">
              Frequently Asked Questions
            </h2>
            <p className="faq-subtitle">
              Find quick answers about our car parking & shuttle services.
            </p>
          </div>

          {/* FAQ BOX */}
          <div className="mx-auto" style={{ maxWidth: "900px" }}>
            <div className="accordion" id="faqAccordion">

              {[
                "Is Thompson Park & Ride secure?",
                "How long does the transfer to Heathrow take?",
                "Which Heathrow terminals do you serve?",
                "Is this cheaper than on-site Heathrow parking?",
                "Do I need to book in advance?",
                "What happens when I return from my trip?"
              ].map((question, idx) => (
                <div key={idx} className="accordion-item faq-item">

                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed faq-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#faq${idx}`}
                    >
                      <span className="faq-icon">?</span>
                      {question}
                    </button>
                  </h2>

                  <div
                    id={`faq${idx}`}
                    className="accordion-collapse collapse"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body faq-body">
                      {[
                        "Yes, All vehicles are parked in a secure, CCTV-monitored parking facility to ensure maximum safety while you’re away.",
                        "Transfers are quick and efficient, typically taking 10–15 minutes, depending on traffic and terminal.",
                        "We serve all Heathrow terminals (T2, T3, T4, and T5) with on-demand transfers.",
                        "Yes, Our service is a cost-effective alternative to expensive on-site Heathrow car parking.",
                        "We strongly recommend booking online in advance to guarantee availability and secure the best price.",
                        "Simply contact us once you land, and we’ll arrange your return transfer to your vehicle."
                      ][idx]}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ======================
             CSS (UI ONLY)
        ======================= */}
        <style>{`
          .faq-section {
            background: linear-gradient(180deg, #f8fafc, #eef2ff);
          }

          .faq-title {
            font-size: 40px;
            color: #0f172a;
          }

          .faq-subtitle {
            color: #475569;
            font-size: 16px;
            line-height: 1.6;
          }

          .faq-item {
            border: none;
            border-radius: 20px;
            margin-bottom: 16px;
            background: #ffffff;
            box-shadow: 0 15px 35px rgba(15,23,42,0.08);
            overflow: hidden;
          }

          .faq-button {
            font-size: 18px;
            font-weight: 600;
            padding: 18px 22px;
            background: transparent;
            color: #0f172a;
            box-shadow: none;
          }

          .faq-button:not(.collapsed) {
            background: #062A4F;
            color: #ffffff;
          }

          .faq-button:focus {
            box-shadow: none;
          }

          .faq-icon {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: #062A4F;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
            font-weight: 700;
            flex-shrink: 0;
          }

          .faq-button:not(.collapsed) .faq-icon {
            background: #facc15;
            color: #062A4F;
          }

          .faq-body {
            font-size: 15px;
            color: #475569;
            padding: 20px 24px 24px 62px;
            line-height: 1.7;
          }

          /* TABLET */
          @media (max-width: 992px) {
            .faq-title {
              font-size: 32px;
            }

            .faq-button {
              font-size: 17px;
            }

            .faq-body {
              font-size: 16px;
            }
          }

          /* MOBILE */
          @media (max-width: 768px) {
            .faq-title {
              font-size: 26px;
            }

            .faq-subtitle {
              font-size: 15px;
            }

            .faq-button {
              font-size: 16px;
              padding: 16px 18px;
            }

            .faq-body {
              font-size: 16px;
              padding-left: 24px;
            }
          }
        `}</style>
      </section>

      <Footer />
      <Copyright />
    </>
  );
};

export default Faq;
