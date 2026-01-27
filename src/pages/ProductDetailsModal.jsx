import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import { IoIosCheckmarkCircle } from "react-icons/io";
import Topbar from "../component/Topbar";
import NavbarElement from "../component/NavbarElement";
import Footer from "../component/Footer";
import Copyright from "../component/Copyright";
import {
    IoIosBusiness,
    IoIosTime,
    IoIosStar,
    IoIosCash,
    IoIosAddCircle,
    IoIosCheckmarkCircle,
    IoIosCloseCircle
} from "react-icons/io";


function formatTime(time) {
    if (!time) return "";
    const [h, m = "00"] = time.toString().split(":");
    let hour = parseInt(h, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${m.padStart(2, "0")} ${ampm}`;
}

export default function ProductDetails() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("overview");

    if (!state || !state.product) {
        return (
            <div className="container my-5">
                <p>No product data found.</p>
            </div>
        );
    }

    const { product, pricing, dropDate, returnDate, airport } = state;

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

            <div className="container my-4">

                {/* Back */}
                {/* <button
                    className="btn text-white mb-3 d-inline-flex align-items-center justify-content-center"
                    style={{
                        background: "#062A4F",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        fontSize: "18px",
                        lineHeight: "1",
                    }}
                    onClick={() => navigate(-1)}
                    aria-label="Go back"
                >
                    ←
                </button> */}


                {/* OUTER CARD */}
                <div className="card border-2">
                    <div className="card-body p-4">

                        <div className="row g-4">

                            {/* LEFT SIDE */}
                            <div className="col-lg-8">

                                {/* Tabs */}
                                <ul className="nav nav-pills mb-3 w-100 d-flex">
                                    {[
                                        ["overview", "Overview"],
                                        ["drop", "Description"],
                                        ["return", "Drop off Procedure"],
                                    ].map(([key, label]) => (
                                        <li className="nav-item flex-fill text-center" key={key}>
                                            <button
                                                className="nav-link w-100 fw-medium"
                                                onClick={() => setActiveTab(key)}
                                                style={{
                                                    backgroundColor: activeTab === key ? "#062A4F" : "#fff",
                                                    color: activeTab === key ? "#fff" : "#062A4F",
                                                    borderRadius: "8px",
                                                    padding: "12px 0",
                                                    border: "1px solid #e3e3e3",
                                                }}
                                            >
                                                {label}
                                            </button>
                                        </li>
                                    ))}
                                </ul>


                                {/* Content Box */}
                                <div
                                    className="border bg-light"
                                    style={{ minHeight: "360px" }}
                                >
                                    <div className="p-4">

                                        {activeTab === "overview" && (
                                            <>
                                                <h6 className="fw-semibold mb-3 text-dark">
                                                    Overview
                                                </h6>
                                                <p className="fs-6 lh-lg text-secondary mb-0">
                                                    {product.product_overview || "No overview available."}
                                                </p>
                                            </>
                                        )}

                                        {activeTab === "drop" && (
                                            <>
                                                <h6 className="fw-semibold mb-3 text-dark">
                                                    Description
                                                </h6>
                                                <p className="fs-6 lh-lg text-secondary mb-0">
                                                    {product.product_description || "No drop-off procedure available."}
                                                </p>
                                            </>
                                        )}

                                        {activeTab === "return" && (
                                            <>
                                                <h6 className="fw-semibold mb-3 text-dark">
                                                    Drop off Procedure
                                                </h6>
                                                <p className="fs-6 lh-lg text-secondary mb-0">
                                                    {product.dropoff_procedure || "No return procedure available."}
                                                </p>
                                            </>
                                        )}

                                        {/* {activeTab === "info" && (
                                            <>
                                                <h6 className="fw-semibold mb-3 text-dark">
                                                    Important Information
                                                </h6>
                                                <p className="fs-6 lh-lg text-secondary mb-3">
                                                    {product.important_info || "No important information available."}
                                                </p>

                                                {product.map_link && (
                                                    <a
                                                        href={product.map_link}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="fw-semibold text-primary"
                                                    >
                                                        View directions →
                                                    </a>
                                                )}
                                            </>
                                        )} */}

                                    </div>
                                </div>

                            </div>

                            {/* RIGHT SIDE – BOOKING CARD */}
                            <div className="col-lg-4">
                                <div className="card h-100 border-2">
                                    <div className="card-body p-4 d-flex flex-column text-center">

                                        {/* Image */}
                                        <div className="mb-3 ">
                                            <img
                                                src={
                                                    product.image_data ||
                                                    "https://blog.getmyparking.com/wp-content/uploads/2018/07/airport-parking-1.jpg"
                                                }
                                                alt={product.product_name}
                                                className="img-fluid border-2"
                                                style={{ maxHeight: "130px", objectFit: "contain" }}
                                            />
                                        </div>

                                        {/* Title */}
                                        {/* <h4 className="fw-bold mb-1" style={{ color: "#062A4F" }}>
                                            {product.product_name}
                                        </h4> */}

                                        <p className="text-muted mb-4">
                                            {product.service_type}
                                        </p>

                                        {/* Features */}
                                        {/* Features */}
                                        <ul className="list-unstyled text-start mb-4">

                                            {/* Airport */}
                                            <li className="d-flex align-items-start gap-2 mb-2">
                                                <IoIosCheckmarkCircle className="mt-1" size={18} style={{ color: "#062A4F" }} />
                                                <span className="fs-6 text-dark">
                                                    {product.point_1}
                                                </span>
                                            </li>

                                            {/* Operating Hours */}
                                            <li className="d-flex align-items-start gap-2 mb-2">
                                                <IoIosCheckmarkCircle className="mt-1" size={18} style={{ color: "#062A4F" }} />
                                                <span className="fs-6 text-dark">
                                                    {product.point_2}
                                                </span>
                                            </li>

                                            {/* Reviews */}
                                            <li className="d-flex align-items-start gap-2 mb-2">
                                                <IoIosCheckmarkCircle className="mt-1" size={18} style={{ color: "#062A4F" }} />
                                                <span className="fs-6 text-dark">
                                                    {product.point_3}
                                                </span>
                                            </li>

                                            {/* Airport Charges */}
                                            <li className="d-flex align-items-start gap-2 mb-2">
                                                <IoIosCheckmarkCircle className="mt-1" size={18} style={{ color: "#062A4F" }} />
                                                <span className="fs-6 text-dark">
                                                    {product.point_4}
                                                </span>
                                            </li>

                                            <li className="d-flex align-items-start gap-2 mb-2">
                                                <IoIosCheckmarkCircle className="mt-1" size={18} style={{ color: "#062A4F" }} />
                                                <span className="fs-6 text-dark">
                                                    {product.point_5}
                                                </span>
                                            </li>

                                            <li className="d-flex align-items-start gap-2 mb-2">
                                                <IoIosCheckmarkCircle className="mt-1" size={18} style={{ color: "#062A4F" }} />
                                                <span className="fs-6 text-dark">
                                                    {product.point_6}
                                                </span>
                                            </li>

                                            {/* Status */}
                                            <li className="d-flex align-items-start gap-2">
                                                {product.status === "Active" ? (
                                                    <IoIosCheckmarkCircle className="mt-1 text-success" size={18} />
                                                ) : (
                                                    <IoIosCloseCircle className="mt-1 text-danger" size={18} />
                                                )}
                                                <span className="fs-6 text-dark">
                                                    <strong>Status:</strong>{" "}
                                                    <span className={`fw-semibold ${product.status === "Active" ? "text-success" : "text-danger"}`}>
                                                        {product.status}
                                                    </span>
                                                </span>
                                            </li>

                                        </ul>


                                        {/* Spacer to push price & CTA down */}
                                        <div className="mt-auto">

                                            {/* Price */}
                                            <div className="fw-bold mb-3" style={{ fontSize: "2rem", color: "#1b1b1d" }}>
                                                £{Number(pricing || 0).toFixed(2)}
                                            </div>

                                            {/* CTA */}
                                            {/* <button
                                                className="btn w-100 fw-semibold py-2 mb-3"
                                                style={{
                                                    border: "1px solid #062A4F",
                                                    color: "#062A4F",
                                                    background: "transparent",
                                                }}
                                            >
                                                BOOK SPACE
                                            </button> */}

                                            {/* Meta */}
                                            <div className="mt-auto">

                                                {/* BOOK NOW */}
                                                <button
                                                    className="btn w-100 fw-semibold py-2 mb-3"
                                                    style={{
                                                        background: "#062A4F",
                                                        color: "#fff",
                                                        borderRadius: "8px",
                                                    }}
                                                    onClick={() => {
                                                        const basePrice = Number(pricing || 0);

                                                        navigate("/booking-form", {
                                                            state: {
                                                                productId: product.id,
                                                                dropDate,
                                                                returnDate,
                                                                travelling_from: airport,
                                                                basePrice: basePrice,
                                                                discountAmount: 0, // no promo here
                                                                finalPrice: basePrice,

                                                                // OPTIONAL (keep for display pages)
                                                                product_overview: product.product_overview,
                                                                product_description: product.product_description,
                                                                dropoff_procedure: product.dropoff_procedure,
                                                            },
                                                        });
                                                    }}
                                                >
                                                    Book Now
                                                </button>


                                                {/* BACK */}
                                                <button
                                                    className="btn w-100 fw-semibold py-2"
                                                    style={{
                                                        border: "1px solid #062A4F",
                                                        color: "#062A4F",
                                                        background: "transparent",
                                                        borderRadius: "8px",
                                                    }}
                                                    onClick={() => navigate(-1)}
                                                >
                                                    Back
                                                </button>

                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

            <Footer />
            <Copyright />
        </>
    );
}
