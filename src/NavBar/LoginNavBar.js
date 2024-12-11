import React from "react";
import "./LoginNavBar.scss";
import Logo from "../Images/logo.png";
import { Link, useLocation } from "react-router-dom";

const LoginNavBar = () => {
  const location = useLocation(); // Get the current location

  // Function to check if the current path matches a specific link
  const isActiveLink = (path) => location.pathname === path;

  return (
    <div className="LoginNavBar">
      <div className="LoginLogo">
        <img src={Logo} alt="HeritEdge_Logo" />
      </div>
      {/* <div className="NavLinks">
        <ul>
          <li>
            <Link to={"/"} className={isActiveLink("/") ? "active" : ""}>
              Explore Nashik
            </Link>
          </li>
          <li>
            <Link
              to={"/kumbhmela"}
              className={isActiveLink("/kumbhmela") ? "active" : ""}
            >
              KumbhMela
            </Link>
          </li>
          <li>
            <Link
              to={"/heritage-diary"}
              className={isActiveLink("/heritage-diary") ? "active" : ""}
            >
              Heritage Diary
            </Link>
          </li>
          <li>
            <Link
              to={"/plan-my-trip"}
              className={isActiveLink("/plan-my-trip") ? "active" : ""}
            >
              Plan My Trip
            </Link>
          </li>
        </ul>
      </div> */}
      <div className="AuthButtons">
        <Link
          to={"/Login"}
          className={`LoginBtn ${isActiveLink("/Login") ? "active" : ""}`}
        >
          Login
        </Link>
        <Link
          to={"/Register"}
          className={`RegisterBtn ${isActiveLink("/Register") ? "active" : ""}`}
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginNavBar;
