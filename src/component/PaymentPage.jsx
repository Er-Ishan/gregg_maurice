import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    useStripe, useElements, CardElement, PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import Copyright from "../component/Copyright";
import NavbarElement from "../component/NavbarElement";
import Topbar from "./Topbar";

const API = import.meta.env.VITE_API_URL;

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const bookingData = location.state?.bookingData || null;
    const addons = bookingData?.addons || {};
    const addonsTotal = bookingData?.addons_total || 0;

    const stripe = useStripe();
    const elements = useElements();

    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);

    const [paymentRequest, setPaymentRequest] = useState(null);
    const [selectedMethod, setSelectedMethod] = useState("card");

    const isWalletSelected = selectedMethod === "applepay" || selectedMethod === "gpay";


    // TIMER (2 minutes = 120 seconds)
    // ⏱ 1 minute timer
    const [timeLeft, setTimeLeft] = useState(60);


    useEffect(() => {
        if (timeLeft <= 0) {
            (async () => {
                try {
                    await fetch(`${API}/api/stripe/payment-session-expired`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            booking_id: bookingData.booking_id
                        })
                    });
                } catch (err) {
                    console.error("Expiry email error:", err);
                }

                // alert("Payment session expired. Email sent.");
                navigate("/product");
            })();

            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);

    }, [timeLeft]);



    // Format MM:SS
    const formatTime = (sec) => {
        const minutes = Math.floor(sec / 60);
        const seconds = sec % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    useEffect(() => {
        if (!bookingData) return;

        (async () => {
            const resp = await fetch(`${API}/api/stripe/create-payment-intent`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: Math.round(Number(bookingData.total_payable) * 100),
                    payment_intent_id: bookingData.payment_intent_id || null,
                }),
            });

            const data = await resp.json();

            if (data.clientSecret) {
                setClientSecret(data.clientSecret);

                // Save PI ID for reuse
                if (data.paymentIntentId) {
                    bookingData.payment_intent_id = data.paymentIntentId;
                }
            }
        })();
    }, []);

    useEffect(() => {
        if (!stripe || !clientSecret || !bookingData) return;

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

        pr.canMakePayment().then((result) => {
            console.log("canMakePayment:", result);
            if (result?.googlePay || result?.applePay) {
                setPaymentRequest(pr);
            }

        });

        pr.on("paymentmethod", async (e) => {
            if (!isWalletSelected) return;


            const { error, paymentIntent } = await stripe.confirmCardPayment(
                clientSecret,
                { payment_method: e.paymentMethod.id },
                { handleActions: false }
            );

            if (error) {
                e.complete("fail");
                alert(error.message);
                return;
            }

            e.complete("success");

            if (paymentIntent.status === "succeeded") {
                await handleSuccess(paymentIntent);
            }
        });
    }, [stripe, clientSecret, selectedMethod]);



    const handleSubmit = async (e) => {

        // if (selectedMethod !== "card") {
        //     alert("Please select Card Payment");
        //     return;
        // }

        e.preventDefault();

        if (timeLeft <= 0) {
            alert("Payment session expired. Please try again.");
            return;
        }

        if (!stripe || !elements) {
            alert("Stripe not loaded");
            return;
        }
        if (!clientSecret) {
            alert("Payment initialization failed");
            return;
        }

        setLoading(true);

        const cardElement = elements.getElement(CardElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: `${bookingData.first_name || ""} ${bookingData.last_name || ""}`,
                    email: bookingData.email || "",
                },
            },
        });

        if (error) {
            alert(error.message);
            setLoading(false);
            return;
        }

        if (paymentIntent?.status === "succeeded") {
            const payload = {
                ...bookingData,
                transaction_id: paymentIntent.id,
                payment_method_id: paymentIntent.payment_method,
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
                            ...payload,
                            booking_id: result.booking_id,
                        },
                    },
                });
            } else {
                alert("Payment succeeded but failed to save booking.");
            }
        }

        setLoading(false);
    };

    const handleSuccess = async (paymentIntent) => {
        const payload = {
            ...bookingData,
            transaction_id: paymentIntent.id,
            payment_method_id: paymentIntent.payment_method,
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
                        ...payload,
                        booking_id: result.booking_id,
                    },
                },
            });
        } else {
            alert("Payment succeeded but failed to save booking.");
        }
    };


    if (!bookingData) return null;

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
                <div className="text-center mb-4">
                    <h3 className="fw-bold text-dark">Confirm & Secure Your Payment</h3>
                    <p className="text-muted small">
                        Complete your purchase by entering your card details below.
                    </p>

                    {/* TIMER DISPLAY */}
                    <h5 className="fw-bold text-danger">
                        Payment Session Expires In: {formatTime(timeLeft)}
                    </h5>
                </div>

                <div className="row g-4 justify-content-center">
                    <div className="col-lg-5 d-flex">
                        <div className="card border-2  p-4 w-100" style={{ borderRadius: "15px" }}>

                            <h5 className="fw-bold text-center mb-4">Booking Information</h5>

                            <div className="table-responsive">
                                <table className="table table-borderless align-middle mb-0">
                                    <tbody className="small">

                                        <tr>
                                            <th className="text-muted">Product</th>
                                            <td className="fw-semibold">{bookingData.product_name}</td>
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
                                            <td>{bookingData.first_name} {bookingData.last_name}</td>
                                        </tr>

                                        <tr>
                                            <th className="text-muted">Email</th>
                                            <td>{bookingData.email}</td>
                                        </tr>

                                        <tr>
                                            <th className="text-muted">Mobile</th>
                                            <td>{bookingData.mobile}</td>
                                        </tr>

                                        <tr>
                                            <th className="text-muted">Vehicle</th>
                                            <td>{bookingData.vehicle_make || "-"} – {bookingData.vehicle_registration || "-"}</td>
                                        </tr>

                                        <tr className="border-top pt-2">
                                            <th className="text-dark fs-6 fw-bold">Total Payable</th>
                                            <td className="text-success fw-bold fs-5">
                                                £{bookingData.total_payable}
                                            </td>
                                        </tr>

                                        <tr>
                                            <th className="text-muted">Booking Fees</th>
                                            <td>{bookingData.booking_fee}</td>
                                        </tr>


                                        {/* BASE PRICE */}
                                        {bookingData.quote_amount && (
                                            <tr>
                                                <th className="text-muted">Quote Amount</th>
                                                <td>£{Number(bookingData.quote_amount).toFixed(2)}</td>
                                            </tr>
                                        )}

                                        {/* ADD-ONS */}
                                        {addons.cancellation_cover && (
                                            <tr>
                                                <th className="text-muted">Cancellation Cover</th>
                                                <td>£1.49</td>
                                            </tr>
                                        )}

                                        {addons.sms_confirmation && (
                                            <tr>
                                                <th className="text-muted">SMS Confirmation</th>
                                                <td>£0.75</td>
                                            </tr>
                                        )}

                                        {/* ADD-ONS TOTAL */}
                                        {addonsTotal > 0 && (
                                            <tr>
                                                <th className="text-muted">Add-ons Total</th>
                                                <td>£{Number(addonsTotal).toFixed(2)}</td>
                                            </tr>
                                        )}


                                        {/* DISCOUNT (ONLY IF PRESENT) */}
                                        {Number(bookingData.discount) > 0 && (
                                            <tr>
                                                <th className="text-muted text-success">Discount</th>
                                                <td className="text-success">
                                                    -£{Number(bookingData.discount).toFixed(2)}
                                                </td>
                                            </tr>
                                        )}


                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>


                    {/* PAYMENT CARD */}
                    <div className="col-lg-5">



                        <div className="card  border-2 p-4" style={{ borderRadius: "15px" }}>
                            <div className="d-flex gap-3 mb-3 justify-content-center">

                                {/* CARD */}
                                <div
                                    onClick={() => setSelectedMethod("card")}
                                    style={{
                                        cursor: "pointer",

                                        borderRadius: "8px",
                                        padding: "10px 14px",
                                        background: "#fff",
                                    }}
                                >
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png"
                                        alt="Card"
                                        style={{ height: "28px" }}
                                    />
                                </div>

                                {/* APPLE PAY */}
                                <div
                                    onClick={() => setSelectedMethod("applepay")}
                                    style={{
                                        cursor: "pointer",

                                        borderRadius: "8px",
                                        padding: "10px 14px",
                                        background: "#fff",
                                    }}
                                >
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWxYUQvdwKXZ9meVu4Jx6fr7nNNo99TLl-bA&s"
                                        alt="Apple Pay"
                                        style={{ height: "28px" }}
                                    />
                                </div>

                                {/* GOOGLE PAY */}
                                <div
                                    onClick={() => setSelectedMethod("gpay")}
                                    style={{
                                        cursor: "pointer",
                                        borderRadius: "8px",
                                        padding: "10px 14px",
                                        background: "#fff",
                                    }}
                                >
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYQ3uhlEkLwNJ9Y6kjLphe_irfN1i9H1pCMw&s"
                                        alt="Google Pay"
                                        style={{ height: "28px" }}
                                    />
                                </div>

                            </div>


                            <h5 className="mb-3 text-center fw-bold">Payment Details</h5>



                            {isWalletSelected && paymentRequest && (
                                <PaymentRequestButtonElement
                                    options={{ paymentRequest }}
                                    className="mb-3"
                                />
                            )}


                            {selectedMethod === "card" && (
                                <form onSubmit={handleSubmit}>
                                    <label className="form-label fw-semibold">Card Details</label>
                                    <div className="form-control p-3 mb-3" style={{ borderRadius: "10px" }}>
                                        <CardElement options={{ hidePostalCode: true }} />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-success w-100 py-2 fw-bold"
                                        disabled={loading || timeLeft <= 0}
                                        style={{ borderRadius: "50px" }}
                                    >
                                        {loading ? "Processing..." : `Pay £${bookingData.total_payable}`}
                                    </button>
                                </form>
                            )}


                            <p className="text-muted text-center small mt-3">
                                100% Secure Payment 🔒
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

export default PaymentPage;
