import { useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function MyBookingsData({ onSuccess }) {
    const [searchType, setSearchType] = useState("");
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-6">

                    <h3 className="mb-4 text-center">Manage Your Booking</h3>

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
                            onChange={(e) => setSearchType(e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="email">Email Address</option>
                            <option value="booking">Booking Reference</option>
                            <option value="vehicle">Vehicle Registration</option>
                            <option value="mobile">Mobile Number</option>
                        </select>
                    </div>

                    {searchType && (
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
                            />
                        </div>
                    )}

                    {error && <div className="alert alert-danger">{error}</div>}

                    <button
                        className="btn text-white w-100 mb-4"
                        style={{ background: "#3A1672" }}
                        onClick={async () => {
                            setError("");

                            if (!searchType || !value) {
                                setError("Please select search option and enter value");
                                return;
                            }

                            const res = await fetch(`${API}/api/search-booking`, {
                                method: "POST",
                                credentials: "include",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ searchType, value }),
                            });

                            if (res.ok) {
                                const data = await res.json();
                                onSuccess(data.bookingId);
                            } else {
                                setError(
                                    searchType === "email"
                                        ? "Email not found. Try another method."
                                        : "Invalid booking details"
                                );
                            }
                        }}
                    >
                        Search Booking
                    </button>

                    <h5 className="fw-bold">Helpline: 0333 0000 000</h5>
                    <p className="text-muted">Office Hours: Mon – Fri 9:00 – 17:00</p>
                </div>
            </div>
        </div>
    );
}
