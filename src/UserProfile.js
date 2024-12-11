import React, { useState, useRef, useEffect } from "react";
import "./UserProfile.scss";
import DashboardNavBar from "./NavBar/DashboardNavBar";
import Footer from "./Footer";
import { Camera, Edit3, Map, Book, Heart, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import coverphotoImage from "./Images/flowerpark.jpeg.jpg";
import profilePhotoImage from "./Images/kumbh.jpg";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(coverphotoImage);
  const [profilePhoto, setProfilePhoto] = useState(profilePhotoImage);
  const coverInputRef = useRef(null);
  const profileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleCoverPhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
        console.error("Error fetching user data:", error);
        // If there's an error fetching user data, redirect to login
        navigate("/Login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleProfilePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="user-profile-page">
      <DashboardNavBar />
      <div className="profile-container">
        <div className="profile-header">
          {/* Ensure user is not null before rendering the name */}
          {user ? (
            <h1 className="user-name">{`${user.firstName} ${user.lastName}`}</h1>
          ) : (
            <h1 className="user-name">Loading...</h1>
          )}
        </div>
        <div className="profile-content">
          <div className="profile-left">
            <div
              className="cover-photo"
              style={{ backgroundImage: `url(${coverPhoto})` }}
            >
              <button
                className="change-cover-photo"
                onClick={() => coverInputRef.current.click()}
              >
                <Camera size={20} />
                Change Cover
              </button>
              <input
                type="file"
                ref={coverInputRef}
                onChange={handleCoverPhotoChange}
                accept="image/*"
                hidden
              />
            </div>
            <div className="profile-photo-container">
              <div
                className="profile-photo"
                style={{ backgroundImage: `url(${profilePhoto})` }}
              >
                <button
                  className="change-profile-photo"
                  onClick={() => profileInputRef.current.click()}
                >
                  <Camera size={20} />
                </button>
                <input
                  type="file"
                  ref={profileInputRef}
                  onChange={handleProfilePhotoChange}
                  accept="image/*"
                  hidden
                />
              </div>
            </div>
          </div>
          <div className="profile-right">
            <div className="profile-menu">
              <button className="menu-item">
                <Edit3 size={20} />
                Edit Profile
              </button>
              <button className="menu-item">
                <Map size={20} />
                My Trips
              </button>
              <button
                className="menu-item"
                onClick={() => {
                  navigate("/HeritEdgeDiary");
                }}
              >
                <Book size={20} />
                Heritage Diary
              </button>
              <button className="menu-item">
                <Heart size={20} />
                Favorite Places
              </button>
              <button className="menu-item logout">
                <LogOut size={20} />
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
