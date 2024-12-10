import React, { useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [activePanel, setActivePanel] = useState("student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activePanel === "student") {
      if (!username.trim() || !password.trim()) {
        alert("All Fields Required !!");
        return;
      } else {
        //Login Functionality Here
        navigate("/Student");
      }
    } else if (activePanel === "teacher") {
      if (!username.trim() || !password.trim()) {
        alert("All Fields Required !!");
        return;
      } else {
        //Login Functionality Here
        navigate("/Teacher");
      }
    } else if (activePanel === "admin") {
      if (!username.trim() || !password.trim()) {
        alert("All Fields Required !!");
        return;
      } else {
        //Login Functionality Here
        navigate("/Student");
      }
    }
    // console.log(`Logging in as ${activePanel} with username: ${username}`);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Educational Portal</h1>
          <p>Select your role and log in</p>
        </div>
        <div className="login-box">
          <div className="panel-switcher">
            {["student", "teacher", "admin"].map((role) => (
              <button
                key={role}
                className={`switcher-button ${
                  activePanel === role ? "active" : ""
                }`}
                onClick={() => setActivePanel(role)}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <h2>
              {activePanel.charAt(0).toUpperCase() + activePanel.slice(1)} Login
            </h2>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <div className="login-footer">
            <Link to="#forgot-password">Forgot Password?</Link>
            <Link to="#help">Need Help?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
