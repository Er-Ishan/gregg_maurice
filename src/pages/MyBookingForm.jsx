import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../component/Topbar";
import NavbarElement from "../component/NavbarElement";
import Footer from "../component/Footer";
import Copyright from "../component/Copyright";

const API = import.meta.env.VITE_API_URL;

export default function MyBookingForm() {
    const [searchType, setSearchType] = useState("email");
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [bookings, setBookings] = useState([]);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSearch = async () => {
        setError("");
        setBookings([]);

        if (!searchType || !value.trim()) {
            setError("Please select search option and enter value");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch(`${API}/api/search-booking`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    searchType,
                    value: value.trim(),
                }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.message);
            }

            // ✅ STORE RESULTS
            setBookings(data.bookings);
        } catch (err) {
            setError(
                searchType === "email"
                    ? "No booking found for this email."
                    : "Invalid booking details."
            );
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <Topbar />
            <NavbarElement />

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-6">
                        <div className="border rounded-0 p-4">

                            <h3 className="mb-4 text-center" style={{ color: "#3A1672" }}>
                                Manage Your Booking
                            </h3>

                            <div className="alert alert-warning">
                                Enter email address used at the time of booking and select option to search booking.
                            </div>

                            <div className="mb-4">
                                <label className="form-label">
                                    Search Options <span className="text-danger">*</span>
                                </label>
                                <select
                                    className="form-select"
                                    value={searchType}
                                    onChange={(e) => {
                                        setSearchType(e.target.value);
                                        setValue("");
                                        setError("");
                                    }}
                                >
                                    <option value="">Select</option>
                                    <option value="email">Email Address</option>
                                    <option value="booking">Booking Reference</option>
                                    <option value="vehicle">Vehicle Registration</option>
                                    <option value="mobile">Mobile Number</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="form-label">
                                    {searchType === "email"
                                        ? "Email Address"
                                        : searchType === "booking"
                                            ? "Booking Reference"
                                            : searchType === "vehicle"
                                                ? "Vehicle Registration"
                                                : "Mobile Number"}{" "}
                                    <span className="text-danger">*</span>
                                </label>

                                <input
                                    type={searchType === "email" ? "email" : "text"}
                                    className="form-control"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    disabled={loading}
                                    autoComplete="off"
                                />
                            </div>


                            {error && (
                                <div className="alert alert-danger">{error}</div>
                            )}

                            <button
                                className="btn text-white w-100 mb-4"
                                style={{ background: "#3A1672" }}
                                onClick={handleSearch}
                                disabled={loading}
                            >
                                {loading ? "Searching..." : "Search Booking"}
                            </button>

                            <h5 className="fw-bold">Helpline: 0333 0000 000</h5>
                            <p className="text-muted mb-0">
                                Office Hours: Mon – Fri 9:00 – 17:00
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
            <Copyright />
        </>
    );
}
