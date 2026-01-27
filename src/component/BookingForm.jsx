import React, { useState, useEffect } from 'react'
import Topbar from "../component/Topbar"
import NavbarElement from '../component/NavbarElement'
import Footer from './Footer'
import Copyright from './Copyright'
import { useLocation, useNavigate } from "react-router-dom";
import "./booking.css";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";



const API = import.meta.env.VITE_API_URL;



const BookingForm = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const bookingData = location.state || {};

    const {
        productId,
        dropDate,
        returnDate,
        travelling_from,
        basePrice,
        discountAmount = 0,
        finalPrice
    } = bookingData;



    const [product, setProduct] = useState(null);
    const [price, setPrice] = useState(null);
    const [showTravel, setShowTravel] = useState(true);
    const [showVehicle, setShowVehicle] = useState(true);
    const [selectedAirport, setSelectedAirport] = useState("");
    const [airportId, setAirportId] = useState(null);
    const [departTerminals, setDepartTerminals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [bookingFee, setBookingFee] = useState(0);



    const [showTerms, setShowTerms] = useState(false);

    // cancellation charge config
    const [cancellationCharge, setCancellationCharge] = useState(null);


    useEffect(() => {
        fetch(`${API}/api/cancellation/charges`)
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data.length > 0) {
                    setCancellationCharge(data.data[0]);
                }
            })
            .catch(err => {
                console.error("Failed to fetch cancellation charge:", err);
            });
    }, []);

    useEffect(() => {
        fetch(`${API}/api/booking-fees`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setBookingFee(Number(data.booking_fees || 0));
                }
            })
            .catch(() => {
                setBookingFee(0);
            });
    }, []);




    const fetchDepartTerminals = async (airport_id) => {
        if (!airport_id) return;

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/data/terminals-by-airport/${airport_id}`
        );

        const data = await res.json();
        setDepartTerminals(data);
    };




    const [addons, setAddons] = useState({
        cancellation_cover: false,
        sms_confirmation: false,
    });


    const handleAddonChange = (e) => {
        const { name, checked } = e.target;

        setAddons(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    // const addonsTotal = Object.entries(addons).reduce((sum, [key, enabled]) => {
    //     return enabled ? sum + ADDONS[key] : sum;
    // }, 0);

    const cancellationPrice =
        addons.cancellation_cover &&
            cancellationCharge?.is_enabled === 1
            ? Number(cancellationCharge.price)
            : 0;

    const addonsTotal = cancellationPrice;




    const [formData, setFormData] = useState({
        title: "",
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        // address: "",
        // postcode: "",
        depart_terminal: "",
        depart_flight: "",
        return_terminal: "",
        return_flight: "",
        vehicle_make: "",
        travelling_from: "",
        vehicle_model: "",
        vehicle_colour: "",
        vehicle_registration: "",
        passengers: "1",
        card_name: "",
        card_number: "",
        expiry_date: "",
        cvc: "",
        terms_accepted: false
    });

    const handleInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
        });
    };

    // Fetch product info
    useEffect(() => {
        if (productId) {
            fetch(`${API}/api/parking-product/${productId}`)
                .then(res => res.json())
                .then(data => setProduct(data.data))
                .catch(err => console.error(err));
        }
    }, [productId]);

    // Fetch pricing
    // useEffect(() => {
    //     if (productId && dropDate && returnDate) {
    //         fetch(`${API}/api/calculate-price`, {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({
    //                 product_id: productId,
    //                 dropoff_date: dropDate,
    //                 return_date: returnDate
    //             })
    //         })
    //             .then(res => res.json())
    //             .then(data => {
    //                 if (data.success) setPrice(data.total_price);
    //             })
    //             .catch(err => console.log(err));
    //     }
    // }, [productId, dropDate, returnDate]);

    useEffect(() => {
        if (finalPrice !== undefined && finalPrice !== null) {
            setPrice(Number(finalPrice));
        } else if (basePrice !== undefined && basePrice !== null) {
            setPrice(Number(basePrice));
        }
    }, [finalPrice, basePrice]);


    useEffect(() => {
        if (!productId) return;

        const fetchTerminals = async () => {
            try {
                const res = await fetch(
                    `${API}/api/data/terminals-by-product/${productId}`
                );
                const data = await res.json();
                setDepartTerminals(data);
            } catch (err) {
                console.error("Failed to fetch terminals:", err);
            }
        };

        fetchTerminals();
    }, [productId]);




    const getDaysDiff = () => {
        const d1 = new Date(dropDate);
        const d2 = new Date(returnDate);
        return Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24)) + 1;
    };

    const totalPayable = (
    Number(price || 0) +
    Number(bookingFee || 0) +
    addonsTotal
).toFixed(2);





    // SUBMIT TO BACKEND
    // const handleSubmit = async () => {

    //     const payload = {
    //         ...formData,

    //         // ---- PRODUCT DATA ----
    //         travelling_from: product?.travelling_from,
    //         service_provider: product?.service_provider,
    //         service_type: product?.service_type,
    //         product_id: productId,

    //         // ---- BOOKING DATA ----
    //         dropoff_date: dropDate,
    //         return_date: returnDate,
    //         no_of_days: getDaysDiff(),
    //         quote_amount: price,
    //         discount: 0,
    //         booking_fee: product?.booking_fees,
    //         total_payable: totalPayable,

    //         // ---- SYSTEM FIELDS ----
    //         status: "Pending",
    //         source: "Website",
    //         website_name: "Thomson Park & Ride",
    //         transaction_source: "Online",
    //         transaction_id: null
    //     };

    //     const res = await fetch(`${API}/api/create-booking`, {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(payload)
    //     });

    //     const data = await res.json();
    //     if (data.success) {
    //         alert("Booking Successful!");
    //         navigate("/product");
    //     } else {
    //         alert("Error: " + data.message);
    //     }
    // };

    // --- Unified function to save booking and go to payment ---
    const saveBookingAndProceedToPayment = async () => {
        if (!formData.first_name || !formData.last_name || !formData.email || !formData.mobile) {
            alert("Please fill all required fields");
            return;
        }
        if (!formData.terms_accepted) {
            alert("Please accept Terms & Conditions");
            return;
        }

        setLoading(true); // ✅ start loading

        const payload = {
            ...formData,
            product_name: product?.product_name,
            product_flexibility: product?.product_flexibility,
            travelling_from: travelling_from,
            service_provider: product?.service_provider,
            service: product?.service_type,
            addons: addons,
            addons_total: addonsTotal,
            drop_off_date: dropDate,
            return_date: returnDate,
            no_of_days: getDaysDiff(),
            quote_amount: price,
            discount: discountAmount || 0,
            booking_fee: bookingFee,
            total_payable: totalPayable,
            status: "Pending",
            source: "Website",
            website_name: "Thomson Park & Ride",
            transaction_source: "Online",
            transaction_id: null
        };

        try {
            const res = await fetch(`${API}/api/create-booking`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (data.success) {
                const bookingDataToSend = {
                    ...payload,
                    booking_id: data.booking_id || null
                };
                navigate("/payment", { state: { bookingData: bookingDataToSend } });
            } else {
                alert("Failed to save booking: " + data.message);
            }
        } catch (err) {
            console.error("Error saving booking:", err);
            alert("Error saving booking. Check console.");
        } finally {
            setLoading(false); // ✅ stop loading
        }
    };


    // payment integration
    const stripe = useStripe();
    const elements = useElements();




    const handlePayNow = () => {
        navigate("/payment", {
            state: {
                bookingData: {
                    ...bookingData,
                    total_payable: totalPayable
                }
            }
        });
    };

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth <= 768);
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    const [passengers, setPassengers] = useState("1");


    return (



        <div>
            {/* {!isMobile && <Topbar />} */}
            <NavbarElement />

            <div className="booking-title-card text-center" style={{ background: "#062A4F" }}>
                <h1 className='text-white'>Book <span style={{ color: "#ffa200" }}>{product?.product_name}</span> Parking</h1>
                <p><strong>Note:</strong> All booking details and parking instructions will be
                    sent to the email address provided below</p>
                <small>* All fields marked with asterisk are mandatory</small>
            </div>


            <div className="container booking-container my-4">
                <div className="row g-4">

                    {/* FORM SECTION */}
                    <div className="col-lg-8">
                        <div className="booking-form-card">

                            {/* PERSONAL INFO */}
                            <div className="section-header">Personal Information</div>

                            <div className="row g-3 mb-3">
                                <div className="col-lg-2">
                                    <label className="form-label">Title *</label>
                                    <select name="title" className="form-select" onChange={handleInput} required>
                                        <option>Select</option>
                                        <option>Mr.</option>
                                        <option>Mrs.</option>
                                        <option>Miss</option>
                                        <option>Ms.</option>
                                        <option>Dr.</option>
                                    </select>
                                </div>
                                <div className="col-lg-5">
                                    <label className="form-label">First Name *</label>
                                    <input name="first_name" className="form-control" onChange={handleInput} required />
                                </div>
                                <div className="col-lg-5">
                                    <label className="form-label">Last Name *</label>
                                    <input name="last_name" className="form-control" onChange={handleInput} required />
                                </div>
                            </div>

                            {/* CONTACT */}
                            <div className="row g-3 mb-3">
                                <div className="col-lg-6">
                                    <label className="form-label">Email *</label>
                                    <input name="email" type="email" className="form-control" onChange={handleInput} required />
                                </div>
                                <div className="col-lg-6">
                                    <label className="form-label">Mobile *</label>
                                    <input name="mobile" className="form-control" onChange={handleInput} required />
                                </div>
                            </div>

                            {/* ADDRESS */}
                            {/* <div className="row g-3 mb-3">
                                <div className="col-lg-6">
                                    <label className="form-label">Address</label>
                                    <input name="address" className="form-control" onChange={handleInput} />
                                </div>
                                <div className="col-lg-6">
                                    <label className="form-label">Postcode *</label>
                                    <input name="postcode" className="form-control" onChange={handleInput} required />
                                </div>
                            </div> */}

                            {/* TRAVEL DETAILS */}
                            <div className="toggle-block mb-2">
                                <h6>Do you have travel details?</h6>
                                <div className="d-flex align-items-center gap-1">
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="travel_details"
                                            checked={showTravel}
                                            onChange={() => setShowTravel(true)}
                                            required
                                        />
                                        <label className="form-check-label">Yes</label>
                                    </div>

                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="travel_details"
                                            checked={!showTravel}
                                            onChange={() => setShowTravel(false)}
                                            required
                                        />
                                        <label className="form-check-label">No</label>
                                    </div>
                                </div>
                            </div>

                            {showTravel && (
                                <>
                                    <div className="section-header">Travel Details</div>
                                    <div className="row g-3 mb-3">
                                        <div className="col-lg-3">
                                            <label className="form-label">Depart Terminal *</label>
                                            <select
                                                name="depart_terminal"
                                                className="form-select"
                                                onChange={handleInput}
                                            >
                                                <option value="">Select</option>

                                                {departTerminals.map((t) => (
                                                    <option key={t.terminal_id} value={t.terminal_name}>
                                                        {t.terminal_name}
                                                    </option>
                                                ))}
                                            </select>

                                        </div>
                                        <div className="col-lg-3">
                                            <label className="form-label">Depart Flight *</label>
                                            <input name="depart_flight" className="form-control" onChange={handleInput} />
                                        </div>
                                        <div className="col-lg-3">
                                            <label className="form-label">Return Terminal *</label>
                                            <select
                                                name="return_terminal"
                                                className="form-select"
                                                onChange={handleInput}

                                            >
                                                <option value="">Select</option>

                                                {departTerminals.map((t) => (
                                                    <option key={t.terminal_id} value={t.terminal_name}>
                                                        {t.terminal_name}
                                                    </option>
                                                ))}
                                            </select>

                                        </div>
                                        <div className="col-lg-3">
                                            <label className="form-label">Return Flight *</label>
                                            <input name="return_flight" className="form-control" onChange={handleInput} />
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* VEHICLE DETAILS */}
                            <div className="toggle-block mb-2">
                                <h6>Do you have vehicle details?</h6>
                                <div className="d-flex align-items-center gap-1">
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="vehicle_details"
                                            checked={showVehicle}
                                            onChange={() => setShowVehicle(true)}
                                            required
                                        />
                                        <label className="form-check-label">Yes</label>
                                    </div>

                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="vehicle_details"
                                            checked={!showVehicle}
                                            onChange={() => setShowVehicle(false)}
                                            required
                                        />
                                        <label className="form-check-label">No</label>
                                    </div>
                                </div>
                            </div>

                            {showVehicle && (
                                <>
                                    <div className="section-header">Vehicle Details</div>
                                    <div className="row g-3 mb-3">
                                        <div className="col-lg-3">
                                            <label className="form-label">Make *</label>
                                            <input name="vehicle_make" className="form-control" onChange={handleInput} />
                                        </div>
                                        <div className="col-lg-3">
                                            <label className="form-label">Model *</label>
                                            <input name="vehicle_model" className="form-control" onChange={handleInput} />
                                        </div>
                                        <div className="col-lg-3">
                                            <label className="form-label">Colour *</label>
                                            <input name="vehicle_colour" className="form-control" onChange={handleInput} />
                                        </div>
                                        <div className="col-lg-3">
                                            <label className="form-label">Registration *</label>
                                            <input name="vehicle_registration" className="form-control" onChange={handleInput} required />
                                        </div>

                                        {/* PASSENGERS */}
                                        <div className="col-lg-3 mb-3">
                                            <label className="form-label">Passengers *</label>
                                            <select name="passengers" className="form-select" onChange={handleInput}>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                        </div>

                                    </div>
                                </>
                            )}


                            {/* PAYMENT */}
                            {/* <div className="section-header mt-3">Payment Details</div>
                            <div className="row g-3 mb-3">
                                <div className="col-lg-3">
                                    <label className="form-label">Name on Card *</label>
                                    <input name="card_name" className="form-control" onChange={handleInput} />
                                </div>
                                <div className="col-lg-3">
                                    <label className="form-label">Card Number *</label>
                                    <input name="card_number" className="form-control" onChange={handleInput} />
                                </div>
                                <div className="col-lg-3">
                                    <label className="form-label">Expiry *</label>
                                    <input name="expiry_date" className="form-control" placeholder="MM/YY" onChange={handleInput} />
                                </div>
                                <div className="col-lg-3">
                                    <label className="form-label">CVC *</label>
                                    <input name="cvc" className="form-control" onChange={handleInput} />
                                </div>
                            </div> */}

                            {/* ADD-ONS */}
                            <div className="mb-3">

                                {cancellationCharge?.is_enabled === 1 && (
                                    <div className="form-check mb-2">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="cancellation_cover"
                                            name="cancellation_cover"
                                            checked={addons.cancellation_cover}
                                            onChange={handleAddonChange}
                                        />
                                        <label className="form-check-label ms-2" htmlFor="cancellation_cover">
                                            <strong>Cancellation Cover</strong> £{cancellationCharge.price}{" "}
                                            <span className="text-muted">
                                                Protect Your Booking, Future Amendment / Cancellation
                                            </span>
                                        </label>
                                    </div>
                                )}

                                {/* <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="sms_confirmation"
                                        name="sms_confirmation"
                                        checked={addons.sms_confirmation}
                                        onChange={handleAddonChange}
                                    />
                                    <label className="form-check-label ms-2" htmlFor="sms_confirmation">
                                        <strong>SMS Confirmation</strong> £0.00{" "}
                                        <span className="text-muted">
                                            Get Confirmation on Mobile For Fast Check-in.
                                        </span>
                                    </label>
                                </div> */}

                            </div>


                            <div className="form-check mb-3">
                                <input name="terms_accepted" type="checkbox" className="form-check-input"
                                    onChange={handleInput} required />
                                <label className="form-check-label ms-2">
                                    I agree to the Terms & Conditions *
                                </label>
                            </div>

                            <button
                                className="btn text-white submit-btn w-100 mb-3"
                                style={{ background: "#ffa200" }}
                                onClick={saveBookingAndProceedToPayment}
                                disabled={loading} // ✅ disable button while loading
                            >
                                {loading ? (
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                ) : null}
                                {loading ? "Booking..." : "Book Your Parking"}
                            </button>

                        </div>
                    </div>

                    {/* SUMMARY CARD */}
                    <div className="col-lg-4 position-relative ps-lg-4">
                        <div className="summary-card" style={{ top: "100px" }}>

                            {/* Product Image */}
                            {/* <img
                                src={product?.image_url ? product.image_url : "/default-parking.jpg"}
                                alt={product?.product_name}
                                className="img-fluid w-100 mb-3"
                                style={{ height: "150px", objectFit: "cover" }}
                            /> */}
                            <h5 className="text-center mb-3 fw-bold">{product?.product_name}</h5>
                            <ul>
                                <li>Travelling From: <span>{travelling_from}</span></li>
                                <li>Provider: <span>{product?.service_provider || "N/A"}</span></li>
                                <li>Service: <span>{product?.service_type || "N/A"}</span></li>
                                <li>Booking Type: <span>{product?.nonflex || "N/A"}</span></li>
                                <li>Drop-off Date: <span>{dropDate}</span></li>
                                <li>Return Date: <span>{returnDate}</span></li>
                                <li>Quote Amount: <span>£{basePrice?.toFixed(2)}</span></li>

                                {discountAmount > 0 && (
                                    <li className="text-success">
                                        Discount Applied: <span>-£{discountAmount.toFixed(2)}</span>
                                    </li>
                                )}

                                <li>
                                    Final Price: <span>£{price?.toFixed(2)}</span>
                                </li>

                                <li>Booking Fee: <span>£{bookingFee.toFixed(2)}</span></li>
                            </ul>
                            <div className="price-box mb-3" style={{ background: "#ffa200" }}>
                                Total Payable: £{totalPayable}
                            </div>

                            {/* <button
                                className="btn btn-success w-100"
                                onClick={saveBookingAndProceedToPayment}
                            >
                                Proceed to Payment
                            </button> */}

                        </div>
                    </div>

                </div>
            </div>




            <Footer />
            <Copyright />
        </div>
    )
}

export default BookingForm;
