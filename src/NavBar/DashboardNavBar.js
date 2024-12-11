import React, { useEffect, useState } from "react";
import "./DashboardNavBar.scss";
import Logo from "../Images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaMoon, FaSun, FaUser } from "react-icons/fa";
import Profile from "../Images/m1.png";
import axios from "axios";

const DashboardNavBar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  let darkMode = localStorage.getItem("dark-mode");
  const [openDarkMode, setOpenDarkMode] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/check-auth",
          { withCredentials: true }
        );
        if (response.data.user) {
          const userDataResponse = await axios.get(
            `http://localhost:5000/api/user/${response.data.user.id}`,
            { withCredentials: true }
          );
          setUser(userDataResponse.data);
        }
      } catch (error) {
        // console.error("Error fetching user data:", error);
        // If there's an error fetching user data, redirect to login
        // navigate("/Login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      navigate("/Login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const enableDarkMode = () => {
    document.body.classList.add("dark");
    localStorage.setItem("dark-mode", "enabled");
  };

  const disableDarkMode = () => {
    document.body.classList.remove("dark");
    localStorage.setItem("dark-mode", "disabled");
  };

  if (darkMode === "enabled") {
    enableDarkMode();
  }

  const toggleBtnMode = () => {
    let darkMode = localStorage.getItem("dark-mode");
    if (darkMode === "disabled") {
      enableDarkMode();
      setOpenDarkMode(true);
    } else {
      setOpenDarkMode(false);
      disableDarkMode();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const UserProfile = document.querySelector(
        ".DashboardNavBar .UserProfile"
      );

      if (UserProfile) {
        UserProfile.classList.remove("active");

        if (window.innerWidth < 1200) {
          UserProfile.classList.remove("active");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const profileBtn = () => {
    const UserProfile = document.querySelector(".DashboardNavBar .UserProfile");
    UserProfile.classList.toggle("active");
  };

  // const handleViewProfile = () => {
  //   navigate("/UserProfile");
  // };

  return (
    <div className="DashboardNavBar">
      <div className="Logo">
        <img src={Logo} alt="HeritEdge" />
      </div>
      {user && (
        <>
          <div className="NavBar">
            <ul>
              <li>
                <Link to="/KumbhPage">Home</Link>
              </li>
              <li>
                <Link className="User" onClick={profileBtn}>
                  <FaUser />
                </Link>
              </li>
              <li>
                {openDarkMode ? (
                  <Link onClick={toggleBtnMode} className="darkMode">
                    <FaSun />
                  </Link>
                ) : (
                  <Link onClick={toggleBtnMode} className="darkMode">
                    <FaMoon />
                  </Link>
                )}
              </li>
            </ul>
            <div className="UserProfile">
              <img src={Profile} alt="User Profile" />
              <h3>{`${user.firstName} ${user.lastName}`}</h3>
              <p>{user.email}</p>
              <div className="Btn" onClick={()=>{navigate('/UserProfile')}}>
                <Link className="Profile">
                  View Profile
                </Link>
                <Link className="Logout" onClick={handleLogout}>
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardNavBar;
