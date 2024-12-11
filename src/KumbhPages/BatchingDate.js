import React from "react";
import "./BatchingDate.scss";
import { Calendar } from "lucide-react";

const BatchingDate = () => {
  const bathingDates = [
    {
      date: 14,
      month: "JULY",
      year: 2027,
      event: "RAM KUNDA: FLAG HOISTING OF AKHARA KUMBH MELA",
    },
    {
      date: 19,
      month: "AUGUST",
      year: 2027,
      event: "SADHU GRAM: FLAG HOISTING OF AKHARA",
    },
    {
      date: 26,
      month: "AUGUST",
      year: 2027,
      event: "SHRAVAN SHUDHA PRATHAM SNAN",
    },
    {
      date: 29,
      month: "AUGUST",
      year: 2027,
      event: "SHRAVAN SUDHA PURNIMA",
    },
    {
      date: 13,
      month: "SEPTEMBER",
      year: 2027,
      event: "BHADRAPADA KRUSHNA AMAVASYA DWITIYA",
    },
    {
      date: 18,
      month: "SEPTEMBER",
      year: 2027,
      event: "BHADRAPADA RISHI PANCHAMI DWITIYA",
    },
  ];

  return (
    <div className="bathing-dates-section">
      <div className="container">
        <div className="header">
          <Calendar className="calendar-icon" size={48} />
          <h2>Bathing Dates</h2>
        </div>

        <div className="dates-grid">
          {bathingDates.map((date, index) => (
            <div key={index} className="date-card">
              <div className="event-name">{date.event}</div>
              <div className="date-number">{date.date}</div>
              <div className="date-details">
                {date.month} {date.date}, {date.year}
              </div>
            </div>
          ))}
        </div>

        <div className="description">
          <p>
            Bathing ritual is the most significant ritual performed at Kumbh.
            Although taking a dip in the sacred waters on all days of Prayagraj
            Maha Kumbh beginning from Makar Sankranti is considered holy, yet
            there are some specific auspicious bathing dates. Mark your calendar
            for these divine bathing dates.
          </p>
        </div>

        <button className="read-more-btn">Read More</button>
      </div>
    </div>
  );
};

export default BatchingDate;
