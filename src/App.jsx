import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ProductData from "./pages/ProductData";
import Howwork from "./pages/Howwork";
import Faq from "./pages/Faq";
import PrivatePolicy from "./pages/PrivatePolicy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import BookingForm from "./component/BookingForm";
import PaymentPage from "./component/PaymentPage";
import ThankYouPage from "./component/ThankYouPage";
import ReceiptPage from "./component/ReceiptPage";
import ProductDetailsModal from "./pages/ProductDetailsModal";
import MyBooking from "./component/MyBooking";
import PendingPaymentPage from "./component/PendingPaymentPage";
import BookingDetailsPage from "./component/BookingDetailsPage";
import MyBookingsData from "./component/MyBookingsData";
import MyBookingForm from "./pages/MyBookingForm";
import RetryPaymentPage from "./component/RetryPaymentPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<ProductData />} />
        <Route path="/howitworks" element={<Howwork />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/privacypolicy" element={<PrivatePolicy />} />
        <Route path="/termsandconditions" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking-form" element={<BookingForm />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/receipt" element={<ReceiptPage />} />
        <Route path="/product-details/:id" element={<ProductDetailsModal />} />
        <Route path="/my-booking/:id" element={<MyBooking />} />
        <Route path="/pending-payment/:bookingId" element={<PendingPaymentPage />} />
        <Route path="/booking-details" element={<BookingDetailsPage />} />
        <Route path="/booking-data-information" element={<MyBookingsData />} />
        <Route path="/my-booking-form" element={<MyBookingForm />} />
        <Route path="/retry-payment/:bookingId" element={<RetryPaymentPage />} />

      </Routes>
    </>
  );
}

export default App;
