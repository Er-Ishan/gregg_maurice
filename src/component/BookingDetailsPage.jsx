import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import html2pdf from "html2pdf.js";
import Topbar from "./Topbar";
import NavbarElement from "../component/NavbarElement";
import Footer from "../component/Footer";
import Copyright from "../component/Copyright";
import logo from "../../src/assets/greeg-logo.png";

const API = import.meta.env.VITE_API_URL;

const BookingDetailsPage = () => {
    const location = useLocation();
    const [sending, setSending] = React.useState(false);
    const bookingData = location.state?.bookingData || null;
    const addons = bookingData?.addons || {};
    const receiptRef = useRef();

    const formatDate = (dateInput) => {
        if (!dateInput) return "-";
        return new Date(dateInput).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };



    const currentTransactionDate = formatDate(new Date());

    /* ==========================
        DOWNLOAD PDF
    ========================== */
    const downloadPDF = () => {
        const element = receiptRef.current;

        html2pdf()
            .set({
                margin: 0.4,
                filename: `Booking_${bookingData.booking_id}.pdf`,
                image: { type: "jpeg", quality: 1 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
            })
            .from(element)
            .save();
    };

    /* ==========================
        SAVE PDF TO DB
    ========================== */
    const generatePDFBase64 = async () => {
        const pdf = await html2pdf()
            .set({
                margin: 0.4,
                image: { type: "jpeg", quality: 1 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
            })
            .from(receiptRef.current)
            .outputPdf("datauristring");

        return pdf.split(",")[1];
    };

    const saveReceiptToDB = async () => {
        try {
            const pdfBase64 = await generatePDFBase64();

            await fetch(`${API}/api/save-receipt-pdf`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    booking_id: bookingData.booking_id,
                    receipt_pdf: pdfBase64,
                }),
            });
        } catch (err) {
            console.error("Receipt save failed", err);
        }
    };

    useEffect(() => {
        if (!bookingData?.booking_id) return;
        const timer = setTimeout(saveReceiptToDB, 1000);
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
            <NavbarElement />

            {/* ================= RECEIPT ================= */}
            <div
                ref={receiptRef}
                style={{
                    maxWidth: "900px",
                    margin: "20px auto",
                    background: "#fff",
                    border: "1px solid #000",
                    padding: "20px",
                    fontFamily: "Arial, sans-serif",
                }}
            >
                {/* HEADER */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                    <div style={{ flex: "1 1 260px" }}>
                        <img src={logo} alt="Logo" style={{ width: "200px" }} />
                        <p style={{ fontSize: "12px", marginTop: "6px" }}>
                            Gregg Maurice Parking<br />
                            Gregg Maurice Parking Services
                        </p>
                    </div>

                    <div
                        style={{
                            flex: "1 1 200px",
                            textAlign: "right",
                        }}
                    >
                        <h3 style={{ marginBottom: "6px" }}>BOOKING DETAILS</h3>
                        <p style={{ fontSize: "12px" }}>
                            Date: {currentTransactionDate}
                        </p>
                    </div>
                </div>

                {/* RESPONSIVE TABLE WRAPPER */}
                <div style={{ overflowX: "auto", marginTop: "20px" }}>
                    {/* CLIENT DETAILS */}

                    <table width="100%" border="1" cellPadding="6" style={{ borderCollapse: "collapse", fontSize: "13px" }}>
                        <tbody>
                            <tr style={{ background: "#eee", fontWeight: "bold" }}>
                                <td colSpan="5">CUSTOMER DETAILS</td>
                            </tr>
                            <tr style={{ fontWeight: "bold" }}>
                                <td className="text-center">Title</td>
                                <td className="text-center">First Name</td>
                                <td className="text-center">Last Name</td>
                                <td className="text-center">Email</td>
                                <td className="text-center">Mobile</td>
                            </tr>
                            <tr>
                                <td className="text-center">{bookingData.title}</td>
                                <td className="text-center">{bookingData.first_name}</td>
                                <td className="text-center">{bookingData.last_name}</td>
                                <td className="text-center">{bookingData.email}</td>
                                <td className="text-center">{bookingData.mobile}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* RESPONSIVE TABLE WRAPPER */}
                <div style={{ overflowX: "auto", marginTop: "20px" }}>
                    {/* CLIENT DETAILS */}

                    <table width="100%" border="1" cellPadding="6" style={{ borderCollapse: "collapse", fontSize: "13px" }}>
                        <tbody>
                            <tr style={{ background: "#eee", fontWeight: "bold" }}>
                                <td colSpan="5">VEHICLE DETAILS</td>
                            </tr>
                            <tr style={{ fontWeight: "bold" }}>
                                <td className="text-center">Reg.No.</td>
                                <td className="text-center">Make</td>
                                <td className="text-center">Model</td>
                                <td className="text-center">Color</td>
                                <td className="text-center">Passengers</td>
                            </tr>
                            <tr>
                                <td className="text-center">{bookingData.vehicle_registration}</td>
                                <td className="text-center">{bookingData.vehicle_make}</td>
                                <td className="text-center">{bookingData.vehicle_model}</td>
                                <td className="text-center">{bookingData.vehicle_colour}</td>
                                <td className="text-center">{bookingData.passengers}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>



                <div style={{ overflowX: "auto", marginTop: "20px" }}>
                    {/* PAYMENT SUMMARY */}
                    <table width="100%" border="1" cellPadding="6" style={{ borderCollapse: "collapse", fontSize: "13px" }}>
                        <tbody>
                            <tr style={{ background: "#eee", fontWeight: "bold" }}>
                                <td colSpan="2">FLIGHT DETAILS</td>
                            </tr>
                            <tr>
                                <td>Depart Flight</td>
                                <td align="right">{bookingData.depart_flight}</td>
                            </tr>

                            <tr>
                                <td>Depart Terminal</td>
                                <td align="right">{bookingData.depart_terminal}</td>
                            </tr>

                            <tr>
                                <td>Return Flight</td>
                                <td align="right">{bookingData.return_flight}</td>
                            </tr>

                            <tr>
                                <td>Return Terminal</td>
                                <td align="right">{bookingData.return_terminal}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div style={{ overflowX: "auto", marginTop: "20px" }}>
                    {/* PAYMENT SUMMARY */}
                    <table width="100%" border="1" cellPadding="6" style={{ borderCollapse: "collapse", fontSize: "13px" }}>
                        <tbody>
                            <tr style={{ background: "#eee", fontWeight: "bold" }}>
                                <td colSpan="2">BOOKING DETAILS</td>
                            </tr>


                            <tr>
                                <td>Travelling From</td>
                                <td align="right">{bookingData.travelling_from}</td>
                            </tr>

                            {/* <tr>
                <td>Serice Provider</td>
                <td align="right">{bookingData.service_provider}</td>
              </tr> */}

                            <tr>
                                <td>Service</td>
                                <td align="right">{bookingData.service}</td>
                            </tr>

                            <tr>
                                <td>Drop Off Date</td>
                                <td align="right">{formatDate(bookingData.drop_off_date)}</td>
                            </tr>

                            <tr>
                                <td>Return Date</td>
                                <td align="right">{formatDate(bookingData.return_date)}</td>
                            </tr>

                            <tr>
                                <td>Days</td>
                                <td align="right">{bookingData.no_of_days}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* <div style={{ overflowX: "auto", marginTop: "20px" }}>
                    <table width="100%" border="1" cellPadding="6" style={{ borderCollapse: "collapse", fontSize: "13px" }}>
                        <tbody>
                            <tr style={{ background: "#eee", fontWeight: "bold" }}>
                                <td colSpan="2">PAYMENT SUMMARY</td>
                            </tr>
                            <tr>
                                <td>Subtotal</td>
                                <td align="right">£{Number(bookingData.quote_amount).toFixed(2)}</td>
                            </tr>

                            {Number(bookingData.discount) > 0 && (
                                <tr>
                                    <td>Discount</td>
                                    <td align="right">-£{Number(bookingData.discount).toFixed(2)}</td>
                                </tr>
                            )}

                            {Number(bookingData.booking_fee) > 0 && (
                                <tr>
                                    <td>Booking Fee</td>
                                    <td align="right">£{Number(bookingData.booking_fee).toFixed(2)}</td>
                                </tr>
                            )}

                            {addons.cancellation_cover && (
                                <tr>
                                    <td>Cancellation Cover</td>
                                    <td align="right">£1.49</td>
                                </tr>
                            )}

                            {addons.sms_confirmation && (
                                <tr>
                                    <td>SMS Confirmation</td>
                                    <td align="right">£0.75</td>
                                </tr>
                            )}

                            <tr style={{ fontWeight: "bold" }}>
                                <td>Total Paid</td>
                                <td align="right">£{Number(bookingData.total_payable).toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div> */}



                <p style={{ marginTop: "30px", fontSize: "12px", textAlign: "center" }}>
                    Thank you for your booking. Please keep this document for your records.
                </p>
            </div>

            {/* DOWNLOAD BUTTON */}
            {/* ACTION BUTTONS */}
            <div
                style={{
                    textAlign: "center",
                    marginBottom: "40px",
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                }}
            >
                {/* Download PDF */}
                <button
                    onClick={downloadPDF}
                    style={{
                        background: "#062A4F",
                        color: "#fff",
                        padding: "12px 34px",
                        borderRadius: "30px",
                        border: "none",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}
                >
                    Download Booking PDF
                </button>

                {/* Email PDF */}
                <button
                    onClick={async () => {
                        setSending(true);
                        try {
                            const pdfBase64 = await generatePDFBase64();
                            const res = await fetch(`${API}/api/email-booking`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    booking_id: bookingData.booking_id,
                                    email: bookingData.email,
                                    first_name: bookingData.first_name,
                                    receipt_pdf: pdfBase64,
                                }),
                            });
                            const data = await res.json();
                            if (res.ok) alert("Email sent successfully!");
                            else alert("Email failed: " + data.message);
                        } catch (err) {
                            console.error(err);
                            alert("Something went wrong while emailing the receipt");
                        }
                        setSending(false);
                    }}
                    style={{
                        background: "#28a745",
                        color: "#fff",
                        padding: "12px 34px",
                        borderRadius: "30px",
                        border: "none",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}
                >
                    {sending ? "Sending..." : "Email Booking PDF"}
                </button>
            </div>


            <Footer />
            <Copyright />
        </>
    );
};

export default BookingDetailsPage;
