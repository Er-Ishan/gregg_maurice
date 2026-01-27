import {
  FaShieldAlt,
  FaShuttleVan,
  FaPoundSign,
  FaMousePointer,
} from "react-icons/fa";

export default function Features() {
  return (
    <section className="container-fluid feature-section py-5">
      <div className="container py-5">

        {/* HEADER */}
        <div className="text-center mb-5">
          <h2 className="fw-bold feature-title">
            Why Choose Greeg Maurice Parking?
          </h2>
        </div>

        {/* CONTENT */}
        <div className="row justify-content-center g-4">

          {/* Secure Parking */}
          <div className="col-12 col-md-6 col-lg-6">
            <div className="feature-step">
              <div className="icon-circle">
                <FaShieldAlt />
              </div>
              <div className="ms-3">
                <h5 className="fw-bold">Secure Parking Facilities</h5>
                <p>
                  Your vehicle is parked in a secure, CCTV-monitored area for
                  complete peace of mind. We prioritize your car’s safety so you
                  can travel without worry.
                </p>
              </div>
            </div>
          </div>

          {/* Transfers */}
          <div className="col-12 col-md-6 col-lg-6">
            <div className="feature-step">
              <div className="icon-circle">
                <FaShuttleVan />
              </div>
              <div className="ms-3">
                <h5 className="fw-bold">On-Demand Airport Transfers</h5>
                <p>
                  Our friendly team provides fast, on-demand transfers to
                  Heathrow & Gatwick & Gatwick terminals. Minimize waiting time and arrive relaxed
                  and on schedule.
                </p>
              </div>
            </div>
          </div>

          {/* Affordable */}
          <div className="col-12 col-md-6 col-lg-6">
            <div className="feature-step">
              <div className="icon-circle">
                <FaPoundSign />
              </div>
              <div className="ms-3">
                <h5 className="fw-bold">Affordable Heathrow & Gatwick & Gatwick Parking Rates</h5>
                <p>
                  Enjoy competitive and transparent pricing with no hidden
                  fees. Greeg Maurice Parking offers outstanding value for
                  Heathrow & Gatwick & Gatwick airport parking.
                </p>
              </div>
            </div>
          </div>

          {/* Booking */}
          <div className="col-12 col-md-6 col-lg-6">
            <div className="feature-step">
              <div className="icon-circle">
                <FaMousePointer />
              </div>
              <div className="ms-3">
                <h5 className="fw-bold">Easy Online Booking</h5>
                <p>
                  Booking is quick and simple. Reserve your parking space online
                  in minutes to guarantee availability and a smooth arrival
                  experience.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ======================
           CSS (UI ONLY)
      ======================= */}
      <style>{`
        .feature-section {
          background: linear-gradient(180deg, #f8fafc, #eef2ff);
        }

        .feature-title {
          color: #062A4F;
          font-size: 34px;
        }

        .feature-step {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          background: #ffffff;
          padding: 26px;
          border-radius: 18px;
          height: 100%;
          box-shadow: 0 15px 35px rgba(15,23,42,0.1);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .feature-step:hover {
          transform: translateY(-4px);
          box-shadow: 0 22px 45px rgba(15,23,42,0.14);
        }

        .icon-circle {
          min-width: 64px;
          min-height: 64px;
          border-radius: 50%;
          background: #062A4F;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 26px;
          box-shadow: 0 10px 24px rgba(2,48,153,0.35);
        }

        .feature-step h5 {
          color: #0f172a;
          margin-bottom: 8px;
          font-size: 18px;
        }

        .feature-step p {
          color: #475569;
          margin-bottom: 0;
          font-size: 15px;
          line-height: 1.7;
          text-align: justify;
        }

        /* TABLET */
        @media (max-width: 992px) {
          .feature-title {
            font-size: 32px;
          }

          .feature-step h5 {
            font-size: 19px;
          }

          .feature-step p {
            font-size: 16px;
            text-align: left;
          }
        }

        /* MOBILE */
        @media (max-width: 576px) {
          .icon-circle {
            min-width: 52px;
            min-height: 52px;
            font-size: 22px;
          }

          .feature-title {
            font-size: 26px;
          }

          .feature-step {
            padding: 22px;
          }

          .feature-step h5 {
            font-size: 18px;
          }

          .feature-step p {
            font-size: 16px;
            line-height: 1.75;
            text-align: left;
          }
        }
      `}</style>
    </section>
  );
}
