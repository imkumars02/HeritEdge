import React, { useState } from "react";
import "./Register.scss";
import LoginNavBar from "../NavBar/LoginNavBar";
import { useNavigate } from "react-router-dom";
import Logo from "../Images/nashik.jpeg";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        formData,
        { withCredentials: true }
      );
      alert(response.data.message);
      navigate("/Login");
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during registration"
      );
    }
  };

  return (
    <div>
      <LoginNavBar />
      <div className="RegisterContainer">
        <div className="RegisterShowImage">
          <img src={Logo} alt="Nashik" />
          <h3>Get ready for a journey of a lifetime!</h3>
        </div>
        <div className="RegisterForm">
          <p>Create an account</p>
          <form onSubmit={handleSubmit}>
            <div className="field1">
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <input
                type="email"
                placeholder="E-mail"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                placeholder="Enter Your Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                placeholder="Confirm Your Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="checkbox">
              <input type="checkbox" required />
              <p>I agree to the Terms and Conditions</p>
            </div>
            <div className="LoginBtn">
              <button type="submit">Sign Up</button>
            </div>
          </form>
          <div className="otherSection">
            <h4>---- Or Register With ----</h4>
            <div className="otherLink">
              <p>
                Login With Google <FcGoogle />
              </p>
              <p>
                Login With Facebook <FaFacebook />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
