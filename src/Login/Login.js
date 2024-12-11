import React, { useState } from "react";
import "./Login.scss";
import LoginNavBar from "../NavBar/LoginNavBar";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Images/login.jpg";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        { email, password },
        { withCredentials: true }
      );

      alert(response.data.message);
      navigate("/KumbhPage");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login");
    }
  };

  return (
    <div>
      <LoginNavBar />
      <div className="LoginContainer">
        <div className="LoginForm">
          <p className="title">Login</p>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <input
                type="email"
                placeholder="E-mail"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Enter Your Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="forgotPassword">
              <Link>Forgot Password</Link>
            </div>
            <div className="checkbox">
              <input type="checkbox" />
              <p>I agree the Terms and Condition</p>
            </div>
            <div className="LoginBtn">
              <button type="submit">Login</button>
            </div>
            <div className="SignupBtn">
              <span>
                Don't Have an account ? <Link to={"/Register"}>Sign Up</Link>
              </span>
            </div>
          </form>
        </div>
        <div className="ShowImage">
          <img src={Logo} alt="Nashik" />
          <h3>The soulful blend of heritage, spirituality, and nature.</h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
