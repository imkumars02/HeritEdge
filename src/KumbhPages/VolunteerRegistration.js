import React, { useState } from "react";
import "./VolunteerRegistration.scss";
import KumbhNavBar from "./KumbhNavBar";
import Footer from "../Footer";
import axios from "axios";

const VolunteerRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    address: "",
    email: "",
    gender: "",
    birthdate: "",
    areaOfVolunteering: "",
    bloodGroup: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/volunteer-registration",
        formData,
        { withCredentials: true }
      );
      alert(response.data.message);
      // Clear form after successful submission
      setFormData({
        fullName: "",
        mobile: "",
        address: "",
        email: "",
        gender: "",
        birthdate: "",
        areaOfVolunteering: "",
        bloodGroup: "",
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message || "An error occurred during registration"
      );
    }
  };

  return (
    <>
      <KumbhNavBar />
      <div className="volunteer-registration">
        <h1>Volunteer Registration</h1>
        {message && <div className="message">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <div className="form-column">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="mobile">Mobile no.</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="form-column">
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="birthdate">Birthdate</label>
                <input
                  type="date"
                  id="birthdate"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="areaOfVolunteering">Area of Volunteering</label>
                <textarea
                  id="areaOfVolunteering"
                  name="areaOfVolunteering"
                  value={formData.areaOfVolunteering}
                  onChange={handleChange}
                  placeholder="Enter your area of interest"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="bloodGroup">Blood Group</label>
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select blood group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default VolunteerRegistration;
