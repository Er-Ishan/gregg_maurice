import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import html2pdf from "html2pdf.js";
import logo from "../../public/img/greeg-logo.png";
import Footer from "../component/Footer";
import Copyright from "../component/Copyright";
import NavbarElement from "../component/NavbarElement";
import Topbar from "./Topbar";

const API = import.meta.env.VITE_API_URL;


const ReceiptPage = () => {
  const location = useLocation();
  const bookingData = location.state?.bookingData || null;
  const addons = bookingData?.addons || {};
  const addonsTotal = bookingData?.addons_total || 0;
  const [isEmailing, setIsEmailing] = React.useState(false);

  const receiptRef = useRef();

  const formatDate = (dateInput) => {
    const date = new Date(dateInput);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const currentTransactionDate = formatDate(new Date());

  const downloadPDF = () => {
    const element = receiptRef.current;

    const options = {
      margin: 0.3,
      filename: `receipt_${bookingData.booking_id}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };


  const emailPDF = async () => {
    try {
      setIsEmailing(true); // start loading

      const pdfBase64 = await generatePDFBase64();

      const res = await fetch(`${API}/api/email-receipt-pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          booking_id: bookingData.booking_id,
          email: bookingData.email,
          first_name: bookingData.first_name,
          receipt_pdf: pdfBase64
        })
      });

      const data = await res.json();

      if (data.success) {
        alert("Receipt emailed successfully!");
      } else {
        alert("Failed to email receipt");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while emailing receipt");
    } finally {
      setIsEmailing(false); // stop loading
    }
  };



  const generatePDFBase64 = async () => {
    const element = receiptRef.current;

    const options = {
      margin: 0.3,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    const pdf = await html2pdf()
      .set(options)
      .from(element)
      .outputPdf("datauristring");

    return pdf.split(",")[1]; // remove data prefix
  };

  const saveReceiptToDB = async () => {
    try {
      console.log("Saving receipt for booking:", bookingData.booking_id);

      const pdfBase64 = await generatePDFBase64();
      console.log("PDF Base64 length:", pdfBase64.length);

      const res = await fetch(`${API}/api/save-receipt-pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          booking_id: bookingData.booking_id,
          receipt_pdf: pdfBase64,
        }),
      });

      const data = await res.json();
      console.log("Save receipt response:", data);
    } catch (err) {
      console.error("Receipt save failed", err);
    }
  };


  useEffect(() => {
    if (!bookingData?.booking_id) return;

    const timer = setTimeout(() => {
      saveReceiptToDB();
    }, 1000); // wait 1 second for DOM render

    return () => clearTimeout(timer);
  }, [bookingData]);



  if (!bookingData) return <h2>No Receipt Data</h2>;

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
      <NavbarElement></NavbarElement>


      {/* RECEIPT */}
      <div
        ref={receiptRef}
        style={{
          maxWidth: "900px",
          padding: "24px",
          margin: "20px auto",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "space-between",
            marginBottom: "30px",
          }}
        >
          {/* Company */}
          <div style={{ flex: "1 1 250px" }}>
            <img src={logo} alt="Logo" style={{ width: "200px" }} />
            <h2 style={{ margin: "10px 0" }}>Gregg Maurice Parking</h2>
            <p style={{ fontSize: "14px", lineHeight: "20px" }}>
              684 West College St. Sun City, USA<br />
              012 345 67890 | support@greggmaurice.co.uk
            </p>
          </div>

          {/* Receipt Info */}
          <div
            style={{
              flex: "1 1 260px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                backgroundColor: "#6dbb2c",
                padding: "12px",
                color: "#fff",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Receipt #{bookingData.booking_id}
            </div>

            <div style={{ padding: "12px", fontSize: "14px" }}>
              <p>
                <strong>Transaction Date:</strong><br />
                {currentTransactionDate}
              </p>

              <p>
                <strong>Transaction ID:</strong><br />
                <span
                  style={{
                    wordBreak: "break-all",
                    fontFamily: "monospace",
                    fontSize: "13px",
                  }}
                >
                  {bookingData.transaction_id}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* CUSTOMER */}
        <div style={{ marginBottom: "24px" }}>
          <h3>Bill To</h3>
          <p style={{ fontSize: "14px" }}>
            <strong>
              {bookingData.first_name} {bookingData.last_name}
            </strong><br />
            {bookingData.email}<br />
            {bookingData.mobile}<br />
            {bookingData.vehicle_make || "-"}{" "}
            {bookingData.vehicle_registration || "-"}
          </p>
        </div>

        {/* BOOKING DETAILS */}
        <div style={{ marginBottom: "24px" }}>
          <h3>Booking Details</h3>
          <table style={{ width: "280px", fontSize: "15px" }}>
            <tbody>

              {/* SUBTOTAL */}
              <tr>
                <td>Subtotal</td>
                <td style={{ textAlign: "right" }}>
                  £{Number(bookingData.quote_amount).toFixed(2)}
                </td>
              </tr>

              {/* DISCOUNT (ONLY IF APPLIED) */}
              {Number(bookingData.discount) > 0 && (
                <tr style={{ color: "#28a745" }}>
                  <td>Discount</td>
                  <td style={{ textAlign: "right" }}>
                    -£{Number(bookingData.discount).toFixed(2)}
                  </td>
                </tr>
              )}

              {/* BOOKING FEE (ONLY IF EXISTS) */}
              {Number(bookingData.booking_fee) > 0 && (
                <tr>
                  <td>Booking Fee</td>
                  <td style={{ textAlign: "right" }}>
                    £{Number(bookingData.booking_fee).toFixed(2)}
                  </td>
                </tr>
              )}

              {/* ADD-ONS */}
              {addons.cancellation_cover && (
                <tr>
                  <td>Cancellation Cover</td>
                  <td style={{ textAlign: "right" }}>£1.49</td>
                </tr>
              )}

              {addons.sms_confirmation && (
                <tr>
                  <td>SMS Confirmation</td>
                  <td style={{ textAlign: "right" }}>£0.75</td>
                </tr>
              )}

              {/* ADD-ONS TOTAL */}
              {/* {addonsTotal > 0 && (
                <tr>
                  <td>Add-ons Total</td>
                  <td style={{ textAlign: "right" }}>
                    £{Number(addonsTotal).toFixed(2)}
                  </td>
                </tr>
              )}
 */}

              {/* TOTAL */}
              <tr style={{ fontWeight: "bold", borderTop: "1px solid #ddd" }}>
                <td>Total Paid</td>
                <td style={{ textAlign: "right" }}>
                  £{Number(bookingData.total_payable).toFixed(2)}
                </td>
              </tr>

            </tbody>
          </table>

        </div>

        {/* SERVICE TABLE */}
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#6dbb2c", color: "#fff" }}>
                <th style={{ padding: "10px" }}>Service</th>
                <th style={{ padding: "10px" }}>Drop-off</th>
                <th style={{ padding: "10px" }}>Return</th>
                <th style={{ padding: "10px" }}>Days</th>
                <th style={{ padding: "10px" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "10px" }}>{bookingData.product_name}</td>
                <td style={{ padding: "10px" }}>{formatDate(bookingData.drop_off_date)}</td>
                <td style={{ padding: "10px" }}>{formatDate(bookingData.return_date)}</td>
                <td style={{ padding: "10px", textAlign: "center" }}>{bookingData.no_of_days}</td>
                <td style={{ padding: "10px", fontWeight: "bold" }}>
                  £{bookingData.total_payable}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* PAYMENT SUMMARY */}
        <div style={{ marginTop: "30px", display: "flex", justifyContent: "flex-end" }}>
          <table style={{ width: "280px", fontSize: "15px" }}>
            <tbody>
              <tr><td>Subtotal</td><td style={{ textAlign: "right" }}>£{bookingData.total_payable}</td></tr>
              <tr><td>Discount</td><td style={{ textAlign: "right" }}>£{bookingData.discount || "0.00"}</td></tr>
              <tr style={{ fontWeight: "bold" }}>
                <td>Total</td>
                <td style={{ textAlign: "right" }}>£{bookingData.total_payable}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ marginTop: "40px", fontSize: "14px" }}>
          Thank you for your business!
        </p>
      </div>

      {/* ACTION BUTTONS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          margin: "30px 0",
          flexWrap: "wrap" // keeps it responsive on mobile
        }}
      >
        <button
          onClick={downloadPDF}
          style={{
            background: "#062A4F",
            color: "#fff",
            padding: "12px 30px",
            borderRadius: "30px",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Download Receipt (PDF)
        </button>

        <button
          onClick={emailPDF}
          disabled={isEmailing}
          style={{
            background: "#062A4F",
            color: "#fff",
            padding: "12px 30px",
            borderRadius: "30px",
            border: "none",
            fontWeight: "bold",
            cursor: isEmailing ? "not-allowed" : "pointer",
          }}
        >
          {isEmailing ? "Sending..." : "Email Receipt (PDF)"}
        </button>

      </div>


      <Footer></Footer>
      <Copyright></Copyright>
    </>
  );
};

export default ReceiptPage;
