import "./Testimonials.css";

const Testimonials = () => {
  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Retail Store Owner",
      initials: "SJ",
      review:
        "StockPro has made managing my store much easier. I can monitor my products and track sales without unnecessary stress.",
    },
    {
      name: "Michael David",
      role: "Business Manager",
      initials: "MD",
      review:
        "Having my inventory and sales information in one place helps me make better decisions and manage my business more efficiently.",
    },
    {
      name: "Grace Williams",
      role: "Supermarket Owner",
      initials: "GW",
      review:
        "The inventory tracking features make it easier to know what is available and what needs restocking. It gives me better control.",
    },
  ];

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-container">

        <div className="testimonials-heading">
          <span className="testimonials-tag">
            CUSTOMER FEEDBACK
          </span>

          <h1>
            What People Say About
            <span> StockPro</span>
          </h1>

          <p>
            Discover how smarter inventory management can make
            running a business easier and more organised.
          </p>
        </div>

        <div className="testimonials-grid">
          {reviews.map((review, index) => (
            <div className="testimonial-card" key={index}>

              <div className="testimonial-stars">
                ★★★★★
              </div>

              <p className="testimonial-review">
                "{review.review}"
              </p>

              <div className="testimonial-divider"></div>

              <div className="testimonial-profile">
                <div className="testimonial-avatar">
                  {review.initials}
                </div>

                <div>
                  <h3>{review.name}</h3>
                  <span>{review.role}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        <div className="testimonials-bottom">
          <h2>Ready to manage your business smarter?</h2>
          <p>Experience a better way to manage your inventory.</p>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;