import React, { useState } from "react";
import StudentNavBar from "./StudentNavBar";
import Footer from "../Footer";
import "./StudentAttendance.scss";

// Sample data representing weekly attendance for each year
const attendanceData = {
  "1st Year": [
    {
      week: "Week 1",
      attendance: [
        {
          date: "2024-12-01",
          day: "Monday",
          subject: "Mathematics",
          teacher: "Mr. Ram",
          time: "9:00 AM - 10:00 AM",
          status: "Present",
        },
        {
          date: "2024-12-02",
          day: "Tuesday",
          subject: "Science",
          teacher: "Ms. Ramesh",
          time: "10:00 AM - 11:00 AM",
          status: "Absent",
        },
        {
          date: "2024-12-03",
          day: "Wednesday",
          subject: "English",
          teacher: "Mr. Rohan",
          time: "11:00 AM - 12:00 PM",
          status: "Present",
        },
        {
          date: "2024-12-04",
          day: "Thursday",
          subject: "History",
          teacher: "Ms. Rohit",
          time: "12:00 PM - 1:00 PM",
          status: "Present",
        },
        {
          date: "2024-12-05",
          day: "Friday",
          subject: "Computer Science",
          teacher: "Mr. Roshan",
          time: "2:00 PM - 3:00 PM",
          status: "Absent",
        },
      ],
    },
    {
      week: "Week 1",
      attendance: [
        {
          date: "2024-12-01",
          day: "Monday",
          subject: "Mathematics",
          teacher: "Mr. Ram",
          time: "9:00 AM - 10:00 AM",
          status: "Present",
        },
        {
          date: "2024-12-02",
          day: "Tuesday",
          subject: "Science",
          teacher: "Ms. Ramesh",
          time: "10:00 AM - 11:00 AM",
          status: "Absent",
        },
        {
          date: "2024-12-03",
          day: "Wednesday",
          subject: "English",
          teacher: "Mr. Rohan",
          time: "11:00 AM - 12:00 PM",
          status: "Present",
        },
        {
          date: "2024-12-04",
          day: "Thursday",
          subject: "History",
          teacher: "Ms. Rohit",
          time: "12:00 PM - 1:00 PM",
          status: "Present",
        },
        {
          date: "2024-12-05",
          day: "Friday",
          subject: "Computer Science",
          teacher: "Mr. Roshan",
          time: "2:00 PM - 3:00 PM",
          status: "Absent",
        },
      ],
    },
  ],
  "2nd Year": [
    {
      week: "Week 1",
      attendance: [
        {
          date: "2024-12-01",
          day: "Monday",
          subject: "Mathematics",
          teacher: "Mr. John",
          time: "9:00 AM - 10:00 AM",
          status: "Present",
        },
        {
          date: "2024-12-02",
          day: "Tuesday",
          subject: "Science",
          teacher: "Ms. Ayesha",
          time: "10:00 AM - 11:00 AM",
          status: "Absent",
        },
        {
          date: "2024-12-03",
          day: "Wednesday",
          subject: "History",
          teacher: "Mr. Naveen",
          time: "11:00 AM - 12:00 PM",
          status: "Present",
        },
        {
          date: "2024-12-04",
          day: "Thursday",
          subject: "Computer Science",
          teacher: "Ms. Swathi",
          time: "12:00 PM - 1:00 PM",
          status: "Present",
        },
        {
          date: "2024-12-05",
          day: "Friday",
          subject: "English",
          teacher: "Mr. Daniel",
          time: "2:00 PM - 3:00 PM",
          status: "Absent",
        },
      ],
    },
  ],
  "3rd Year": [
    {
      week: "Week 1",
      attendance: [
        {
          date: "2024-12-01",
          day: "Monday",
          subject: "Computer Science",
          teacher: "Dr. Gupta",
          time: "9:00 AM - 10:00 AM",
          status: "Present",
        },
        {
          date: "2024-12-02",
          day: "Tuesday",
          subject: "Data Structures",
          teacher: "Prof. Singh",
          time: "10:00 AM - 11:00 AM",
          status: "Absent",
        },
        {
          date: "2024-12-03",
          day: "Wednesday",
          subject: "Algorithms",
          teacher: "Mr. Roy",
          time: "11:00 AM - 12:00 PM",
          status: "Present",
        },
        {
          date: "2024-12-04",
          day: "Thursday",
          subject: "Software Engineering",
          teacher: "Dr. Mehta",
          time: "12:00 PM - 1:00 PM",
          status: "Present",
        },
        {
          date: "2024-12-05",
          day: "Friday",
          subject: "Operating Systems",
          teacher: "Mr. Kumar",
          time: "2:00 PM - 3:00 PM",
          status: "Absent",
        },
      ],
    },
  ],
};

const StudentAttendance = () => {
  const [selectedYear, setSelectedYear] = useState("1st Year");
  const [attendance, setAttendance] = useState(attendanceData["1st Year"]);

  // Function to handle the year change
  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setSelectedYear(selectedYear);
    setAttendance(attendanceData[selectedYear]);
  };

  return (
    <>
      <StudentNavBar />
      <div className="attendance-container">
        <h2 className="attendance-heading">Student Attendance</h2>

        {/* Year Dropdown */}
        <div className="year-selector">
          <label htmlFor="year">Select Year:</label>
          <select id="year" value={selectedYear} onChange={handleYearChange}>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
          </select>
        </div>

        {/* Display attendance for selected year */}
        {attendance.map((weekData, index) => (
          <div key={index} className="week-section">
            <div className="attendance-table-container">
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Day</th>
                    <th>Subject</th>
                    <th>Teacher</th>
                    <th>Lecture Timing</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {weekData.attendance.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.date}</td>
                      <td>{item.day}</td>
                      <td>{item.subject}</td>
                      <td>{item.teacher}</td>
                      <td>{item.time}</td>
                      <td
                        className={
                          item.status === "Present" ? "present" : "absent"
                        }
                      >
                        {item.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default StudentAttendance;
