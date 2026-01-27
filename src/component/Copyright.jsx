export default function Copyright() {
  return (
    <div className="copyright-section">
      <div className="container py-3">
        <div className="row">
          <div className="col text-center">
            <p className="m-0 copyright-text">
              © 2025 Gregg Maurice Parking. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* ======================
           CSS (UI ONLY)
      ======================= */}
      <style>{`
        .copyright-section {
          background: #062A4F;
          border-top: 1px solid rgba(255,255,255,0.15);
        }

        .copyright-text {
          color: #e0f2fe;
          font-size: 15px;
          line-height: 1.6;
        }

        /* TABLET */
        @media (max-width: 992px) {
          .copyright-text {
            font-size: 15px;
          }
        }

        /* MOBILE */
        @media (max-width: 576px) {
          .copyright-text {
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
}
