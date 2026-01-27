import {
  FaCarSide,
  FaShuttleVan,
  FaHandshake,
  FaIdCard,
  FaBars,
  FaUndo,
  FaBroom,
  FaHeart,
} from "react-icons/fa";

export default function Categories() {
  return (
    <section className="container-fluid categories-section py-5">
      <div className="container py-5 text-center">

        {/* TITLE */}
        <h1 className="fw-bold mb-2 categories-title">
          Best Value Parking Deals
        </h1>
        <p className="categories-subtitle mb-5">
          Enjoy affordable and secure airport parking options tailored for every
          traveler.
          <br />
          Get the best prices without compromising on convenience or safety.
        </p>

        {/* CARDS */}
        <div className="row justify-content-center g-4">

          <CategoryCard
            image="img/car-1.png"
            tag="Best for Holidays"
            title="Park & Ride"
            items={[
              [<FaCarSide />, "Terminal drop-off"],
              [<FaShuttleVan />, "On-Demand Shuttle"],
              [<FaHandshake />, "Friendly & Experienced Staff"],
              [<FaHeart />, "Ideal for long-term parking"],
            ]}
          />

          <CategoryCard
            image="img/car-2.png"
            tag="Parking Favorite"
            title="Park and Clean"
            items={[
              [<FaIdCard />, "Insured Driver"],
              [<FaBars />, "Park & Ride All Options"],
              [<FaCarSide />, "We Clean Your Car & Deliver"],
              [<FaHeart />, "Holiday Makers Favourite Parking"],
            ]}
          />

          <CategoryCard
            image="img/car-3.png"
            tag="Keep Your Keys"
            title="Self Park"
            items={[
              [<FaUndo />, "Free cancellations"],
              [<FaBars />, "Park & Keep Your Car Keys"],
              [<FaBars />, "Park & Ride All Options Included"],
              [<FaBroom />, "Park & Clean All Options Included"],
            ]}
          />

        </div>
      </div>

      {/* ======================
           CSS (UI ONLY)
      ======================= */}
      <style>{`
        .categories-section {
          background: linear-gradient(180deg, #f8fafc, #eef2ff);
        }

        .categories-title {
          color: #3a1672;
          font-size: 38px;
        }

        .categories-subtitle {
          color: #475569;
          font-size: 16px;
          line-height: 1.7;
        }

        .category-card {
          background: #ffffff;
          border-radius: 26px;
          box-shadow: 0 25px 50px rgba(15,23,42,0.12);
          transition: all 0.35s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
          max-width: 380px;
        }

        .category-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 35px 70px rgba(15,23,42,0.18);
        }

        .category-image {
          height: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 26px 26px 0 0;
        }

        .category-image img {
          max-height: 90px;
          max-width: 80%;
        }

        .category-body {
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .category-tag {
          color: #3a1672;
          font-weight: 600;
          font-size: 14px;
        }

        .category-title {
          color: #0f172a;
          font-weight: 700;
          margin-bottom: 20px;
          font-size: 20px;
        }

        .category-feature {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 500;
          color: #475569;
          padding-bottom: 10px;
          margin-bottom: 10px;
          border-bottom: 1px solid #e5e7eb;
          font-size: 15px;
        }

        .category-feature svg {
          color: #3a1672;
          min-width: 18px;
        }

        .category-button {
          margin-top: auto;
          background: #3a1672;
          color: #ffffff;
          border: none;
          font-weight: 600;
          border-radius: 999px;
          padding: 12px 0;
          transition: all 0.3s ease;
          font-size: 15px;
        }

        .category-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 12px 30px rgba(37,99,235,0.45);
        }

        /* TABLET */
        @media (max-width: 992px) {
          .categories-title {
            font-size: 32px;
          }

          .categories-subtitle {
            font-size: 15px;
          }
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .categories-title {
            font-size: 26px;
          }

          .category-card {
            margin: 0 auto;
          }

          .category-body {
            padding: 24px 20px;
          }

          .category-title {
            font-size: 19px;
          }

          .category-feature {
            font-size: 15px;
          }

          .category-button {
            font-size: 15px;
          }
        }
      `}</style>
    </section>
  );
}

function CategoryCard({ image, tag, title, items }) {
  return (
    <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
      <div className="category-card w-100">

        {/* IMAGE */}
        <div className="category-image">
          <img src={image} alt={title} className="img-fluid" />
        </div>

        {/* BODY */}
        <div className="category-body">
          <h6 className="category-tag">{tag}</h6>
          <h5 className="category-title">{title}</h5>

          <div className="text-start">
            {items.map(([icon, label], i) => (
              <div key={i} className="category-feature">
                {icon}
                <span>{label}</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="category-button w-100 mt-3"
            onClick={() => {
              document.getElementById("hero")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
