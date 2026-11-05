import "./About.css";

const About = () => {
  return (
    <section className="about-section" id="about">

      <div className="about-container">

        {/* About Text */}
        <div className="about-content">

          <span className="about-tag">ABOUT STOCKPRO</span>

          <h2>
            Simplifying Inventory,
            <span> Empowering Businesses</span>
          </h2>

          <p>
            StockPro is a smart inventory and sales management
            system designed to help businesses manage their
            products, monitor stock levels and track sales
            efficiently.
          </p>

          <p>
            Our goal is to make business management easier by
            providing simple tools that help business owners
            stay organised, reduce stock-related errors and
            make better business decisions.
          </p>

          <a href="#features" className="about-btn">
            Discover More →
          </a>

        </div>

        {/* About Information Cards */}
        <div className="about-cards">

          <div className="about-card">
            <h3>01</h3>
            <h4>Smart Inventory</h4>
            <p>
              Keep track of products and monitor available stock.
            </p>
          </div>

          <div className="about-card">
            <h3>02</h3>
            <h4>Sales Tracking</h4>
            <p>
              Monitor business sales and keep accurate records.
            </p>
          </div>

          <div className="about-card">
            <h3>03</h3>
            <h4>Better Decisions</h4>
            <p>
              Understand your business activities and stay organised.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
};

export default About;