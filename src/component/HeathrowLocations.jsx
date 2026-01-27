import { FaMapMarkerAlt, FaParking, FaPlane } from "react-icons/fa";

export default function HeathrowLocations() {
  return (
    <section className="container-fluid locations-section py-5">
      <div className="container py-5">

        {/* HEADER */}
        <div className="text-center mb-5">
          <h2 className="locations-title fw-bold">
            Local Heathrow & Gatwick Airport Parking You Can Rely On
          </h2>
          <p className="locations-subtitle mt-3 mx-auto">
            Close to Heathrow & Gatewick, Greeg Maurice Parking is a trusted choice for
            travellers seeking off-site parking with excellent transport links.
            Enjoy affordable airport parking without compromising on speed,
            safety, or service.
          </p>
        </div>

        {/* CONTENT */}
        <div className="row align-items-center g-4">

          {/* LEFT TEXT */}
          <div className="col-lg-6">
            <div className="info-box">
              <div className="info-icon">
                <FaPlane />
              </div>
              <p>
                Searching for reliable Heathrow & Gatwick airport parking options? You’re
                in the right place. Our conveniently located park & ride service
                offers fast transfers and easy access to all major terminals.
              </p>
            </div>
          </div>

          {/* RIGHT LIST */}
          <div className="col-lg-6">
            <div className="terminal-box">

              <div className="terminal-item">
                <FaParking />
                <span>Heathrow Terminal 5 parking</span>
              </div>

              <div className="terminal-item">
                <FaParking />
                <span>Heathrow Terminal 2 long stay parking</span>
              </div>

              <div className="terminal-item">
                <FaParking />
                <span>Heathrow Terminal 3 cheap parking</span>
              </div>

              <div className="terminal-item">
                <FaParking />
                <span>Heathrow Terminal 4 park and ride</span>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* ======================
           CSS (UI ONLY)
      ======================= */}
      <style>{`
        .locations-section {
          background: linear-gradient(180deg, #ffffff, #f1f5ff);
        }

        .locations-title {
          color: #062A4F;
          font-size: 36px;
          max-width: 850px;
          margin: 0 auto;
        }

        .locations-subtitle {
          color: #475569;
          font-size: 17px;
          max-width: 750px;
          line-height: 1.7;
        }

        .info-box {
          background: #ffffff;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 18px 40px rgba(15,23,42,0.1);
          display: flex;
          gap: 18px;
          align-items: flex-start;
        }

        .info-icon {
          min-width: 56px;
          min-height: 56px;
          border-radius: 50%;
          background: #062A4F;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 24px;
          box-shadow: 0 10px 24px rgba(2,48,153,0.35);
        }

        .info-box p {
          margin: 0;
          font-size: 16px;
          color: #334155;
          line-height: 1.7;
        }

        .terminal-box {
          background: #ffffff;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 18px 40px rgba(15,23,42,0.1);
        }

        .terminal-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 0;
          font-size: 16px;
          color: #0f172a;
          border-bottom: 1px solid #e2e8f0;
        }

        .terminal-item:last-child {
          border-bottom: none;
        }

        .terminal-item svg {
          color: #062A4F;
          font-size: 20px;
        }

        /* TABLET */
        @media (max-width: 992px) {
          .locations-title {
            font-size: 32px;
          }

          .locations-subtitle {
            font-size: 16px;
          }

          .info-box,
          .terminal-box {
            padding: 26px;
          }
        }

        /* MOBILE */
        @media (max-width: 576px) {
          .locations-title {
            font-size: 26px;
          }

          .locations-subtitle {
            font-size: 15px;
          }

          .info-box {
            flex-direction: column;
          }

          .info-icon {
            margin-bottom: 8px;
          }

          .terminal-item {
            font-size: 15px;
          }
        }
      `}</style>
    </section>
  );
}
