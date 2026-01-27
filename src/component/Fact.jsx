export default function Fact() {
  return (
    <section className="container-fluid fact-section py-5">
      <div className="container py-5">

        {/* SECTION HEADING */}
        <div className="text-center mb-5">
          <h2 className="fw-bold fact-heading">
            Trusted by Travellers Across the Country
          </h2>
        </div>

        <div className="row g-4 justify-content-center">

          <div className="col-md-6 col-lg-3">
            <div className="fact-card h-100 text-center">
              <p className="fact-desc">
                Serving a large and growing community of satisfied travellers
                who rely on our parking services.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="fact-card h-100 text-center">
              <p className="fact-desc">
                Handling a high volume of airport parking reservations smoothly
                and efficiently every day.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="fact-card h-100 text-center">
              <p className="fact-desc">
                Operating from a safe and secure multi-storey parking facility
                to give you complete peace of mind.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="fact-card h-100 text-center">
              <p className="fact-desc">
                Built on long-standing knowledge and expertise in airport
                parking and customer service.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ======================
           CSS (UI ONLY)
      ======================= */}
      <style>{`
        .fact-section {
          background: transparent;
        }

        .fact-heading {
          color: #023099;
          font-size: 36px;
        }

        .fact-card {
          background: #023099;
          border-radius: 22px;
          padding: 36px 28px;
          box-shadow: 0 18px 40px rgba(2,48,153,0.35);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .fact-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 30px 60px rgba(2,48,153,0.45);
        }

        .fact-desc {
          color: #dbeafe;
          font-size: 15px;
          line-height: 1.7;
          margin-bottom: 0;
          word-spacing: normal;
          letter-spacing: normal;
        }

        /* TABLET */
        @media (max-width: 992px) {
          .fact-heading {
            font-size: 32px;
          }

          .fact-desc {
            font-size: 16px;
            line-height: 1.75;
          }
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .fact-heading {
            font-size: 26px;
          }

          .fact-card {
            padding: 28px 22px;
          }

          .fact-desc {
            font-size: 16px;
            line-height: 1.8;
          }
        }
      `}</style>
    </section>
  );
}
