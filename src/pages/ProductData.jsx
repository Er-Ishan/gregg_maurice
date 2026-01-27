import React, { useEffect, useState } from 'react'
import Topbar from "../component/Topbar"
import Navbar from "../component/Navbar"
import Footer from "../component/Footer"
import { SlCalender } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import Copyright from "../component/Copyright"
import { FaCheck } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { IoIosCheckbox } from "react-icons/io";
import {
    IoIosBusiness,     // Airport
    IoIosTime,         // Operating hours
    IoIosStar,         // Reviews
    IoIosCash,         // Airport charges / fees
    IoIosAddCircle,    // Extras
    IoIosCheckmarkCircle, // Active status
    IoIosCloseCircle   // Inactive status
} from "react-icons/io";

function addDaysToDateString(dateStr, days) {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return d.toISOString().split("T")[0];
}



import NavbarElement from '../component/NavbarElement';

const API = import.meta.env.VITE_API_URL;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatPrettyDate(dateStr) {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-");
    return `${MONTHS[Number(m) - 1]} ${Number(d)}, ${y}`;
}



const ProductData = () => {

    const [isMobileDisplay, setIsMobileDisplay] = useState(false);

    useEffect(() => {
        const checkScreen = () => setIsMobileDisplay(window.innerWidth <= 768);
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    const [products, setProducts] = useState([]);
    const [pricing, setPricing] = useState({});
    const [filter, setFilter] = useState("All");

    const [returnManuallySet, setReturnManuallySet] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [airportList, setAirportList] = useState([]);
    const [loading, setLoading] = useState(false);

    const [showSearchForm, setShowSearchForm] = useState(false);

    const [selectedAirport, setSelectedAirport] = useState(
        localStorage.getItem("selectedAirport") || ""
    );

    const [isMobile, setIsMobile] = useState(window.innerWidth < 576);

    const [viewType, setViewType] = useState("grid"); // "grid" | "list"


    // const [dropDateState, setDropDateState] = useState(localStorage.getItem("dropDate") || "");
    const [selectedProduct, setSelectedProduct] = useState(null);
    // const [returnDateState, setReturnDateState] = useState(localStorage.getItem("returnDate") || "");

    // const [dropDateState, setDropDateState] = useState(() => addDays(new Date(), 2));
    // const [returnDateState, setReturnDateState] = useState(() => addDays(addDays(new Date(), 2), 8));

    const defaultDrop = (() => {
        const d = new Date();
        d.setDate(d.getDate() + 2);
        return `${d.toISOString().split("T")[0]} 12:00`;
    })();

    const defaultReturn = (() => {
        const d = new Date();
        d.setDate(d.getDate() + 10);
        return `${d.toISOString().split("T")[0]} 12:00`;
    })();

    const [dropDateState, setDropDateState] = useState(() =>
        getInitialDate("dropDate", defaultDrop)
    );

    const [returnDateState, setReturnDateState] = useState(() =>
        getInitialDate("returnDate", defaultReturn)
    );


    const [appliedAirport, setAppliedAirport] = useState(
        localStorage.getItem("selectedAirport") || ""
    );

    const [appliedServiceType, setAppliedServiceType] = useState("All");


    const [promoCode, setPromoCode] = useState(
        localStorage.getItem("promoCode") || ""
    );

    const [promoData, setPromoData] = useState(null);
    const [promoError, setPromoError] = useState("");

    const parseDateOnly = (dateTime) => {
        if (!dateTime || typeof dateTime !== "string") return null;

        const datePart = dateTime.split(" ")[0];
        const date = new Date(datePart);

        return isNaN(date.getTime()) ? null : date;
    };


    const updateDateOnly = (date, type) => {
        if (!date) return;
        const yyyyMmDd = date.toISOString().split("T")[0];
        updateDateTime(yyyyMmDd, type, "date");
    };

    function getInitialDate(key, fallbackDate) {
        const stored = localStorage.getItem(key);
        if (!stored) return fallbackDate;

        const datePart = stored.split(" ")[0];
        const date = new Date(datePart);
        return isNaN(date.getTime()) ? fallbackDate : stored;
    }




    const validatePromoCode = async (code = promoCode) => {

        if (!promoCode.trim()) {
            setPromoData(null);
            setPromoError("");
            return true; // no promo = valid flow
        }

        try {
            const res = await fetch(`${API}/api/promocode/${promoCode}`);
            const data = await res.json();

            if (data.success) {
                setPromoData(data.promo);
                setPromoError("");
                localStorage.setItem("promoCode", code);

                return true;
            } else {
                setPromoData(null);
                setPromoError("Promo code not available or expired");
                localStorage.removeItem("promo");
                return false;
            }
        } catch {
            setPromoError("Server error while checking promo");
            return false;
        }
    };




    const [activeTab, setActiveTab] = useState("overview");

    const updateDateTime = (newValue, type, part) => {
        const current = type === "drop" ? dropDateState : returnDateState;
        const [date, time] = current.split(" ");

        const updated = part === "date"
            ? `${newValue} ${time || "12:00"}`
            : `${date} ${newValue}`;

        if (type === "drop") {
            setDropDateState(updated);
            localStorage.setItem("dropDate", updated);
        } else {
            setReturnDateState(updated);
            localStorage.setItem("returnDate", updated);
        }
    };

    function formatTime(time) {
        if (!time) return "";

        // Handle "08:00", "8:00", "8"
        const [hourStr, minuteStr = "00"] = time.toString().split(":");
        let hour = parseInt(hourStr, 10);
        const minute = minuteStr.padStart(2, "0");

        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;

        return `${hour}:${minute} ${ampm}`;
    }



    useEffect(() => {
        fetch(`${API}/api/data/airports`)
            .then((res) => res.json())
            .then((data) => {
                setAirportList(data);

                // auto-select first airport if none selected
                if (!localStorage.getItem("selectedAirport") && data.length > 0) {
                    setSelectedAirport(data[0].airport_name);
                    localStorage.setItem("selectedAirport", data[0].airport_name);
                }
            })
            .catch((err) => console.error("Failed to load airports", err));
    }, []);

    useEffect(() => {
        const storedPromo = localStorage.getItem("promoCode");

        if (storedPromo) {
            setPromoCode(storedPromo);
            validatePromoCode(storedPromo);
        }
    }, []);




    const handleMoreInfo = async (id) => {
        try {
            const res = await fetch(`${API}/api/parking-product/${id}`);
            const result = await res.json();

            if (result.success) {
                setSelectedProduct(result.data); // store full product info
                setShowModal(true);             // open popup
            }
        } catch (error) {
            console.log("More info error:", error);
        }
    };

    // Auto refresh pricing
    const refreshPricing = () => {
        if (!dropDateState || !returnDateState) return;

        setPricing({});
        fetchAllProducts();
    };

    // useEffect(() => {
    //     refreshPricing();
    // }, [dropDateState, returnDateState]); // 🔥 triggers when time or date changes

    const closeModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    const navigate = useNavigate();

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-GB", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    // Fetch All Products Initially
    useEffect(() => {
        const init = async () => {
            if (promoCode) {
                const ok = await validatePromoCode(promoCode);
                if (!ok) return;
            }
            fetchAllProducts();
        };

        init();
    }, []);


    const fetchAllProducts = () => {
        fetch(`${API}/api/parking-product`)
            .then(res => res.json())
            .then(data => {
                let list = [];

                if (Array.isArray(data.data)) {
                    list = data.data;
                } else if (Array.isArray(data)) {
                    list = data;
                } else {
                    console.error("Unexpected API response:", data);
                    list = []; // prevent crashes
                }

                setProducts(list);

                if (dropDateState && returnDateState) {
                    list.forEach(p => {
                        if (p?.id) {
                            fetchDynamicPrice(p.id, dropDateState, returnDateState);
                        }
                    });
                }
            })
            .catch(err => console.error("Fetch products error:", err));
    };

    // send selected dates in request
    const fetchDynamicPrice = async (product_id, dropDate, returnDate) => {
        try {
            const res = await fetch(`${API}/api/calculate-price`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    product_id,
                    dropoff_date: dropDate,
                    return_date: returnDate
                })
            });

            if (!res.ok) return;

            const result = await res.json();

            if (result.success) {
                setPricing(prev => ({
                    ...prev,
                    [product_id]: result.total_price
                }));
            }

        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    // SEARCH BUTTON CLICK LOGIC
    const handleSearch = async (e) => {
        e.preventDefault();

        if (!dropDateState || !returnDateState) {
            alert("Please select both dates");
            return;
        }

        const promoValid = await validatePromoCode();
        if (!promoValid) return;

        setLoading(true); // ✅ START LOADER

        setAppliedAirport(selectedAirport);
        setAppliedServiceType(filter);
        localStorage.setItem("selectedAirport", selectedAirport);
        localStorage.setItem("dropDate", dropDateState);
        localStorage.setItem("returnDate", returnDateState);

        setPricing({});
        refreshPricing();

        // ⏱️ minimum loader time (UX smooth)
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    };



    // Filter visible products (has price only)
    const filteredProducts = Array.isArray(products)
        ? products.filter((p) => {
            const matchAirport =
                !appliedAirport || p.airport_name === appliedAirport;

            const matchService =
                appliedServiceType === "All"
                    ? true
                    : p.service_type === appliedServiceType;

            const price = pricing[p.id];

            return matchAirport && matchService && price;
        })
        : [];




    return (
        <>
            {/* {!isMobileDisplay && <Topbar />} */}
            <NavbarElement />

            <style>
                {`
                    .filter-btn {
                        background:#5D728A;
                        border:none;
                        color:white;
                        padding:10px 18px;
                        border-radius:8px;
                        margin-right:10px;
                        font-size:15px;
                    }
                    .filter-btn.active {
                        background:#062A4F;
                    }

                    .pricing-wrapper {
                        background: linear-gradient(to bottom, #eef3ff, #e3e9ff);
                        padding: 70px 0;
                    }

                    /* CARD LAYOUT FIX – make cards equal height */
                    .pricing-card {
                        background: #ffffff;
                        padding: 18px;
                        border: 1px solid #e9e9e9;
                        transition: 0.3s;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                    }
                    .pricing-card:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 10px 28px rgba(0,0,0,0.06);
                    }

                    .pricing-tag {
                        font-size:26px;
                        font-weight:700;
                        color:#062A4F;
                    }

                    

                    .search-field {
                        height: 48px !important;
                        border-radius: 12px !important;
                        font-size: 14px;
                        border: 1px solid #d6d6e0 !important;
                    }

                    .input-group .form-control {
                        border-right: 0 !important;
                        border-radius: 12px 0 0 12px !important;
                    }

                    .input-group-text {
                        border-radius: 0 12px 12px 0 !important;
                        border: 1px solid #d6d6e0 !important;
                        border-left: 0 !important;
                        cursor: pointer;
                    }

                    .form-label {
                        font-size: 14px;
                        color: #1B1B1D;
                    }

                    /* Fix column spacing & layout */
                    .row.g-3 > div {
                        padding-right: 12px;
                        padding-left: 12px;
                    }

                    /* Small screen improvements */
                    @media(max-width: 768px) {
                        .search-field {
                            width: 100%;
                            height: 44px !important;
                            font-size: 13px;
                        }
                        .input-group-text {
                            padding: 8px 10px;
                        }
                    }

                    /* Button visual fix */
                    button.btn.btn-primary {
                        font-size: 15px;
                        font-weight: 600;
                        padding: 13px 32px !important;
                    }

                    /* Only disable icon click — NOT the full container */
                    .input-group-text {
                        pointer-events: none !important;
                    }

                    /* Hide native icon but allow input click */
                    input[type="date"]::-webkit-calendar-picker-indicator {
                        opacity: 0 !important;
                        cursor: pointer;
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        left: 0;
                    }

                    /* Make sure input is clickable */
                    input[type="date"] {
                        position: relative;
                        z-index: 2;
                        cursor: pointer;
                    }

                    /* CHECK ICON LIST STYLING */
                    .pricing-list {
                        list-style: none;
                        padding: 0;
                        margin-top: 16px;
                        text-align: left;
                        flex-grow: 1; /* stretch to fill card height */
                    }

                    .pricing-list li {
                        display: flex;
                        align-items: flex-start;
                        gap: 8px;
                        margin-bottom: 10px;
                    }

                    .list-icon {
                        margin-top: 2px;
                        flex-shrink: 0;
                        color: #28a745; /* green color */
                    }

                    /* footer (price + button) stick to bottom */
                    .pricing-footer {
                        margin-top: auto;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }


                    
                `}
            </style>

            <div className="pricing-wrapper">
                <div className="container text-center">

                    <h2 className=" mb-1" style={{ color: "black" }}>
                        Compare <span style={{ color: "#ffa200" }}>{selectedAirport}</span> Parking Deals
                    </h2>

                    {dropDateState && returnDateState && (
                        <div className="d-flex justify-content-center align-items-center gap-3 mb-3 flex-wrap">
                            <p className="mb-0">
                                From{" "}
                                <b>
                                    {formatDate(dropDateState)} {dropDateState.split(" ")[1] || "12:00"}
                                </b>{" "}
                                To{" "}
                                <b>
                                    {formatDate(returnDateState)} {returnDateState.split(" ")[1] || "12:00"}
                                </b>
                            </p>

                            <button
                                type="button"
                                className="btn btn text-white btn-sm px-3"
                                style={{ background: "#062A4F" }}
                                onClick={() => setShowSearchForm((prev) => !prev)}
                            >
                                Edit
                            </button>
                        </div>
                    )}


                    {/* Search fields */}
                    {showSearchForm && (
                        <div className="container my-4">
                            <div className="p-4 bg-white border rounded-3 shadow-sm">
                                <form className="row g-3 align-items-end" onSubmit={handleSearch}>

                                    {/* SERVICE TYPE FILTER */}
                                    <div className="col-12 col-md-4 col-lg">
                                        <label className="form-label fw-bold">Service Type</label>
                                        <select
                                            className="form-select search-field"
                                            value={filter}
                                            onChange={(e) => setFilter(e.target.value)}
                                        >
                                            <option value="All">All Services</option>
                                            <option value="Park & Ride">Park & Ride</option>
                                            <option value="Meet & Greet">Meet & Greet</option>
                                        </select>
                                    </div>


                                    {/* AIRPORT FILTER */}
                                    <div className="col-12 col-md-4 col-lg">
                                        <label className="form-label fw-bold">Airport</label>
                                        <select
                                            className="form-select search-field"
                                            value={selectedAirport}
                                            onChange={(e) => setSelectedAirport(e.target.value)}
                                        >
                                            <option value="Heathrow">Heathrow</option>
                                            <option value="Gatwick">Gatwick</option>
                                        </select>
                                    </div>


                                    {/* DROP-OFF DATE */}
                                    <div className="col-6 col-md-4 col-lg">
                                        <label className="form-label fw-bold">Drop-off Date</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control search-field"
                                                value={formatPrettyDate(dropDateState.split(" ")[0])}
                                                readOnly
                                                onClick={() =>
                                                    document.getElementById("dropDateNative").showPicker()
                                                }
                                            />
                                            <input
                                                id="dropDateNative"
                                                type="date"
                                                className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                                                value={dropDateState.split(" ")[0]}
                                                min={new Date().toISOString().split("T")[0]}
                                                onChange={(e) => {
                                                    const newDropDate = e.target.value;

                                                    updateDateTime(newDropDate, "drop", "date");

                                                    if (!returnManuallySet) {
                                                        const autoReturnDate = addDaysToDateString(newDropDate, 8);
                                                        updateDateTime(autoReturnDate, "return", "date");
                                                    }
                                                }}

                                            />
                                            <span className="input-group-text bg-white">
                                                <SlCalender />
                                            </span>
                                        </div>
                                    </div>

                                    {/* DROP-OFF TIME */}
                                    <div className="col-6 col-md-4 col-lg">
                                        <label className="form-label fw-bold">Drop-off Time</label>
                                        <select
                                            className="form-select search-field"
                                            value={dropDateState.split(" ")[1] || "12:00"}
                                            onChange={(e) =>
                                                updateDateTime(e.target.value, "drop", "time")
                                            }
                                        >
                                            {Array.from({ length: 24 }).map((_, i) => {
                                                const hour = String(i).padStart(2, "0");
                                                return (
                                                    <option key={hour} value={`${hour}:00`}>
                                                        {hour}:00
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>

                                    {/* RETURN DATE */}
                                    <div className="col-6 col-md-4 col-lg">
                                        <label className="form-label fw-bold">Return Date</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control search-field"
                                                value={formatPrettyDate(returnDateState.split(" ")[0])}
                                                readOnly
                                                onClick={() =>
                                                    document.getElementById("returnDateNative").showPicker()
                                                }
                                            />
                                            <input
                                                id="returnDateNative"
                                                type="date"
                                                className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                                                value={returnDateState.split(" ")[0]}
                                                min={dropDateState.split(" ")[0]}
                                                onChange={(e) => {
                                                    updateDateTime(e.target.value, "return", "date");
                                                    setReturnManuallySet(true);
                                                }}

                                            />
                                            <span className="input-group-text bg-white">
                                                <SlCalender />
                                            </span>
                                        </div>
                                    </div>

                                    {/* RETURN TIME */}
                                    <div className="col-6 col-md-4 col-lg">
                                        <label className="form-label fw-bold">Return Time</label>
                                        <select
                                            className="form-select search-field"
                                            value={returnDateState.split(" ")[1] || "12:00"}
                                            onChange={(e) =>
                                                updateDateTime(e.target.value, "return", "time")
                                            }
                                        >
                                            {Array.from({ length: 24 }).map((_, i) => {
                                                const hour = String(i).padStart(2, "0");
                                                return (
                                                    <option key={hour} value={`${hour}:00`}>
                                                        {hour}:00
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>

                                    {/* PROMO CODE */}
                                    <div className="col-12 col-md-4 col-lg">
                                        <label className="form-label fw-bold">Promo Code</label>
                                        <input
                                            type="text"
                                            className="form-control search-field"
                                            placeholder="Enter code"
                                            value={promoCode}
                                            onChange={(e) =>
                                                setPromoCode(e.target.value.toUpperCase())
                                            }
                                        />

                                        {promoError && (
                                            <small className="text-danger">{promoError}</small>
                                        )}

                                        {promoData && (
                                            <small className="text-success d-block">
                                                Promo applied: {promoData.discount_value}
                                                {promoData.discount_type === "percentage" ? "%" : "£"} off
                                            </small>
                                        )}
                                    </div>

                                    {/* SEARCH BUTTON */}
                                    <div className="col-12 col-lg-auto d-flex align-items-end">
                                        <button
                                            type="submit"
                                            className="btn btn-primary w-100"
                                            style={{
                                                background: "#062A4F",
                                                border: "none",
                                                height: "48px",
                                                borderRadius: "12px",
                                                padding: "0 40px",
                                                fontWeight: 600
                                            }}
                                        >
                                            Search
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    )}


                    {/* Results Summary + View Toggle */}
                    <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 px-2">

                        {/* LEFT SIDE – RESULT INFO */}
                        <div className="d-flex flex-wrap align-items-center gap-3">
                            <h6 className="mb-0 fw-semibold text" style={{ color: "black" }}>
                                {filteredProducts.length} Airport Parking Found
                            </h6>

                            {appliedAirport && dropDateState && returnDateState && (
                                <span className="text-success fw-medium">
                                    Airport: {appliedAirport},
                                    {" "}Depart: {formatDate(dropDateState)} {dropDateState.split(" ")[1] || "12:00"},
                                    {" "}Return: {formatDate(returnDateState)} {returnDateState.split(" ")[1] || "12:00"}
                                </span>
                            )}
                        </div>

                        {/* RIGHT SIDE – VIEW TOGGLE */}
                        <div className="d-flex gap-2">
                            <button
                                className="btn btn-sm"
                                onClick={() => setViewType("grid")}
                                title="Grid View"
                                style={{
                                    color: viewType === "grid" ? "#fff" : "#062A4F",
                                    backgroundColor: viewType === "grid" ? "#062A4F" : "transparent",
                                    border: "1px solid #062A4F"
                                }}
                            >
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <rect width="6" height="6" x="1" y="1" />
                                    <rect width="6" height="6" x="9" y="1" />
                                    <rect width="6" height="6" x="1" y="9" />
                                    <rect width="6" height="6" x="9" y="9" />
                                </svg>
                            </button>


                            <button
                                className="btn btn-sm"
                                onClick={() => setViewType("list")}
                                title="List View"
                                style={{
                                    color: viewType === "list" ? "#fff" : "#062A4F",
                                    backgroundColor: viewType === "list" ? "#062A4F" : "transparent",
                                    border: "1px solid #062A4F"
                                }}
                            >
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <rect width="12" height="2" x="2" y="2" />
                                    <rect width="12" height="2" x="2" y="7" />
                                    <rect width="12" height="2" x="2" y="12" />
                                </svg>
                            </button>

                        </div>
                    </div>


                    <div className="row g-4 align-items-stretch">
                        {filteredProducts.length === 0 ? (
                            <h4 className="text-center text-muted"></h4>
                        ) : (
                            filteredProducts.map((item) => (
                                <div
                                    className={
                                        viewType === "grid"
                                            ? "col-12 col-sm-6 col-lg-3"
                                            : "col-12"
                                    }
                                    key={item.id}
                                >



                                    {viewType === "list" ? (
                                        <div className="pricing-card border-2 p-4 d-flex flex-column flex-lg-row align-items-start gap-4">

                                            {/* LEFT – IMAGE */}
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={
                                                        item.image_data ||
                                                        "https://blog.getmyparking.com/wp-content/uploads/2018/07/airport-parking-1.jpg"
                                                    }
                                                    alt={item.product_name}
                                                    style={{
                                                        width: "140px",
                                                        height: "80px",
                                                        objectFit: "contain"
                                                    }}
                                                />
                                            </div>

                                            {/* CENTER – DETAILS */}
                                            <div className="flex-grow-1">

                                                {/* Service Type */}
                                                <div style={{ color: "#062A4F" }} className="fw-semibold mb-1">
                                                    {item.service_type || "Park & Ride Service"}
                                                </div>

                                                {/* Product Name */}
                                                <h5 className="fw-bold mb-3">
                                                    {item.product_name}
                                                </h5>

                                                {/* FEATURES */}
                                                <ul className="list-unstyled mb-2">

                                                    <li className="d-flex align-items-center mb-2">
                                                        <IoIosBusiness style={{ color: "#062A4F" }} className="me-2" />
                                                        Serving all {item.airport_name} terminals
                                                    </li>

                                                    <li className="d-flex align-items-center mb-2">
                                                        <IoIosTime style={{ color: "#062A4F" }} className="me-2" />
                                                        Operating Hours – {formatTime(item.operational_from)} to {formatTime(item.operational_to)}
                                                    </li>

                                                    <li className="d-flex align-items-center mb-2">
                                                        <IoIosCash style={{ color: "#062A4F" }} className="me-2" />
                                                        Airport Charges {item.booking_fees > 0 ? "Not Included" : "Included"}
                                                    </li>

                                                    {item.product_extra && (
                                                        <li className="d-flex align-items-center mb-2">
                                                            <IoIosAddCircle style={{ color: "#062A4F" }} className="me-2" />
                                                            {item.product_extra}
                                                        </li>
                                                    )}
                                                </ul>

                                                {/* Cancellation */}
                                                <div className="text-success fst-italic mb-2">
                                                    Cancellation Cover Available
                                                </div>

                                                {/* Reviews */}
                                                <div className="d-flex align-items-center gap-1">
                                                    <IoIosStar className="text-warning" />
                                                    <IoIosStar className="text-warning" />
                                                    <IoIosStar className="text-warning" />
                                                    <IoIosStar className="text-warning" />
                                                    <IoIosStar className="text-secondary" />
                                                    <span className="ms-2 text-muted">(1 review)</span>
                                                </div>
                                            </div>

                                            {/* RIGHT – PRICE + CTA */}
                                            <div className="text-end ms-lg-auto">

                                                {(() => {
                                                    const basePrice = Number(pricing[item.id] || 0);
                                                    let finalPrice = basePrice;

                                                    if (promoData) {
                                                        finalPrice =
                                                            promoData.discount_type === "percentage"
                                                                ? basePrice - (basePrice * Number(promoData.discount_value)) / 100
                                                                : basePrice - Number(promoData.discount_value);
                                                    }

                                                    return (
                                                        <>
                                                            {promoData && (
                                                                <small className="text-muted text-decoration-line-through d-block">
                                                                    £{basePrice.toFixed(2)}
                                                                </small>
                                                            )}

                                                            <h4 style={{ color: "#062A4F" }} className="fw-bold mb-3">
                                                                £{finalPrice.toFixed(2)}
                                                            </h4>
                                                        </>
                                                    );
                                                })()}

                                                {/* ACTION BUTTONS */}
                                                <div className="d-flex justify-content-end align-items-center gap-2">

                                                    {/* Read More */}
                                                    <FaInfoCircle
                                                        size={18}
                                                        title="Read more"
                                                        style={{
                                                            cursor: "pointer",
                                                            color: "#062A4F"
                                                        }}
                                                        onClick={() =>
                                                            navigate(`/product-details/${item.id}`, {
                                                                state: {
                                                                    product: item,
                                                                    pricing: pricing[item.id],
                                                                    dropDate: dropDateState,
                                                                    returnDate: returnDateState,
                                                                    airport: selectedAirport,
                                                                },
                                                            })
                                                        }
                                                    />

                                                    {/* Select Parking */}
                                                    <button
                                                        style={{ background: "#062A4F" }}
                                                        className="btn text-white px-4 py-2 fw-semibold"
                                                        onClick={() => {
                                                            const basePrice = Number(pricing[item.id]);
                                                            const discountAmount = promoData
                                                                ? promoData.discount_type === "percentage"
                                                                    ? (basePrice * Number(promoData.discount_value)) / 100
                                                                    : Number(promoData.discount_value)
                                                                : 0;

                                                            navigate("/booking-form", {
                                                                state: {
                                                                    productId: item.id,
                                                                    dropDate: dropDateState,
                                                                    returnDate: returnDateState,
                                                                    travelling_from: selectedAirport,
                                                                    basePrice,
                                                                    discountAmount,
                                                                    finalPrice: Math.max(0, basePrice - discountAmount),

                                                                },
                                                            });
                                                        }}
                                                    >
                                                        Select Parking
                                                    </button>

                                                </div>
                                            </div>

                                        </div>

                                    ) : (
                                        <div className="pricing-card">
                                            <img
                                                src={
                                                    item.image_data
                                                        ? item.image_data
                                                        : "https://blog.getmyparking.com/wp-content/uploads/2018/07/airport-parking-1.jpg"
                                                }
                                                className="img-fluid  w-100"
                                                style={{ height: "140px", objectFit: "cover" }}
                                                alt={item.product_name}
                                                loading="lazy"
                                            />

                                            <div className="mt-3"></div>

                                            <ul className="pricing-list list-unstyled">

                                                {/* Airport Name */}
                                                <li className="d-flex align-items-start mb-2">
                                                    <IoIosCheckmarkCircle style={{ color: "#062A4F" }} className="list-icon me-2 mt-1" />
                                                    <span>
                                                        {item.point_1}
                                                    </span>
                                                </li>

                                                {/* Operating Hours */}
                                                <li className="d-flex align-items-start mb-2">
                                                    <IoIosCheckmarkCircle style={{ color: "#062A4F" }} className="list-icon me-2 mt-1" />
                                                    <span>
                                                        {item.point_2}
                                                    </span>
                                                </li>




                                                {/* Airport Charges */}
                                                <li className="d-flex align-items-start mb-2">
                                                    <IoIosCheckmarkCircle style={{ color: "#062A4F" }} className="list-icon me-2 mt-1" />
                                                    <span>
                                                        {item.point_3}
                                                    </span>
                                                </li>

                                                {/* Product Extra */}
                                                <li className="d-flex align-items-start mb-2">
                                                    <IoIosCheckmarkCircle style={{ color: "#062A4F" }} className="list-icon me-2 mt-1" />
                                                    <span>
                                                        {item.point_4}
                                                    </span>
                                                </li>

                                                {/* Status */}
                                                <li className="d-flex align-items-start">
                                                    <IoIosCheckmarkCircle style={{ color: "#062A4F" }} className="list-icon me-2 mt-1" />
                                                    <span>
                                                        <span
                                                        >
                                                            {item.point_5}
                                                        </span>
                                                    </span>
                                                </li>

                                                <li className="d-flex align-items-start">
                                                    <IoIosCheckmarkCircle style={{ color: "#062A4F" }} className="list-icon me-2 mt-1" />
                                                    <span>
                                                        <span
                                                        >
                                                            {item.point_6}
                                                        </span>
                                                    </span>
                                                </li>

                                                {/* Reviews */}
                                                <li className="d-flex align-items-start mb-2">
                                                    <IoIosStar style={{ color: "#062A4F" }} className="list-icon me-2 mt-1" />
                                                    <span>
                                                        <strong>Reviews:</strong>{" "}
                                                        <span className="text-warning ms-1">
                                                            ★★★★☆
                                                        </span>{" "}
                                                        <small className="text-muted">(4.0)</small>
                                                    </span>
                                                </li>

                                            </ul>


                                            <hr />

                                            <div className="pricing-footer">
                                                {(() => {
                                                    const basePriceRaw = pricing[item.id];
                                                    if (!basePriceRaw) return null;

                                                    const basePrice = Number(basePriceRaw);
                                                    let finalPrice = basePrice;

                                                    if (promoData) {
                                                        if (promoData.discount_type === "percentage") {
                                                            finalPrice =
                                                                basePrice -
                                                                (basePrice * Number(promoData.discount_value)) / 100;
                                                        } else {
                                                            finalPrice =
                                                                basePrice - Number(promoData.discount_value);
                                                        }
                                                    }

                                                    return (
                                                        <>
                                                            {promoData && (
                                                                <small className="text-muted text-decoration-line-through">
                                                                    £{basePrice.toFixed(2)}
                                                                </small>
                                                            )}
                                                            <h3 className="pricing-tag">
                                                                £{finalPrice.toFixed(2)}
                                                            </h3>
                                                        </>
                                                    );
                                                })()}

                                                <div className="d-flex align-items-center gap-2">
                                                    {/* Read More Icon */}
                                                    <FaInfoCircle
                                                        size={18}
                                                        title="Read more"
                                                        style={{
                                                            cursor: "pointer",
                                                            color: "#062A4F",
                                                            transition: "transform 0.2s ease, color 0.2s ease",
                                                        }}
                                                        onClick={() =>
                                                            navigate(`/product-details/${item.id}`, {
                                                                state: {
                                                                    product: item,          // ✅ FULL product object
                                                                    pricing: pricing[item.id],
                                                                    dropDate: dropDateState,
                                                                    returnDate: returnDateState,
                                                                    airport: selectedAirport,
                                                                },
                                                            })
                                                        }
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.color = "#ffa200";
                                                            e.currentTarget.style.transform = "scale(1.15)";
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.color = "#391B63";
                                                            e.currentTarget.style.transform = "scale(1)";
                                                        }}
                                                    />


                                                    {/* Book Now Button */}
                                                    <button
                                                        className="btn text-white btn-sm"
                                                        style={{ background: "#062A4F" }}
                                                        onClick={() => {
                                                            const basePrice = Number(pricing[item.id]);

                                                            const discountAmount = promoData
                                                                ? promoData.discount_type === "percentage"
                                                                    ? (basePrice *
                                                                        Number(
                                                                            promoData.discount_value
                                                                        )) /
                                                                    100
                                                                    : Number(promoData.discount_value)
                                                                : 0;

                                                            const finalPrice = Math.max(
                                                                0,
                                                                basePrice - discountAmount
                                                            );

                                                            navigate("/booking-form", {
                                                                state: {
                                                                    productId: item.id,
                                                                    dropDate: dropDateState,
                                                                    returnDate: returnDateState,
                                                                    travelling_from: selectedAirport,
                                                                    promo: promoData,
                                                                    basePrice: basePrice,
                                                                    discountAmount: discountAmount,
                                                                    finalPrice: finalPrice,
                                                                    product_overview: item.product_overview,
                                                                    product_description: item.product_description,
                                                                    dropoff_procedure: item.dropoff_procedure,
                                                                },
                                                            });
                                                        }}
                                                    >
                                                        Book Now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            ))
                        )}
                    </div>

                </div>
            </div>

            <Footer />
            <Copyright />
        </>
    )
}

export default ProductData;
