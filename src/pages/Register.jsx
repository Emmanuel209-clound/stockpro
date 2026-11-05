import { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

const Register = () => {
const [formData, setFormData] = useState({
fullName: "",
email: "",
password: "",
confirmPassword: "",
});

const handleChange = (event) => {
const { name, value } = event.target;

setFormData({
  ...formData,
  [name]: value,
});


};

const handleSubmit = (event) => {
event.preventDefault();


if (formData.password !== formData.confirmPassword) {
  alert("Passwords do not match");
  return;
}

if (formData.password.length < 6) {
  alert("Password must be at least 6 characters");
  return;
}

console.log("Registration Details:", formData);

alert("Registration successful! (Frontend demonstration)");

setFormData({
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
});


};

return ( <section className="auth-section"> <div className="auth-container">


    <h1>
      Create Your <span>StockPro</span> Account
    </h1>

    <p>Register to start managing your inventory and sales.</p>

    <form onSubmit={handleSubmit}>

      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">
        Create Account
      </button>

    </form>

    <p className="auth-switch">
      Already have an account? <Link to="/login">Login</Link>
    </p>

    <Link to="/" className="back-home">
      Back to Home
    </Link>

  </div>
</section>

);
};

export default Register;
