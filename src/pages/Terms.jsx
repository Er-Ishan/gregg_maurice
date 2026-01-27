import React, { useEffect, useState } from "react";
import Topbar from "../component/Topbar";
import NavbarElement from "../component/NavbarElement";
import Footer from "../component/Footer";
import Copyright from "../component/Copyright";

const Terms = () => {
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
          <div className="policy-wrapper mx-auto p-4 p-md-5">

            <h2 className="fw-bold mb-4 policy-title">
              Terms &amp; Conditions
            </h2>

            <p className="policy-intro">
              PLEASE ENSURE THAT YOU HAVE READ THE TERMS &amp; CONDITIONS ON OUR WEBSITE
              <strong> www.terminalparking.co.uk</strong>
            </p>

            {/* =======================
                SECTION 1
            ======================== */}
            <div className="policy-block">
              <h4>1. Bookings and Service</h4>

              <p><strong>1.1</strong> Bookings are confirmed once a final confirmation email is sent. All terms are deemed accepted at confirmation.</p>
              <p><strong>1.2</strong> We do not accept responsibility for delays caused by traffic, delayed flights, weather, immigration, or circumstances beyond our control.</p>
              <p><strong>1.3</strong> Where third-party providers are used, their own terms apply. We act only as an intermediary.</p>
            </div>

            {/* =======================
                SECTION 2
            ======================== */}
            <div className="policy-block">
              <h4>2. Payment</h4>

              <p><strong>2.1</strong> Extended stays are charged at £20 per additional day.</p>
              <p><strong>2.2</strong> Full payment must be completed before service begins.</p>
              <p><strong>2.3</strong> Returns after midnight incur a £40 charge.</p>
              <p><strong>2.4</strong> Late arrivals without 2 hours notice may incur short stay charges plus a £15 fee.</p>
              <p><strong>2.5</strong> Failure to arrive on time may require assigning a new driver.</p>
            </div>

            {/* =======================
                SECTION 3
            ======================== */}
            <div className="policy-block">
              <h4>3. Cancellations and Curtailment</h4>

              <p><strong>3.1</strong> Flexible bookings may be cancelled up to 48 hours prior (less £15 admin fee).</p>
              <p><strong>3.2</strong> No refunds within 48 hours of travel.</p>
              <p><strong>3.3</strong> Curtailment does not reduce fees.</p>
              <p><strong>3.4</strong> Amendments within 24 hours incur £10 per change.</p>
              <p><strong>3.5</strong> Supersaver and non-flexible bookings cannot be cancelled.</p>
            </div>

            {/* =======================
                SECTION 4
            ======================== */}
            <div className="policy-block">
              <h4>4. Liabilities and Other Terms</h4>

              <p><strong>4.1</strong> Third-party services must handle their own claims.</p>
              <p><strong>4.2</strong> Our insurance covers only legal liabilities.</p>
              <p><strong>4.3</strong> Vehicles and contents are left at owner’s risk.</p>
              <p><strong>4.4</strong> Damage must be reported immediately with photographic evidence.</p>
              <p><strong>4.5</strong> Minor damages and post-rain/car wash marks are not accepted.</p>
              <p><strong>4.6</strong> We accept no liability for mechanical or electrical failures.</p>
              <p><strong>4.7</strong> Vehicles must be roadworthy, insured, taxed, and MOT compliant.</p>
              <p><strong>4.8</strong> No liability for faulty keys or alarm fobs.</p>
              <p><strong>4.9</strong> Tyre punctures are chargeable.</p>
              <p><strong>4.10</strong> Flat batteries may incur service charges.</p>
              <p><strong>4.11</strong> Vehicles may be stored in secondary compounds.</p>
              <p><strong>4.12</strong> Repairs must be carried out by approved providers only.</p>
              <p><strong>4.13</strong> Dash cams may be disconnected.</p>
              <p><strong>4.14</strong> EV vehicles must have a minimum 25 miles charge.</p>
              <p><strong>4.15 – 4.20</strong> EV charging limitations and liabilities apply.</p>
              <p><strong>4.21</strong> Customers should photograph mileage and fuel levels.</p>
            </div>

            {/* =======================
                SECTION 5
            ======================== */}
            <div className="policy-block">
              <h4>5. Exclusion and Limits of Responsibility</h4>

              <p><strong>5.1</strong> Vehicles parked personally are at owner’s risk.</p>
              <p><strong>5.2</strong> No cover for theft, fire, flood, or malicious damage.</p>
              <p><strong>5.3</strong> No liability for indirect or consequential losses.</p>
              <p><strong>5.4</strong> Maximum liability is £20,000.</p>
              <p><strong>5.5</strong> Vehicle return times are subject to traffic conditions.</p>
              <p><strong>5.6</strong> No liability for missed flights.</p>
              <p><strong>5.7</strong> Paintwork issues post-wash are excluded.</p>
              <p><strong>5.8</strong> Roof luggage boxes may be refused.</p>
              <p><strong>5.9</strong> Interior condition is not checked.</p>
              <p><strong>5.10</strong> Claims under £750 may not be accepted.</p>
              <p><strong>5.11 – 5.15</strong> EV, ULEZ, and third-party exclusions apply.</p>
            </div>

            {/* =======================
                SECTION 6
            ======================== */}
            <div className="policy-block">
              <h4>6. Customer Relations & Changes</h4>

              <p>All issues must be raised in writing. Responses are provided within 7 working days.</p>
              <p>Terms may only be changed in writing by Terminals Parking.</p>
            </div>

          </div>
        </div>

        {/* ======================
            STYLES
        ======================= */}
        <style>{`
          .policy-section {
            background: linear-gradient(180deg, #f8fafc, #eef2ff);
          }

          .policy-wrapper {
            background: #fff;
            border-radius: 24px;
            max-width: 1100px;
            box-shadow: 0 30px 60px rgba(15,23,42,0.12);
          }

          .policy-title {
            font-size: 36px;
            color: #0f172a;
          }

          .policy-intro {
            font-size: 16px;
            color: #334155;
            margin-bottom: 30px;
          }

          .policy-block {
            background: #f8fafc;
            border-left: 6px solid #ffa200;
            border-radius: 16px;
            padding: 22px 24px;
            margin-bottom: 22px;
          }

          .policy-block h4 {
            font-size: 20px;
            margin-bottom: 12px;
            color: #0f172a;
          }

          .policy-block p {
            font-size: 15px;
            color: #475569;
            line-height: 1.7;
            margin-bottom: 6px;
          }

          /* Tablet */
          @media (max-width: 992px) {
            .policy-title {
              font-size: 30px;
            }
          }

          /* Mobile */
          @media (max-width: 768px) {
            .policy-title {
              font-size: 26px;
            }

            .policy-wrapper {
              padding: 22px !important;
            }

            .policy-block {
              padding: 18px 20px;
            }

            .policy-block h4 {
              font-size: 18px;
            }

            .policy-block p {
              font-size: 15px;
            }
          }
        `}</style>
      </section>

      <Footer />
      <Copyright />
    </>
  );
};

export default Terms;
