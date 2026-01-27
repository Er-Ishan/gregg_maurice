import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../component/Topbar";
import NavbarElement from "../component/NavbarElement";
import Footer from "../component/Footer";
import Copyright from "../component/Copyright";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaDownload } from "react-icons/fa6";

import {
    FaHouse,
    FaListCheck,
    FaUser,
    FaKey,
    FaCreditCard,
    FaEye
} from "react-icons/fa6";

const toNumber = (v, fallback = 0) => {
    const n = Number(String(v ?? "").replace(/[^0-9.-]/g, ""));
    return Number.isFinite(n) ? n : fallback;
};


const downloadInvoice = (booking) => {
    const doc = new jsPDF();

    // ✅ SAFE numeric parsing (fixes toFixed error)
    const parkingFee = toNumber(booking.total_payable, 0);
    const bookingFee = toNumber(booking.booking_fee, 2.99);            // if backend has it, else default
    const cancellationCover = toNumber(booking.cancellation_cover, 3.99); // if backend has it, else default
    const discount = toNumber(booking.discount, 0);

    const subtotal = parkingFee + bookingFee + cancellationCover;
    const total = Math.max(subtotal - discount, 0);

    // Header
    doc.setFontSize(26);
    doc.text("INVOICE", 14, 22);

    doc.setFontSize(10);
    doc.text(`Invoice No: ${booking.ref_no || "N/A"}`, 150, 18);
    doc.text(`Date: ${new Date().toLocaleDateString("en-GB")}`, 150, 24);

    // Customer / From
    doc.setFontSize(11);
    doc.text("Billed to:", 14, 40);
    doc.setFontSize(10);
    doc.text(`${booking.email || "Customer"}`, 14, 46);

    doc.setFontSize(11);
    doc.text("Booking Details:", 14, 60);
    doc.setFontSize(10);
    doc.text(`Product: ${booking.product_name || "Parking Service"}`, 14, 66);
    doc.text(`Reference: ${booking.ref_no || "N/A"}`, 14, 72);
    doc.text(`Airport: ${booking.travelling_from || "-"}`, 14, 78);
    doc.text(
        `Drop-Off: ${booking.drop_off_date ? formatDateTime(booking.drop_off_date) : "-"}`,
        14,
        84
    );
    doc.text(
        `Return: ${booking.return_date ? formatDateTime(booking.return_date) : "-"}`,
        14,
        90
    );
    doc.text(
        `Vehicle: ${booking.vehicle_make || ""} ${booking.vehicle_model || ""} (${booking.vehicle_registration || ""})`,
        14,
        96
    );

    // Invoice table
    autoTable(doc, {
        startY: 110,
        head: [["Item", "Amount (£)"]],
        body: [
            ["Parking Fee", parkingFee.toFixed(2)],
            ["Booking Fee", bookingFee.toFixed(2)],
            ["Cancellation Cover", cancellationCover.toFixed(2)],
            ["Discount", `- ${discount.toFixed(2)}`],
            ["Total", total.toFixed(2)],
        ],
        styles: { halign: "right" },
        columnStyles: {
            0: { halign: "left" },
            1: { halign: "right" },
        },
        headStyles: { fillColor: [58, 22, 114] },
    });

    const endY = doc.lastAutoTable?.finalY || 160;

    doc.setFontSize(10);
    doc.text("Payment method: Online", 14, endY + 12);
    doc.text("Note: Thank you for choosing us!", 14, endY + 18);

    // ✅ This triggers the browser download
    doc.save(`Invoice_${booking.ref_no || booking.id || "invoice"}.pdf`);
};


const formatDateTime = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
};

const API = import.meta.env.VITE_API_URL;

export default function MyBooking() {
    const [bookings, setBookings] = useState([]);
    const [activeSection, setActiveSection] = useState("recent");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API}/api/my-bookings`, {
            credentials: "include"
        })
            .then((res) => {
                if (!res.ok) {
                    navigate("/");
                    return;
                }
                return res.json();
            })
            .then((data) => {
                setBookings(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => {
                setBookings([]);
                setLoading(false);
                navigate("/");
            });

    }, []);

    return (
        <>
            <Topbar />
            <NavbarElement />

            {/* HEADER */}
            <div style={{ background: "#3A1672" }} className="text-white py-4">
                <div className="container">
                    <h2 className="fw-bold">
                        Customer Details{" "}
                        <span className="text-warning">
                            {bookings?.[0]?.email ?? ""}
                        </span>
                    </h2>
                </div>
            </div>

            <div className="container my-5 min-vh-100">
                <div className="row">
                    {/* SIDEBAR */}
                    <div className="col-lg-3 mb-4">
                        <div className="card p-4 shadow-sm">
                            <div className="text-center mb-4">
                                <h5 className="fw-bold mb-1">
                                    {bookings?.[0]?.email ?? "Customer"}
                                </h5>
                            </div>

                            <hr />

                            <ul className="list-unstyled mb-4">
                                <li
                                    className="mb-4 d-flex align-items-center gap-2 fw-semibold"
                                    style={{
                                        cursor: "pointer",
                                        color: activeSection === "recent" ? "#3A1672" : "#555"
                                    }}
                                    onClick={() => setActiveSection("recent")}
                                >
                                    <FaHouse /> Recent Bookings
                                </li>

                                <li
                                    className="mb-4 d-flex align-items-center gap-2 fw-semibold"
                                    style={{
                                        cursor: "pointer",
                                        color: activeSection === "list" ? "#3A1672" : "#555"
                                    }}
                                    onClick={() => setActiveSection("list")}
                                >
                                    <FaListCheck /> Booking List
                                </li>

                                <li
                                    className="mb-4 d-flex align-items-center gap-2 fw-semibold"
                                    style={{
                                        cursor: "pointer",
                                        color: activeSection === "invoice" ? "#3A1672" : "#555"
                                    }}
                                    onClick={() => setActiveSection("invoice")}
                                >
                                    <FaCreditCard /> Invoice
                                </li>


                                {/* <li className="mb-4 d-flex align-items-center gap-2 fw-semibold">
                                    <FaUser /> Profile Setting
                                </li>

                                <li className="mb-4 d-flex align-items-center gap-2 fw-semibold">
                                    <FaKey /> Change Password
                                </li> */}

                                {/* <li className="mb-4 d-flex align-items-center gap-2 fw-semibold">
                                    <FaCreditCard /> Subscription
                                </li> */}
                            </ul>

                            <button
                                style={{ background: "#3A1672" }}
                                className="btn w-100 text-white"
                                onClick={async () => {
                                    await fetch(`${API}/api/logout`, {
                                        method: "POST",
                                        credentials: "include"
                                    });
                                    navigate("/");
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* MAIN CONTENT */}
                    <div className="col-lg-9">
                        {/* RECENT BOOKINGS */}
                        {activeSection === "recent" && (
                            <>
                                <h4 className="mb-4 fw-bold">Recent Bookings</h4>

                                <div className="row">
                                    {Array.isArray(bookings) && bookings.map((booking) => (
                                        <div className="col-xl-6 col-lg-12 mb-4" key={booking.id}>
                                            <div className="card p-4 h-100">
                                                <div className="d-flex justify-content-between mb-2">
                                                    <h6 className="fw-bold text-primary">
                                                        Parking Reference
                                                    </h6>
                                                    <span className="badge bg-success">
                                                        {booking.status}
                                                    </span>
                                                </div>

                                                <p className="fw-bold">{booking.ref_no}</p>
                                                <hr />

                                                <div className="row mb-2">
                                                    <div className="col-6">Airport</div>
                                                    <div className="col-6 text-end">
                                                        {booking.travelling_from}
                                                    </div>
                                                </div>

                                                <div className="row mb-2">
                                                    <div className="col-6">Drop-Off</div>
                                                    <div className="col-6 text-end">
                                                        {formatDateTime(booking.drop_off_date)}
                                                    </div>
                                                </div>

                                                <div className="row mb-2">
                                                    <div className="col-6">Return</div>
                                                    <div className="col-6 text-end">
                                                        {formatDateTime(booking.return_date)}
                                                    </div>
                                                </div>

                                                <div className="row mb-2">
                                                    <div className="col-6">Vehicle</div>
                                                    <div className="col-6 text-end">
                                                        {booking.vehicle_make},{" "}
                                                        {booking.vehicle_model},{" "}
                                                        {booking.vehicle_registration}
                                                    </div>
                                                </div>

                                                <hr />

                                                <div className="d-flex justify-content-between">
                                                    <strong>Amount Paid</strong>
                                                    <strong className="text-success">
                                                        £{booking.total_payable}
                                                    </strong>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* BOOKING LIST (TABLE VIEW) */}
                        {activeSection === "list" && (
                            <>
                                <h4 className="mb-4 fw-bold">My Bookings</h4>

                                <div className="table-responsive">
                                    <table className="table table-bordered align-middle">
                                        <thead className="table-light">
                                            <tr>
                                                <th>S.L.</th>
                                                <th>Product</th>
                                                <th>Reference</th>
                                                <th>Departure</th>
                                                <th>Return</th>
                                                <th>Vehicle</th>
                                                <th>Status</th>
                                                {/* <th>Actions</th> */}
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {bookings.map((booking, index) => (
                                                <tr key={booking.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{booking.product_name || "WCP"}</td>
                                                    <td>{booking.ref_no}</td>
                                                    <td>{formatDateTime(booking.drop_off_date)}</td>
                                                    <td>{formatDateTime(booking.return_date)}</td>
                                                    <td>
                                                        {booking.vehicle_make},{" "}
                                                        {booking.vehicle_model},{" "}
                                                        {booking.vehicle_registration}
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-success">
                                                            {booking.status}
                                                        </span>
                                                    </td>
                                                    {/* <td className="text-center">
                                                        <button className="btn btn-sm btn-primary">
                                                            <FaEye />
                                                        </button>
                                                    </td> */}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}

                        {activeSection === "invoice" && (
                            <>
                                <h4 className="mb-4 fw-bold">Invoices</h4>

                                <div className="table-responsive">
                                    <table className="table table-bordered align-middle">
                                        <thead className="table-light">
                                            <tr>
                                                <th>S.L.</th>
                                                <th>Booking Ref</th>
                                                <th>Drop Off</th>
                                                <th>Return</th>
                                                <th>Amount (£)</th>
                                                <th>Download</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {bookings.map((booking, index) => (
                                                <tr key={booking.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{booking.ref_no}</td>
                                                    <td>
                                                        {new Date(booking.drop_off_date).toLocaleDateString("en-GB")}
                                                    </td>
                                                    <td>
                                                        {new Date(booking.return_date).toLocaleDateString("en-GB")}
                                                    </td>
                                                    <td>
                                                        <strong className="text-success">
                                                            £{booking.total_payable}
                                                        </strong>
                                                    </td>
                                                    <td className="text-center">
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm"
                                                            onClick={() => downloadInvoice(booking)}
                                                        >
                                                            <FaDownload />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}

                    </div>
                </div>
            </div>

            <Footer />
            <Copyright />
        </>
    );
}
