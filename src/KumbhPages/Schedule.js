import React, { useState, useEffect } from "react";
import "./Schedule.scss";
import KumbhNavBar from "./KumbhNavBar";
import Footer from "../Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Schedule = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [dates, setDates] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tripPlan, setTripPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTripPlan = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/trip-plan",
          { withCredentials: true }
        );
        setTripPlan(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching trip plan:", error);
        setError("Failed to fetch trip plan. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchTripPlan();
  }, []);

  useEffect(() => {
    if (tripPlan && tripPlan.startDate) {
      const startDate = new Date(tripPlan.startDate);
      setCurrentDate(startDate);
      setSelectedDate(startDate.getDate());
    }
  }, [tripPlan]);

  const getStartOfWeek = (date) => {
    const day = date.getDay();
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - day);
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
  };

  const generateWeekDates = (startOfWeek) => {
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      const dayName = day.toLocaleDateString("en-US", { weekday: "short" });
      weekDates.push({
        day: dayName,
        date: day.getDate(),
        fullDate: day,
      });
    }
    return weekDates;
  };

  useEffect(() => {
    const startOfWeek = getStartOfWeek(currentDate);
    const weekDates = generateWeekDates(startOfWeek);
    setDates(weekDates);
  }, [currentDate]);

  const handleNavigation = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + direction * 7);
    setCurrentDate(newDate);
  };

  const monthName = currentDate.toLocaleDateString("en-US", { month: "long" });

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your trip plan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <Link to="/PlanTrip" className="retry-button">
          Try creating a new trip plan
        </Link>
      </div>
    );
  }

  if (
    !tripPlan ||
    !tripPlan.suggestedPlaces ||
    tripPlan.suggestedPlaces.length === 0
  ) {
    return (
      <div className="no-plan-container">
        <p>No trip plan found or your plan is empty.</p>
        <Link to="/PlanTrip" className="create-plan-button">
          Create a new trip plan
        </Link>
      </div>
    );
  }

  return (
    <>
      <KumbhNavBar />
      <div className="schedule-container">
        <div className="calendar-section">
          <div className="calendar-header">
            <h2>{monthName}</h2>
            <div className="calendar-nav">
              <button
                className="nav-button"
                onClick={() => handleNavigation(-1)}
              >
                &lt;
              </button>
              <button
                className="nav-button"
                onClick={() => handleNavigation(1)}
              >
                &gt;
              </button>
            </div>
          </div>
          <div className="calendar-grid">
            {dates.map((item) => (
              <div
                key={item.date}
                className={`calendar-cell ${
                  selectedDate === item.date ? "selected" : ""
                }`}
                onClick={() => setSelectedDate(item.date)}
              >
                <div className="day">{item.day}</div>
                <div className="date">{item.date}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="locations-grid">
          {tripPlan.suggestedPlaces.map((place, index) => (
            <div key={index} className="location-card">
              <div className="location-info">
                <div className="day-label">Day {index + 1}</div>
                <h3>{place.name}</h3>
                <p>Category: {place.category}</p>
                <p>Budget: {place.budget}</p>
              </div>
              <button
                className="directions-button"
                onClick={() => navigate("/Map")}
              >
                Directions
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Schedule;
