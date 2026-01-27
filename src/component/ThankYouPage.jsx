import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../component/Footer";
import Copyright from "../component/Copyright";
import NavbarElement from "../component/NavbarElement";
import Topbar from "./Topbar";



// FORMAT: 12 Dec 2025, 09:54
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const ThankYouPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const bookingData = location.state?.bookingData || null;
    const addons = bookingData?.addons || {};
    const addonsTotal = bookingData?.addons_total || 0;


    // Generate current transaction date
    const transactionDate = formatDate(new Date());


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

            <div className="container my-5">
                <div
                    className="card border-2 p-5 mx-auto text-center"
                    style={{ maxWidth: "1000px", borderRadius: "18px" }}
                >
                    {/* Success Icon */}
                    <div className="d-flex justify-content-center mb-3">
                        <div
                            style={{
                                width: "80px",
                                height: "80px",
                                borderRadius: "50%",
                                backgroundColor: "#28a7451a",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <span style={{ fontSize: "42px", color: "#28a745" }}>✔</span>
                        </div>
                    </div>

                    <h2 className="text-success fw-bold">Payment Successful!</h2>
                    <p className="text-muted">
                        Thank you for your booking — your reservation has been confirmed.
                    </p>

                    <div className="d-flex flex-column align-items-center gap-3 mt-2">

                        {/* Transaction ID */}
                        <p
                            className="fw-bold"
                            style={{
                                color: "#062A4F",
                                wordBreak: "break-all",
                                background: "#f5f2ff",
                                padding: "10px 14px",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontFamily: "monospace",
                                display: "inline-block",
                                maxWidth: "100%"
                            }}
                        >
                            {bookingData.transaction_id}
                        </p>

                        {/* ACTION BUTTONS */}
                        <div className="d-flex gap-3 flex-wrap justify-content-center">

                            {/* View Receipt */}
                            <button
                                className="btn fw-semibold text-white px-4 py-2"
                                style={{ background: "#062A4F" }}

                                onClick={() =>
                                    navigate("/receipt", {
                                        state: { bookingData },
                                    })
                                }
                            >
                                View Receipt
                            </button>

                            {/* Booking Details */}
                            <button
                                className="btn text-white fw-semibold px-4 py-2"
                                style={{ background: "#062A4F" }}
                                onClick={() =>
                                    navigate("/booking-details", {
                                        state: { bookingData },
                                    })
                                }
                            >
                                Booking Details
                            </button>

                        </div>
                    </div>



                    {bookingData && (
                        <>
                            {/* TWO SECTIONS SIDE BY SIDE */}
                            <div className="row mt-4 text-start g-4">

                                {/* LEFT COLUMN — Booking Information */}
                                <div className="col-lg-6 col-md-12">
                                    <h5 className="fw-bold pb-2 border-bottom mb-3">
                                        Booking Information
                                    </h5>

                                    <table className="table table-borderless mb-4">
                                        <tbody>
                                            {/* <tr>
                                                <td>Booking ID</td>
                                                <td className="fw-bold">{bookingData.booking_id}</td>
                                            </tr> */}

                                            {/* <tr>
                                                <td>ID</td>
                                                <td className="fw-bold">{bookingData.transaction_id}</td>
                                            </tr> */}

                                            {/* ✅ ADDED CURRENT TRANSACTION DATE */}
                                            <tr>
                                                <td>Transaction Date</td>
                                                <td className="fw-bold">{transactionDate}</td>
                                            </tr>

                                            <tr>
                                                <td>Product</td>
                                                <td>{bookingData.product_name}</td>
                                            </tr>

                                            <tr>
                                                <td>Drop-off Date</td>
                                                <td>{bookingData.drop_off_date}</td>
                                            </tr>

                                            <tr>
                                                <td>Return Date</td>
                                                <td>{bookingData.return_date}</td>
                                            </tr>

                                            <tr>
                                                <td>Number of Days</td>
                                                <td>{bookingData.no_of_days}</td>
                                            </tr>

                                            {/* QUOTE AMOUNT */}
                                            <tr>
                                                <td>Quote Amount</td>
                                                <td>
                                                    £{Number(bookingData.quote_amount).toFixed(2)}
                                                </td>
                                            </tr>

                                            {/* DISCOUNT (only if applied) */}
                                            {Number(bookingData.discount) > 0 && (
                                                <tr>
                                                    <td className="text-success">Discount Applied</td>
                                                    <td className="text-success">
                                                        -£{Number(bookingData.discount).toFixed(2)}
                                                    </td>
                                                </tr>
                                            )}

                                            {/* BOOKING FEE (only if exists) */}
                                            {Number(bookingData.booking_fee) > 0 && (
                                                <tr>
                                                    <td>Booking Fee</td>
                                                    <td>
                                                        £{Number(bookingData.booking_fee).toFixed(2)}
                                                    </td>
                                                </tr>
                                            )}

                                            {/* ADD-ONS */}
                                            {addons.cancellation_cover && (
                                                <tr>
                                                    <td>Cancellation Cover</td>
                                                    <td>£1.49</td>
                                                </tr>
                                            )}

                                            {addons.sms_confirmation && (
                                                <tr>
                                                    <td>SMS Confirmation</td>
                                                    <td>£0.75</td>
                                                </tr>
                                            )}

                                            {/* ADD-ONS TOTAL */}
                                            {addonsTotal > 0 && (
                                                <tr>
                                                    <td>Add-ons Total</td>
                                                    <td>£{Number(addonsTotal).toFixed(2)}</td>
                                                </tr>
                                            )}


                                            {/* TOTAL */}
                                            <tr className="border-top">
                                                <td className="fw-bold">Total Paid</td>
                                                <td className="fw-bold text-success">
                                                    £{Number(bookingData.total_payable).toFixed(2)}
                                                </td>
                                            </tr>


                                            <tr>
                                                <td>Status</td>
                                                <td>{bookingData.status}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/* RIGHT COLUMN — Customer + Vehicle Information */}
                                <div className="col-lg-6 col-md-12">

                                    {/* Customer */}
                                    <h5 className="fw-bold pb-2 border-bottom mb-3">
                                        Customer Information
                                    </h5>

                                    <table className="table table-borderless mb-4">
                                        <tbody>
                                            <tr><td>Name</td><td>{bookingData.first_name} {bookingData.last_name}</td></tr>
                                            <tr><td>Email</td><td>{bookingData.email}</td></tr>
                                            <tr><td>Mobile</td><td>{bookingData.mobile}</td></tr>
                                        </tbody>
                                    </table>

                                    {/* Vehicle */}
                                    <h5 className="fw-bold pb-2 border-bottom mb-3">
                                        Vehicle Information
                                    </h5>

                                    <table className="table table-borderless">
                                        <tbody>
                                            <tr><td>Make</td><td>{bookingData.vehicle_make || "-"}</td></tr>
                                            <tr><td>Model</td><td>{bookingData.vehicle_model || "-"}</td></tr>
                                            <tr><td>Color</td><td>{bookingData.vehicle_colour || "-"}</td></tr>
                                            <tr><td>Registration</td><td>{bookingData.vehicle_registration || "-"}</td></tr>
                                        </tbody>
                                    </table>

                                    {/* Vehicle */}
                                    <h5 className="fw-bold pb-2 border-bottom mb-3">
                                        Flight Information
                                    </h5>

                                    <table className="table table-borderless">
                                        <tbody>
                                            <tr><td>Depart Flight</td><td>{bookingData.depart_flight || "-"}</td></tr>
                                            <tr><td>Depart Terminal</td><td>{bookingData.depart_terminal || "-"}</td></tr>
                                            <tr><td>Return Flight</td><td>{bookingData.return_flight || "-"}</td></tr>
                                            <tr><td>Return Terminal</td><td>{bookingData.return_terminal || "-"}</td></tr>
                                        </tbody>
                                    </table>

                                </div>

                            </div>
                        </>
                    )}

                    {/* Continue Button */}
                    <button
                        className="btn fw-bold text-white px-4 py-2 mt-4"
                        style={{ borderRadius: "50px", background: "#062A4F" }}
                        onClick={() => navigate("/product")}
                    >
                        Browse More Products
                    </button>

                    {/* <button
                        className="btn btn-outline-secondary fw-bold px-4 py-2 mt-3"
                        style={{ borderRadius: "50px" }}
                        onClick={() => navigate("/receipt", { state: { bookingData } })}
                    >
                        Download Receipt (PDF)
                    </button> */}

                    <p className="text-muted small mt-3 mb-0">
                        A confirmation email has been sent to <strong>{bookingData?.email}</strong>.
                    </p>
                </div>
            </div>

            <Footer />
            <Copyright />
        </>
    );
};

export default ThankYouPage;
