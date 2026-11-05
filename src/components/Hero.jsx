import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero" id="home">

      {/* Animated Background Video */}
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="https://video-previews.elements.envatousercontent.com/a104cb67-c5c7-4afe-ad66-a6a71936a0bd/watermarked_preview/watermarked_preview.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay */}
      <div className="hero-overlay"></div>

      {/* Hero Content */}
      <div className="hero-content">

        <span className="hero-tag">
          SMART INVENTORY MANAGEMENT
        </span>

        <h1>
          Manage Your Business
          <span> Smarter With StockPro</span>
        </h1>

        <p>
          Take control of your inventory, monitor stock levels,
          track sales and grow your business with StockPro.
        </p>

        <div className="hero-buttons">
          <Link to="/register" className="hero-primary-btn">
            Get Started
          </Link>

          <a href="#features" className="hero-secondary-btn">
            Explore Features
          </a>
        </div>

      </div>
    </section>
  );
};

export default Hero;