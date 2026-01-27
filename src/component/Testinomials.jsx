
import { FaQuoteRight } from "react-icons/fa";
export default function Testimonials() {
    return (
        <div className="container py-5">

            <h2 className="text-center fw-bold fs-1 mb-5"
                style={{ color: "#391B63" }}>
                Our Clients Reviews
            </h2>

            <div className="row g-4 justify-content-center">

                {/* Card 1 */}
                <div className="col-lg-5 position-relative">
                    <div className="card shadow border-0"
                         style={{
                             borderRadius: "12px",
                             background: "#ffffff",
                             border: "2px solid #391B63"
                         }}>

                        <div className="position-absolute top-0 start-50 translate-middle 
                            d-flex align-items-center justify-content-center"
                            style={{
                                width: "75px",
                                height: "75px",
                                background: "#391B63",
                                color: "#fff",
                                borderRadius: "50%",
                                fontSize: "32px"
                            }}>
                            <FaQuoteRight />
                        </div>

                        <div className="card-body d-flex align-items-center gap-3 mt-4">
                            <img src="img/customer.jpg"
                                 className="rounded-circle"
                                 width="85" height="85"
                                 style={{
                                     border: "4px solid #F8A502"
                                 }} />

                            <div>
                                <h5 className="mb-1 fw-bold" style={{ color: "#291858" }}>
                                    Sophie Williams
                                </h5>

                                <div style={{ color: "#F8A502", fontSize: "20px" }}>
                                    ★★★★★
                                </div>
                            </div>
                        </div>

                        <div className="border-top p-4" style={{ color: "#291858" }}>
                            Amazing service at a very reasonable price. Staff were polite and
                            professional. The transfer was fast and smooth.
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="col-lg-5 position-relative">
                    <div className="card shadow border-0"
                         style={{
                             borderRadius: "12px",
                             background: "#ffffff",
                             border: "2px solid #391B63"
                         }}>

                        <div className="position-absolute top-0 start-50 translate-middle 
                            d-flex align-items-center justify-content-center"
                            style={{
                                width: "75px",
                                height: "75px",
                                background: "#391B63",
                                color: "#fff",
                                borderRadius: "50%",
                                fontSize: "32px"
                            }}>
                            <FaQuoteRight />
                        </div>

                        <div className="card-body d-flex align-items-center gap-3 mt-4">
                            <img src="img/customer.jpg"
                                 className="rounded-circle"
                                 width="85" height="85"
                                 style={{
                                     border: "4px solid #F8A502"
                                 }} />

                            <div>
                                <h5 className="mb-1 fw-bold" style={{ color: "#291858" }}>
                                    Daniel Thompson
                                </h5>

                                <div style={{ color: "#F8A502", fontSize: "20px" }}>
                                    ★★★★★
                                </div>
                            </div>
                        </div>

                        <div className="border-top p-4" style={{ color: "#291858" }}>
                            First time using Park & Ride. The shuttle was clean and on time.
                            Very smooth and hassle-free!
                        </div>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="col-lg-5 position-relative">
                    <div className="card shadow border-0"
                         style={{
                             borderRadius: "12px",
                             background: "#ffffff",
                             border: "2px solid #391B63"
                         }}>

                        <div className="position-absolute top-0 start-50 translate-middle 
                            d-flex align-items-center justify-content-center"
                            style={{
                                width: "75px",
                                height: "75px",
                                background: "#391B63",
                                color: "#fff",
                                borderRadius: "50%",
                                fontSize: "32px"
                            }}>
                            <FaQuoteRight />
                        </div>

                        <div className="card-body d-flex align-items-center gap-3 mt-4">
                            <img src="img/customer.jpg"
                                 className="rounded-circle"
                                 width="85" height="85"
                                 style={{
                                     border: "4px solid #F8A502"
                                 }} />

                            <div>
                                <h5 className="mb-1 fw-bold" style={{ color: "#291858" }}>
                                    Daniel Thompson
                                </h5>

                                <div style={{ color: "#F8A502", fontSize: "20px" }}>
                                    ★★★★★
                                </div>
                            </div>
                        </div>

                        <div className="border-top p-4" style={{ color: "#291858" }}>
                            First time using Park & Ride. The shuttle was clean and on time.
                            Very smooth and hassle-free!
                        </div>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="col-lg-5 position-relative">
                    <div className="card shadow border-0"
                         style={{
                             borderRadius: "12px",
                             background: "#ffffff",
                             border: "2px solid #391B63"
                         }}>

                        <div className="position-absolute top-0 start-50 translate-middle 
                            d-flex align-items-center justify-content-center"
                            style={{
                                width: "75px",
                                height: "75px",
                                background: "#391B63",
                                color: "#fff",
                                borderRadius: "50%",
                                fontSize: "32px"
                            }}>
                            <FaQuoteRight />
                        </div>

                        <div className="card-body d-flex align-items-center gap-3 mt-4">
                            <img src="img/customer.jpg"
                                 className="rounded-circle"
                                 width="85" height="85"
                                 style={{
                                     border: "4px solid #F8A502"
                                 }} />

                            <div>
                                <h5 className="mb-1 fw-bold" style={{ color: "#291858" }}>
                                    Daniel Thompson
                                </h5>

                                <div style={{ color: "#F8A502", fontSize: "20px" }}>
                                    ★★★★★
                                </div>
                            </div>
                        </div>

                        <div className="border-top p-4" style={{ color: "#291858" }}>
                            First time using Park & Ride. The shuttle was clean and on time.
                            Very smooth and hassle-free!
                        </div>
                    </div>
                </div>
            </div>

            {/* pagination dots */}
            <div className="d-flex justify-content-center mt-4 gap-3">
                <span className="rounded-circle"
                    style={{
                        width: "16px",
                        height: "16px",
                        background: "#391B63"
                    }}></span>
                <span className="rounded-circle"
                    style={{
                        width: "16px",
                        height: "16px",
                        background: "#F8A502"
                    }}></span>
            </div>

        </div>
    );
}
