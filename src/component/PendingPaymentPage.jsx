import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    useStripe,
    useElements,
    CardElement
} from "@stripe/react-stripe-js";

import Topbar from "../component/Topbar";
import NavbarElement from "../component/NavbarElement";
import Footer from "../component/Footer";
import Copyright from "../component/Copyright";

const API = import.meta.env.VITE_API_URL;

const PendingPaymentPage = () => {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const [booking, setBooking] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);

    // 🔹 Fetch booking by ID
    useEffect(() => {
        fetch(`${API}/api/booking/${bookingId}`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (!data?.id) {
                    alert("Invalid booking");
                    navigate("/");
                    return;
                }
                setBooking(data);
            })
            .catch(() => {
                alert("Failed to load booking");
                navigate("/");
            });
    }, [bookingId, navigate]);

    // 🔹 Create payment intent
    useEffect(() => {
        if (!booking) return;

        fetch(`${API}/api/stripe/create-payment-intent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                amount: Math.round(Number(booking.total_payable) * 100)
            })
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret));
    }, [booking]);

    // 🔹 Submit payment
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setLoading(true);

        const { paymentIntent, error } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

        if (error) {
            alert(error.message);
            setLoading(false);
            return;
        }

        // 🔹 Save payment result
        const payload = {
            booking_id: booking.id,
            transaction_id: paymentIntent.id,
            payment_method: "Stripe",
            paid_amount: booking.total_payable,
            status: "Paid",
        };

        const resp = await fetch(`${API}/api/create-booking-after-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const result = await resp.json();

        if (result.success) {
            navigate("/thank-you", {
                state: {
                    bookingData: {
                        ...booking,
                        status: "Paid"
                    }
                }
            });
        } else {
            alert("Payment succeeded but failed to save booking");
        }

        setLoading(false);
    };

    if (!booking) return null;

    return (
        <>
            <Topbar />
            <NavbarElement />

            <div className="container my-5">
                <h3 className="fw-bold text-center mb-4">
                    Complete Payment
                </h3>

                <div className="row justify-content-center">
                    <div className="col-lg-5">

                        {/* SUMMARY */}
                        <div className="card p-4 mb-4">
                            <h5 className="fw-bold mb-3">Booking Summary</h5>
                            <p><strong>Reference:</strong> {booking.ref_no}</p>
                            <p><strong>Vehicle:</strong> {booking.vehicle_make} - {booking.vehicle_registration}</p>
                            <p><strong>Total:</strong> £{booking.total_payable}</p>
                        </div>

                        {/* PAYMENT */}
                        <div className="card p-4">
                            <form onSubmit={handleSubmit}>
                                <label className="fw-semibold mb-2">
                                    Card Details
                                </label>

                                <div className="form-control mb-3 p-3">
                                    <CardElement />
                                </div>

                                <button
                                    className="btn btn-success w-100"
                                    disabled={loading}
                                >
                                    {loading ? "Processing..." : `Pay £${booking.total_payable}`}
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
            <Copyright />
        </>
    );
};

export default PendingPaymentPage;
