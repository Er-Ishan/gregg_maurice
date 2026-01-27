import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";
import { SlCalender, SlClock, SlPlane } from "react-icons/sl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import heroImage from "../assets/asian-airport.jpg";
import formImage from "../assets/form-bg.jpg";

const API = import.meta.env.VITE_API_URL;

function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatPrettyDate(dateStr) {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-");
    return `${MONTHS[Number(m) - 1]} ${Number(d)}, ${y}`;
}


function addDaysToDateString(dateStr, days) {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return formatDateForInput(d);
}


function formatDateOnly(date) {
    return date;
}


function combineDateTime(date, time) {
    return `${date} ${time}:00`; // format: 2025-02-10 12:00:00
}


function formatDateForInput(date) {
    // yyyy-mm-dd for <input type="date">
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function formatDateDDMMYYYY(dateStr) {
    // expects yyyy-mm-dd
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
}


export default function Hero() {
    // compute defaults only once
    const defaultDropDate = (() => {
        const now = new Date();
        const drop = addDays(now, 2); // 48 hours ahead
        return formatDateForInput(drop);
    })();

    const defaultReturnDate = (() => {
        const now = new Date();
        const drop = addDays(now, 2);        // same drop as above
        const ret = addDays(drop, 8);        // 8 days after drop
        return formatDateForInput(ret);
    })();

    const refreshPricing = () => {
        if (!dropDate || !returnDate) return;

        const fullDrop = `${dropDate} ${dropTime}`;
        const fullReturn = `${returnDate} ${returnTime}`;

        localStorage.setItem("dropDate", fullDrop);
        localStorage.setItem("returnDate", fullReturn);


        setPricing({});
        fetchAllProducts();
    };


    // const [dropDate, setDropDate] = useState(defaultDropDate);
    // const [returnDate, setReturnDate] = useState(defaultReturnDate);

    // const [dropDate, setDropDate] = useState(() => addDays(new Date(), 2));
    // const [returnDate, setReturnDate] = useState(() => addDays(addDays(new Date(), 2), 8));

    const [dropDate, setDropDate] = useState(defaultDropDate);
    const [returnDate, setReturnDate] = useState(defaultReturnDate);
    const [promoCode, setPromoCode] = useState("");


    function formatForBackend(date) {
        return date.toISOString().split("T")[0]; // yyyy-mm-dd
    }


    const [airportList, setAirportList] = useState([]);


    useEffect(() => {
        fetch(`${API}/api/data/airports`)
            .then((res) => res.json())
            .then((data) => {
                // 🔐 SAFETY: ensure array
                if (Array.isArray(data)) {
                    setAirportList(data);
                } else if (Array.isArray(data.data)) {
                    setAirportList(data.data);
                } else if (Array.isArray(data.airports)) {
                    setAirportList(data.airports);
                } else {
                    console.error("Unexpected airport API response:", data);
                    setAirportList([]); // prevent crash
                }
            })
            .catch((err) => {
                console.error("Airport fetch error:", err);
                setAirportList([]);
            });
    }, []);


    const [airport, setAirport] = useState("Heathrow");



    // time defaults
    const [dropTime, setDropTime] = useState("12:00");
    const [returnTime, setReturnTime] = useState("12:00");

    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();

        if (!dropDate || !returnDate) {
            alert("Please select both dates!");
            return;
        }

        const dropDateStr = formatDateOnly(dropDate);
        const returnDateStr = formatDateOnly(returnDate);

        localStorage.setItem("dropDate", `${dropDateStr} ${dropTime}`);
        localStorage.setItem("returnDate", `${returnDateStr} ${returnTime}`);
        localStorage.setItem("selectedAirport", airport);


        // ✅ SAVE PROMO
        if (promoCode.trim()) {
            localStorage.setItem("promoCode", promoCode.trim());
        } else {
            localStorage.removeItem("promoCode");
        }

        navigate("/product");
    };

    const [returnManuallySet, setReturnManuallySet] = useState(false);


    return (
        <section id="hero">
            <div className="header-carousel">
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
                        background:#3A1672;
                    }

                    .pricing-wrapper {
                        background: linear-gradient(to bottom, #eef3ff, #e3e9ff);
                        padding: 70px 0;
                    }
                    .pricing-card {
                        background: #ffffff;
                        border-radius: 20px;
                        padding: 18px;
                        border: 1px solid #e9e9e9;
                        transition: 0.3s;
                        height: 100%;
                    }
                    .pricing-card:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 10px 28px rgba(0,0,0,0.06);
                    }
                    .pricing-tag {
                        font-size:26px;
                        font-weight:700;
                        color:#3a1672;
                    }

                    .search-field {
                        height: 48px !important;
                        font-size: 14px;
                        border: 1px solid #d6d6e0 !important;
                    }

                    .input-group .form-control {
                        border-right: 0 !important;
                    }

                    .input-group-text {
                        border: 1px solid #d6d6e0 !important;
                        border-left: 0 !important;
                        cursor: pointer;
                    }

                    .form-label {
                        font-size: 14px;
                        color: #1B1B1D;
                    }

                    .row.g-3 > div {
                        padding-right: 12px;
                        padding-left: 12px;
                    }

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

                    button.btn.btn-primary {
                        font-size: 15px;
                        font-weight: 600;
                        padding: 11px 32px !important;
                    }

                    .input-group-text {
                        pointer-events: none !important;
                    }

                    input[type="date"]::-webkit-calendar-picker-indicator {
                        opacity: 0 !important;
                        cursor: pointer;
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        left: 0;
                    }

                    input[type="date"] {
                        position: relative;
                        z-index: 2;
                        cursor: pointer;
                    }

                    /* ===============================
   FIX react-datepicker + Bootstrap
   =============================== */

/* Force DatePicker to behave like a normal input */
.react-datepicker-wrapper,
.react-datepicker__input-container {
  width: 100%;
}

.react-datepicker__input-container input {
  width: 100%;
  box-sizing: border-box;
}

/* Prevent mobile horizontal overflow */
.formdata {
  max-width: 100%;
  overflow-x: hidden;
}

/* Safer icon sizing on mobile */
.input-group-text {
  pointer-events: none;
  min-width: 44px;
  justify-content: center;
}

/* Mobile spacing fix */
@media (max-width: 768px) {
  .formdata {
    padding: 16px !important;
  }

  .form-label {
    font-size: 13px;
  }

  .form-control,
  .form-select {
    font-size: 20px;
  }


    .hero-image-wrapper {
  position: relative;
}

.hero-image-wrapper::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6); /* adjust darkness */
  z-index: 1;
}

/* Make sure captions/content stay above overlay */
.carousel-caption,
.hero-image-wrapper img {
  position: relative;
  z-index: 2;
}

/* Normalize TIME font ONLY on mobile */
@media (max-width: 768px) {
  .form-select.form-select-lg {
    font-size: 16px !important;
    line-height: 1.5;
    height: calc(1.5em + 1rem + 2px);
  }
}

/* Responsive fix for custom date inputs */
@media (max-width: 991px) {
  .position-relative input[type="text"] {
    width: 100%;
  }

  .position-relative input[type="date"] {
    width: 100%;
  }
}
/* Make date text look EXACTLY like time select */
.pretty-date-input {
  font-family: inherit;
  font-size: 16px;
  line-height: 1.5;
  height: calc(1.5em + 1rem + 2px);
}


}

                `}
                </style>

                <div
                    id="carouselId"
                    className="carousel slide"
                    data-bs-ride="carousel"
                    data-bs-interval="false"
                >
                    <div className="carousel-inner" role="listbox">
                        <div className="carousel-item active">
                            <div className="hero-image-wrapper">
                                <img
                                    src={heroImage}
                                    className="img-fluid w-100"
                                    alt="First slide"
                                />
                            </div>


                            <div className="carousel-caption">
                                <div className="container py-4">
                                    <div className="row g-3">
                                        <div
                                            className="col-lg-5 col-md-5"
                                            data-animation="fadeInLeft"
                                            data-delay="1s"
                                            style={{ animationDelay: "1s" }}
                                        >
                                            <div
                                                className="formdata rounded p-1 p-5 position-relative overflow-hidden"
                                                
                                            >

                                                <h1> Gregg Maurice Parking </h1>

                                                <form onSubmit={handleSearch}>
                                                    <div className="row g-2">
                                                        <div className="col-12">
                                                            <label className="form-label text-white fw-semibold mb-1 text-start w-100 ps-1">
                                                                Airport
                                                            </label>

                                                            <select
                                                                className="form-select form-select-lg"
                                                                value={airport}
                                                                onChange={(e) => setAirport(e.target.value)}
                                                            >
                                                                <option value="Heathrow">Heathrow</option>
                                                                <option value="Gatwick">Gatwick</option>
                                                            </select>

                                                        </div>


                                                        <div className="col-12 col-md-7">
                                                            <label className="form-label text-white fw-semibold mb-1 text-start w-100 ps-1">
                                                                Drop-Off Date
                                                            </label>

                                                            <div className="input-group ">

                                                                <div className="position-relative w-100">
                                                                    {/* Visible formatted input */}
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-lg"
                                                                        value={formatPrettyDate(dropDate)}

                                                                        onClick={() => document.getElementById("dropDateNative").showPicker()}
                                                                    />

                                                                    {/* Hidden native date picker */}
                                                                    <input
                                                                        id="dropDateNative"
                                                                        type="date"
                                                                        className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                                                                        value={dropDate}
                                                                        min={formatDateForInput(new Date())}
                                                                        onChange={(e) => {
                                                                            const newDrop = e.target.value;
                                                                            setDropDate(newDrop);

                                                                            if (!returnManuallySet) {
                                                                                const autoReturn = addDaysToDateString(newDrop, 8);
                                                                                setReturnDate(autoReturn);
                                                                            }
                                                                        }}

                                                                    />
                                                                </div>


                                                            </div>
                                                        </div>

                                                        <div className="col-12 col-md-5">
                                                            <label className="form-label text-white fw-semibold mb-1 text-start w-100 ps-1">
                                                                Time
                                                            </label>

                                                            <div className="input-group input-group-lg">
                                                                <select
                                                                    className="form-select"
                                                                    value={dropTime}
                                                                    onChange={(e) => setDropTime(e.target.value)}
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
                                                                <span className="input-group-text bg-white">
                                                                    <SlClock />
                                                                </span>
                                                            </div>
                                                        </div>



                                                        {/* Return Date */}
                                                        <div className="col-12 col-md-7">
                                                            <label className="form-label text-white fw-semibold mb-1 text-start w-100 ps-1">
                                                                Return Date
                                                            </label>

                                                            <div className="input-group">


                                                                <div className="position-relative w-100">
                                                                    {/* Visible formatted input */}
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-lg"
                                                                        value={formatPrettyDate(returnDate)}

                                                                        onClick={() => document.getElementById("returnDateNative").showPicker()}
                                                                    />

                                                                    {/* Hidden native date picker */}
                                                                    <input
                                                                        id="returnDateNative"
                                                                        type="date"
                                                                        className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                                                                        value={returnDate}
                                                                        min={dropDate}
                                                                        onChange={(e) => {
                                                                            setReturnDate(e.target.value);
                                                                            setReturnManuallySet(true);
                                                                        }}

                                                                    />
                                                                </div>


                                                            </div>
                                                        </div>

                                                        <div className="col-12 col-md-5">
                                                            <label className="form-label text-white fw-semibold mb-1 text-start w-100 ps-1">
                                                                Time
                                                            </label>

                                                            <div className="input-group input-group-lg">
                                                                <select
                                                                    className="form-select"
                                                                    value={returnTime}
                                                                    onChange={(e) => setReturnTime(e.target.value)}
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
                                                                <span className="input-group-text bg-white">
                                                                    <SlClock />
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="col-12">
                                                            <label className="form-label text-white fw-semibold mb-1 text-start w-100 ps-1">
                                                                Promo Code (optional)
                                                            </label>

                                                            <input
                                                                type="text"
                                                                className="form-control form-control-lg"
                                                                placeholder="Enter promo code"
                                                                value={promoCode}
                                                                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                                            />
                                                        </div>



                                                        {/* Submit */}
                                                        <div className="col-12 mt-4">
                                                            <button
                                                                type="submit"
                                                                style={{ background: "#ffa200" }}
                                                                className="btn w-100 fw-bold py-2"
                                                            >
                                                                Get Parking Quote
                                                            </button>
                                                        </div>

                                                    </div>
                                                </form>
                                            </div>


                                        </div>

                                        <div className="col-lg-1" />

                                        <div
                                            className="col-lg-6 d-none d-lg-flex fadeInRight animated align-items-right"
                                            data-animation="fadeInRight"
                                            data-delay="1s"
                                            style={{ animationDelay: "1s" }}
                                        >
                                            <div className="text-start w-100">
                                                {/* SEO PRIMARY HEADING */}
                                                <h2 className="text-white fw-bold mb-3">
                                                    Secure & Affordable Heathrow & Gatwick Airport Parking
                                                </h2>

                                                {/* SEO OPTIMIZED, JUSTIFIED TEXT */}
                                                <p
                                                    className="text-white"
                                                    style={{
                                                        textAlign: "justify",
                                                        lineHeight: "1.7",
                                                        maxWidth: "95%",
                                                    }}
                                                >
                                                    Make your trip easier with secure, simple, and affordable
                                                    parking at Heathrow & Gatwick Airport. Whether you need Park &amp;
                                                    Ride, Park &amp; Valet, or Self Park, we offer reliable
                                                    services that keep your journey smooth from start to finish.
                                                    Book early to secure the best price.
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
