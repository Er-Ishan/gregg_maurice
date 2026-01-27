import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./retry-payment.css";
import {
    useStripe,
    useElements,
    CardElement,
    PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";

import NavbarElement from "../component/NavbarElement";
import Footer from "../component/Footer";
import Copyright from "../component/Copyright";
import Topbar from "./Topbar";

const API = import.meta.env.VITE_API_URL;

const PAYMENT_WINDOW_MS = 60 * 60 * 1000; // ⏱ 1 hour

const RetryPaymentPage = () => {
    const { bookingId } = useParams();
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const [bookingData, setBookingData] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);

    const [paymentRequest, setPaymentRequest] = useState(null);
    const [selectedMethod, setSelectedMethod] = useState("card");

    // ⏱ Timer states
    const [expiryTime, setExpiryTime] = useState(null);
    const [remainingTime, setRemainingTime] = useState(0);
    const [isExpired, setIsExpired] = useState(false);

    const isWalletSelected =
        selectedMethod === "applepay" || selectedMethod === "gpay";

    // 1️⃣ Fetch booking
    useEffect(() => {
        fetch(`${API}/api/booking/${bookingId}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setBookingData(data.data);

                    // ⏱ Calculate expiry (created_at preferred)
                    const baseTime = data.data.created_at
                        ? new Date(data.data.created_at).getTime()
                        : Date.now();

                    setExpiryTime(baseTime + PAYMENT_WINDOW_MS);
                } else {
                    navigate("/product");
                }
            })
            .catch(() => navigate("/product"));
    }, [bookingId]);

    // 1️⃣⏱ Countdown timer
    useEffect(() => {
        if (!expiryTime) return;

        const timer = setInterval(() => {
            const now = Date.now();
            const diff = expiryTime - now;

            if (diff <= 0) {
                setRemainingTime(0);
                setIsExpired(true);
                clearInterval(timer);
            } else {
                setRemainingTime(diff);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [expiryTime]);

    // 2️⃣ Create / reuse payment intent
    useEffect(() => {
        if (!bookingData || isExpired) return;

        fetch(`${API}/api/stripe/create-payment-intent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                amount: Math.round(Number(bookingData.total_payable) * 100),
                payment_intent_id: bookingData.payment_intent_id || null,
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.clientSecret) {
                    setClientSecret(data.clientSecret);
                }
            });
    }, [bookingData, isExpired]);

    // 3️⃣ Wallet payments
    useEffect(() => {
        if (!stripe || !clientSecret || !bookingData || isExpired) return;

        const pr = stripe.paymentRequest({
            country: "GB",
            currency: "gbp",
            total: {
                label: bookingData.product_name,
                amount: Math.round(Number(bookingData.total_payable) * 100),
            },
            requestPayerName: true,
            requestPayerEmail: true,
        });

        pr.canMakePayment().then(result => {
            if (result?.googlePay || result?.applePay) {
                setPaymentRequest(pr);
            }
        });

        pr.on("paymentmethod", async e => {
            if (!isWalletSelected || isExpired) {
                e.complete("fail");
                return;
            }

            const { error, paymentIntent } =
                await stripe.confirmCardPayment(
                    clientSecret,
                    { payment_method: e.paymentMethod.id },
                    { handleActions: false }
                );

            if (error) {
                e.complete("fail");
                return;
            }

            e.complete("success");

            if (paymentIntent.status === "succeeded") {
                handleSuccess(paymentIntent);
            }
        });
    }, [stripe, clientSecret, selectedMethod, isExpired]);

    // 4️⃣ Card submit
    const handleSubmit = async e => {
        e.preventDefault();

        if (!stripe || !elements || !clientSecret || isExpired) return;

        setLoading(true);

        const cardElement = elements.getElement(CardElement);

        const { error, paymentIntent } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: `${bookingData.first_name} ${bookingData.last_name}`,
                        email: bookingData.email,
                    },
                },
            });

        if (!error && paymentIntent.status === "succeeded") {
            handleSuccess(paymentIntent);
        }

        setLoading(false);
    };

    // 5️⃣ Success handler (extra data added)
    const handleSuccess = async paymentIntent => {
        const payload = {
            booking_id: bookingData.id,
            transaction_id: paymentIntent.id,
            payment_method_id: paymentIntent.payment_method,
            payment_completed_at: new Date().toISOString(),
            payment_validity_minutes: 60,
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
                        ...bookingData,
                        transaction_id: paymentIntent.id,
                    },
                },
            });
        }
    };

    if (!bookingData) return null;

    // ⏱ Format timer
    const minutes = String(Math.floor(remainingTime / 60000)).padStart(2, "0");
    const seconds = String(
        Math.floor((remainingTime % 60000) / 1000)
    ).padStart(2, "0");

    return (
        <>
            {/* <Topbar /> */}
            <NavbarElement />

            <div className="container my-4">
                <div className="text-center mb-4">
                    <h3 className="fw-bold">Retry & Complete Payment</h3>
                    <p className="text-muted small">
                        Secure your booking by completing the payment below
                    </p>
                </div>

                <div className="row g-4 justify-content-center">

                    {/* LEFT: BOOKING DETAILS */}
                    <div className="col-lg-5 col-md-6">
                        <div className="card shadow-sm p-4 h-100">
                            <h5 className="fw-bold mb-3 text-center">Booking Summary</h5>

                            <div className="table-responsive">
                                <table className="table table-borderless align-middle mb-0">
                                    <tbody className="small">
                                       
                                        <tr>
                                            <th className="text-muted">Product</th>
                                            <td>{bookingData.product_name}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-muted">Drop-off</th>
                                            <td>{bookingData.drop_off_date}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-muted">Return</th>
                                            <td>{bookingData.return_date}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-muted">Name</th>
                                            <td>
                                                {bookingData.first_name} {bookingData.last_name}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="text-muted">Email</th>
                                            <td>{bookingData.email}</td>
                                        </tr>
                                        <tr className="border-top">
                                            <th className="fw-bold">Total Payable</th>
                                            <td className="fw-bold text-success fs-5">
                                                £{bookingData.total_payable}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: PAYMENT */}
                    <div className="col-lg-5 col-md-6">
                        <div className="card shadow-sm p-4 h-100">
                            <h5 className="fw-bold mb-3 text-center">Payment Details</h5>

                            {/* Wallets */}
                            {isWalletSelected && paymentRequest && (
                                <div className="mb-3">
                                    <PaymentRequestButtonElement options={{ paymentRequest }} />
                                </div>
                            )}

                            {/* Card */}
                            {selectedMethod === "card" && (
                                <form onSubmit={handleSubmit}>
                                    <label className="form-label fw-semibold">
                                        Card Information
                                    </label>

                                    <div className="card-input-wrapper mb-3">
                                        <CardElement
                                            options={{
                                                hidePostalCode: true,
                                                style: {
                                                    base: {
                                                        fontSize: "16px",
                                                        color: "#212529",
                                                        "::placeholder": { color: "#adb5bd" }
                                                    }
                                                }
                                            }}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-success w-100 py-2 fw-bold"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Processing..."
                                            : `Pay £${bookingData.total_payable}`}
                                    </button>
                                </form>
                            )}

                            <p className="text-muted text-center small mt-3">
                                🔒 100% Secure Stripe Payment
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
            <Copyright />
        </>
    );

};

export default RetryPaymentPage;
