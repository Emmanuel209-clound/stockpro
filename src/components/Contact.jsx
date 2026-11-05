import { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">

        <div className="contact-heading">
          <span className="contact-tag">GET IN TOUCH</span>

          <h1>
            Let's Talk About
            <span>Your Business</span>
          </h1>

          <p>
            Have questions about StockPro? Send us a message.
            We'd love to hear from you.
          </p>
        </div>

        <div className="contact-content">

          <div className="contact-info">
            <h2>Let's Connect</h2>

            <p>
              Whether you need information about inventory
              management, sales tracking or our platform,
              we're here to help.
            </p>

            <div className="contact-info-card">
              <div className="contact-info-icon">✉</div>
              <div>
                <h3>Send us a message</h3>
                <p>Use the contact form to reach our team.</p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">✓</div>
              <div>
                <h3>Customer Support</h3>
                <p>We're ready to help with your enquiries.</p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">⌂</div>
              <div>
                <h3>StockPro</h3>
                <p>Your partner in smarter business management.</p>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <h2>Send Us a Message</h2>

            <form onSubmit={handleSubmit}>

              <div className="contact-input-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-input-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-input-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="What is your enquiry about?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-input-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Write your message here..."
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="contact-submit-btn">
                Send Message <span>→</span>
              </button>

              {submitted && (
                <p className="contact-success">
                  Thank you! Your form has been submitted successfully.
                </p>
              )}

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;