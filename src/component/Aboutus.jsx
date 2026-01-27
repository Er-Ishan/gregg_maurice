export default function Aboutus() {
  return (
    <section className="container-fluid about-section py-5">
      <div className="container py-5">

        {/* HEADER */}
        <div className="text-center mb-4">
          <h2 className="fw-bold about-title mb-4">
            Airport Parking You Can Trust
          </h2>
        </div>

        {/* CONTENT */}
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-9">
            <p className="about-text">
              Greeg Maurice Parking offers secure, reliable, affordable Heathrow & Gatwick airport parking—your journey is simple from start to finish. Our professional service lets you park safely and enjoy a smooth, stress-free transfer to the terminal.
            </p>

            <p className="about-text">
              Travel for business or holiday with Greeg Maurice Parking for cheap Heathrow & Gatwick parking with security and service.
            </p>
          </div>
        </div>

      </div>

      {/* ======================
           CSS (UI ONLY)
      ======================= */}
      <style>{`
        .about-section {
          background: linear-gradient(180deg, #f8fafc, #eef2ff);
        }

        .about-title {
          color: #062A4F;
          font-size: 32px;
        }

        .about-text {
          color: #475569;
          font-size: 16px;
          line-height: 1.8;
          margin-bottom: 18px;
          text-align: justify; /* ✅ desktop only */
          word-spacing: normal;
          hyphens: auto;
        }

        /* TABLET */
        @media (max-width: 992px) {
          .about-title {
            font-size: 34px;
          }

          .about-text {
            font-size: 20px;
            line-height: 1.6;
            text-align: left; /* ✅ FIX */
          }
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .about-title {
            font-size: 28px;
          }

          .about-text {
            font-size: 18px;
            line-height: 1.6;
            text-align: left; /* ✅ FIX */
          }
        }
      `}</style>
    </section>
  );
}
