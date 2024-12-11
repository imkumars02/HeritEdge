import React, { useState } from "react";
import "./Feedback.scss";
import DashboardNavBar from "./NavBar/DashboardNavBar";
import Footer from "./Footer";
import { Star } from "lucide-react";
import axios from "axios";

const Feedback = () => {
  const [fullName, setFullName] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/feedback", {
        fullName,
        rating,
        feedback,
      });
      alert("Feedback submitted successfully");
      setFullName("");
      setRating(0);
      setFeedback("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Error submitting feedback. Please try again.");
    }
  };

  return (
    <>
      <DashboardNavBar />
      <div className="feedback-container">
        <h1 className="head">Feedback</h1>
        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label>Rating</label>
            <div className="star-rating">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={30}
                  color={index < rating ? "#FFD700" : "#ccc"}
                  onClick={() => setRating(index + 1)}
                  className="star"
                />
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="feedback">Your Feedback</label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write your feedback here"
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Feedback;
