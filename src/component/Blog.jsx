export default function Blog() {
  return (
    <div className="container-fluid py-5" style={{ background: "#fff" }}>
      <div className="container py-5">

        {/* Heading */}
        <div className="text-center mx-auto pb-5" style={{ maxWidth: 800 }}>
          <h1
            style={{
              fontSize: "45px",
              fontWeight: "700",
              color: "#4b1f6f",
            }}
          >
            Cental Blog & News
          </h1>

          <p style={{ color: "#3b3b3b", fontSize: "16px" }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit...
          </p>
        </div>

        <div className="row g-4">

          <BlogCard
            img="img/blog-1.jpg"
            date="30 Dec 2025"
            title="Rental Cars how to check driving fines?"
          />

          <BlogCard
            img="img/blog-2.jpg"
            date="25 Dec 2025"
            title="Rental cost of sport and other cars"
          />

          <BlogCard
            img="img/blog-3.jpg"
            date="27 Dec 2025"
            title="Document required for car rental"
          />

        </div>
      </div>
    </div>
  );
}


function BlogCard({ img, date, title }) {
  return (
    <div className="col-lg-4 d-flex">
      <div
        className="w-100 d-flex flex-column"
        style={{
          background: "#f7f7f7",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ position: "relative" }}>
          <img src={img} className="img-fluid w-100" alt="" />

          <div
            style={{
              background: "#4b1f6f",
              padding: "8px 18px",
              color: "#fff",
              position: "absolute",
              bottom: "-22px",
              left: "15px",
              fontSize: "15px",
              borderRadius: "5px",
            }}
          >
            {date}
          </div>
        </div>

        <div className="flex-grow-1" style={{ padding: "50px 25px 25px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "15px",
              marginBottom: "10px",
              color: "#4b1f6f",
            }}
          >
            <span><i className="fa fa-user"></i> Martin.C</span>
            <span><i className="fa fa-comment"></i> 6 Comments</span>
          </div>

          <h4 style={{ fontWeight: 700, fontSize: "22px" }}>{title}</h4>

          <p style={{ color: "#4e4e4e" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>

        <div style={{ padding: "0 25px 25px" }}>
          <a
            href="#"
            style={{
              textDecoration: "none",
              fontWeight: "600",
              color: "#4b1f6f",
              display: "inline-block",
            }}
          >
            Read More <i className="fa fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
