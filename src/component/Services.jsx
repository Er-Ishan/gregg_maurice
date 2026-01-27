import {
  FaSmileBeam,
  FaUserShield,
  FaShieldAlt,
  FaPlaneDeparture,
} from "react-icons/fa";

export default function Services() {
  return (
    <section className="container-fluid services-section py-5">
      <div className="container py-5">

        {/* TITLE */}
        <div className="text-center mx-auto pb-5" style={{ maxWidth: 820 }}>
          <h2 className="services-title mb-3 fw-bold">
            Be One of Our Happy Customers
          </h2>
        </div>

        {/* GRID */}
        <div className="row g-5">

          <ServiceBox
            icon={<FaShieldAlt />}
            title="Safe, Professional & Customer-Focused"
            text="Customer satisfaction comes first. Our professional team ensures your journey starts and ends smoothly for a reliable parking experience."
          />

          <ServiceBox
            icon={<FaSmileBeam />}
            title="Book with Confidence"
            text="For cheap, secure Heathrow parking with transfers, choose Greeg Maurice Parking. Book ahead and travel knowing your car is safe."
          />

          <ServiceBox
            icon={<FaUserShield />}
            title="Trusted by Thousands of Travellers"
            text="With thousands of satisfied customers and genuine reviews, you can book with confidence knowing your vehicle is parked safely and professionally managed."
          />

          {/* NEW AIRPORT SERVICE */}
          {/* <ServiceBox
            icon={<FaPlaneDeparture />}
            title="Minutes from Heathrow Airport"
            text="Our car park is conveniently located close to Heathrow Airport, with fast and reliable transfers ensuring you reach your terminal quickly and stress-free."
          /> */}

        </div>

      </div>

      {/* ======================
           CSS (UI ONLY)
      ======================= */}
      <style>{`
        .services-section {
          background: linear-gradient(180deg, #f8fafc, #eef2ff);
        }

        .services-title {
          color: #062A4F;
          font-size: 36px;
        }

        .service-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 36px 28px;
          box-shadow: 0 20px 45px rgba(2,48,153,0.12);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 30px 60px rgba(2,48,153,0.18);
        }

        .service-icon {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          background: #062A4F;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 38px;
          margin: 0 auto 20px;
          box-shadow: 0 10px 30px rgba(2,48,153,0.35);
        }

        .service-card h5 {
          color: #0f172a;
          font-weight: 700;
          margin-bottom: 12px;
          font-size: 18px;
        }

        .service-card p {
          color: #475569;
          font-size: 15px;
          margin-bottom: 0;
          margin-top: auto;
          text-align: center;
          line-height: 1.65;
        }

        /* TABLET */
        @media (max-width: 992px) {
          .services-title {
            font-size: 32px;
          }

          .service-card h5 {
            font-size: 19px;
          }

          .service-card p {
            font-size: 16px;
            line-height: 1.7;
          }
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .services-title {
            font-size: 26px;
          }

          .service-card {
            padding: 28px 22px;
          }

          .service-icon {
            width: 72px;
            height: 72px;
            font-size: 32px;
          }

          .service-card h5 {
            font-size: 18px;
          }

          .service-card p {
            font-size: 16px;
            line-height: 1.75;
          }
        }
      `}</style>
    </section>
  );
}

function ServiceBox({ icon, title, text }) {
  return (
    <div className="col-12 col-md-6 col-lg-4 d-flex">
      <div className="service-card text-center w-100">
        <div className="service-icon">{icon}</div>
        <h5>{title}</h5>
        <p>{text}</p>
      </div>
    </div>
  );
}
