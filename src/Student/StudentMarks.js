import React, { useState } from "react";
import StudentNavBar from "./StudentNavBar";
import Footer from "../Footer";
import "./StudentMarks.scss";

const StudentMarks = () => {
  // Initial data for subjects, marks, and teacher names
  const subjectsData = {
    "1st Year": [
      {
        subject: "Mathematics",
        teacher: "Mr. Chaudhari",
        internal1: 15,
        internal2: 17,
      },
      {
        subject: "Physics",
        teacher: "Ms. Ahirrao",
        internal1: 14,
        internal2: 16,
      },
      {
        subject: "Chemistry",
        teacher: "Mr. Deshmukh",
        internal1: 16,
        internal2: 18,
      },
    ],
    "2nd Year": [
      {
        subject: "Computer Science",
        teacher: "Dr. Patil",
        internal1: 18,
        internal2: 19,
      },
      {
        subject: "Data Structures",
        teacher: "Prof. Kumar",
        internal1: 14,
        internal2: 16,
      },
      {
        subject: "Discrete Mathematics",
        teacher: "Dr. James",
        internal1: 15,
        internal2: 17,
      },
    ],
    "3rd Year": [
      {
        subject: "Software Engineering",
        teacher: "Prof. Brown",
        internal1: 19,
        internal2: 18,
      },
      {
        subject: "Algorithms",
        teacher: "Ms. Emily",
        internal1: 17,
        internal2: 16,
      },
      {
        subject: "Operating Systems",
        teacher: "Mr. David",
        internal1: 18,
        internal2: 19,
      },
    ],
  };

  const [selectedYear, setSelectedYear] = useState("1st Year");
  const [marks, setMarks] = useState(subjectsData["1st Year"]);

  // Function to update marks based on selected year
  const handleYearChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
    setMarks(subjectsData[year]);
  };

  return (
    <>
      <StudentNavBar />
      <div className="student-marks">
        <div className="year-selection">
          <label htmlFor="year">Select Year: </label>
          <select id="year" value={selectedYear} onChange={handleYearChange}>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
          </select>
        </div>

        <div className="marks-section">
          <h2>{selectedYear} Marks</h2>
          <div className="internal-section">
            <div className="internal">
              <h3>Internal 1</h3>
              <table className="marks-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Teacher</th>
                    <th>Marks (Out of 20)</th>
                  </tr>
                </thead>
                <tbody>
                  {marks.map((item, index) => (
                    <tr key={index}>
                      <td>{item.subject}</td>
                      <td>{item.teacher}</td>
                      <td>{item.internal1}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="internal">
              <h3>Internal 2</h3>
              <table className="marks-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Teacher</th>
                    <th>Marks (Out of 20)</th>
                  </tr>
                </thead>
                <tbody>
                  {marks.map((item, index) => (
                    <tr key={index}>
                      <td>{item.subject}</td>
                      <td>{item.teacher}</td>
                      <td>{item.internal2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StudentMarks;
