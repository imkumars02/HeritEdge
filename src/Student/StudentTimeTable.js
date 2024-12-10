import React, { useState } from "react";
import "./StudentTimeTable.scss";
import StudentNavBar from "./StudentNavBar";
import Footer from "../Footer";

const StudentTimeTable = () => {
  const [selectedYear, setSelectedYear] = useState("1");

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const getTimeTableImage = () => {
    switch (selectedYear) {
      case "1":
        return "timetable.jpg";
      case "2":
        return "timetable.jpg";
      case "3":
        return "timetable.jpg";
      default:
        return "timetable.jpg";
    }
  };

  return (
    <>
      <StudentNavBar />
      <div className="student-timetable-container">
        <h2 className="page-title">{selectedYear} Year Time Table</h2>

        <div className="year-select-container">
          <label htmlFor="yearSelect" className="year-label">
            Select Year:
          </label>
          <select
            id="yearSelect"
            value={selectedYear}
            onChange={handleYearChange}
            className="year-select"
          >
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
          </select>
        </div>

        <div className="time-table-container">
          <img
            src={getTimeTableImage()}
            alt={`${selectedYear} Year Time Table`}
            className="time-table-image"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StudentTimeTable;
