export default function CarSteps() {
  return (
    <section className="container-fluid carsteps-section py-5">
      <div className="container py-5">

        {/* HEADER */}
        <div className="text-center mx-auto pb-5" style={{ maxWidth: 900 }}>
          <h2 className="fw-bold mb-3 carsteps-title">
            Gregg <span className="highlight-text">Maurice Parking</span> Made Simple
          </h2>
        </div>

        {/* STEPS */}
        <div className="row g-4 justify-content-center">

          <StepCard number="01" text="Book Your Parking Space. Choose travel dates and secure parking online quickly" />
          <StepCard number="02" text="Arrive & Park Drive to our lot, check in, and leave your car in safe hands" />
          <StepCard number="03" text="Transfer to the Airport Enjoy a direct, comfortable transfer to the terminal." />
          <StepCard number="04" text="Return with Ease When you land, contact us, and we’ll arrange your return transfer." />

        </div>
      </div>

      {/* ======================
           CSS (UI ONLY)
      ======================= */}
      <style>{`
        .carsteps-section {
          background: transparent;
        }

        .carsteps-title {
          font-size: 42px;
          color: #062A4F;
        }

        .highlight-text {
          color: #ffa200;
        }

        .step-card {
          background: #062A4F;
          border-radius: 22px;
          padding: 32px 24px 48px;
          position: relative;
          height: 100%;
          box-shadow: 0 20px 45px rgba(2,48,153,0.35);
          transition: all 0.35s ease;
        }

        .step-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 65px rgba(2,48,153,0.45);
        }

        .step-card h4 {
          color: #ffffff;
          font-weight: 700;
          font-size: 20px;
          margin-bottom: 8px;
        }

        .step-card p {
          color: #e0f2fe;
          font-size: 15px;
          line-height: 1.6;
          margin-bottom: 0;
          word-spacing: normal;
          letter-spacing: normal;
        }

        .step-number {
          width: 78px;
          height: 78px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid #062A4F;
          position: absolute;
          bottom: -32px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 800;
          color: #062A4F;
        }

        /* TABLET */
        @media (max-width: 991px) {
          .carsteps-title {
            font-size: 32px;
          }

          .step-card h4 {
            font-size: 19px;
          }

          .step-card p {
            font-size: 16px;
            line-height: 1.7;
          }
        }

        /* MOBILE */
        @media (max-width: 576px) {
          .carsteps-title {
            font-size: 26px;
          }

          .step-card {
            padding: 28px 22px 44px;
          }

          .step-card h4 {
            font-size: 18px;
          }

          .step-card p {
            font-size: 16px;
            line-height: 1.75;
          }

          .step-number {
            width: 64px;
            height: 64px;
            font-size: 18px;
          }
        }
      `}</style>
    </section>
  );
}

/* STEP CARD COMPONENT */
function StepCard({ number, text }) {
  return (
    <div className="col-12 col-md-6 col-lg-3 d-flex">
      <div className="step-card text-center w-100">
        <p>{text}</p>
        <div className="step-number">{number}</div>
      </div>
    </div>
  );
}
