import React, { useState } from "react";
import StudentNavBar from "./StudentNavBar";
import Footer from "../Footer";
import "./StudentReport.scss";

const attendanceData = {
  1: [
    {
      subject: "Mathematics",
      teacher: "Mr. Ram",
      totalLectures: 30,
      attendedLectures: 22,
      percentage: 73,
    },
    {
      subject: "Science",
      teacher: "Ms. Ayesha",
      totalLectures: 30,
      attendedLectures: 27,
      percentage: 90,
    },
    {
      subject: "History",
      teacher: "Mr. John",
      totalLectures: 30,
      attendedLectures: 25,
      percentage: 83,
    },
  ],
  2: [
    {
      subject: "Mathematics",
      teacher: "Mr. Ram",
      totalLectures: 35,
      attendedLectures: 30,
      percentage: 85,
    },
    {
      subject: "Physics",
      teacher: "Ms. Rahul",
      totalLectures: 35,
      attendedLectures: 28,
      percentage: 80,
    },
    {
      subject: "Chemistry",
      teacher: "Mr. Prakash",
      totalLectures: 35,
      attendedLectures: 32,
      percentage: 91,
    },
  ],
  3: [
    {
      subject: "Mathematics",
      teacher: "Mr. Ram",
      totalLectures: 40,
      attendedLectures: 35,
      percentage: 88,
    },
    {
      subject: "Economics",
      teacher: "Ms. Neha",
      totalLectures: 40,
      attendedLectures: 36,
      percentage: 90,
    },
    {
      subject: "Computer Science",
      teacher: "Mr. Sanjay",
      totalLectures: 40,
      attendedLectures: 38,
      percentage: 95,
    },
  ],
};

const marksData = {
  1: [
    {
      subject: "Mathematics",
      teacher: "Mr. Ram",
      totalMarks: 20,
      obtainedMarks: 15,
    },
    {
      subject: "Science",
      teacher: "Ms. Ayesha",
      totalMarks: 20,
      obtainedMarks: 18,
    },
    {
      subject: "History",
      teacher: "Mr. John",
      totalMarks: 20,
      obtainedMarks: 16,
    },
  ],
  2: [
    {
      subject: "Mathematics",
      teacher: "Mr. Ram",
      totalMarks: 20,
      obtainedMarks: 18,
    },
    {
      subject: "Physics",
      teacher: "Ms. Rahul",
      totalMarks: 20,
      obtainedMarks: 10,
    },
    {
      subject: "Chemistry",
      teacher: "Mr. Prakash",
      totalMarks: 20,
      obtainedMarks: 17,
    },
  ],
  3: [
    {
      subject: "Mathematics",
      teacher: "Mr. Ram",
      totalMarks: 20,
      obtainedMarks: 19,
    },
    {
      subject: "Economics",
      teacher: "Ms. Neha",
      totalMarks: 20,
      obtainedMarks: 18,
    },
    {
      subject: "Computer Science",
      teacher: "Mr. Sanjay",
      totalMarks: 20,
      obtainedMarks: 19,
    },
  ],
};

const StudentReport = () => {
  const [selectedYear, setSelectedYear] = useState("1");

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const downloadReport = () => {
    let reportContent = "Attendance Report\n\n";
    attendanceData[selectedYear].forEach((item) => {
      reportContent += `${item.subject} - ${item.teacher} | Total Lectures: ${item.totalLectures} | Attended Lectures: ${item.attendedLectures} | Attendance Percentage: ${item.percentage}%\n`;
    });

    reportContent += "\nMarks Report\n\n";
    marksData[selectedYear].forEach((item) => {
      reportContent += `${item.subject} - ${item.teacher} | Total Marks: ${
        item.totalMarks
      } | Obtained Marks: ${item.obtainedMarks} | Status: ${
        item.obtainedMarks < 8 ? "Fail" : "Pass"
      }\n`;
    });

    const blob = new Blob([reportContent], {
      type: "text/plain;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "student_report.txt";
    link.click();
  };

  return (
    <>
      <StudentNavBar />
      <div className="student-report-container">
        <h2 className="report-heading">Student Report</h2>

        {/* Year Selection */}
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

        {/* Attendance Report Section */}
        <div className="report-section">
          <h3 className="section-heading">Attendance Report</h3>
          <div className="report-table-container">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Teacher</th>
                  <th>Total Lectures</th>
                  <th>Attended Lectures</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData[selectedYear].map((item, index) => (
                  <tr key={index}>
                    <td>{item.subject}</td>
                    <td>{item.teacher}</td>
                    <td>{item.totalLectures}</td>
                    <td>{item.attendedLectures}</td>
                    <td
                      className={
                        item.percentage < 75 ? "red-text" : "blue-text"
                      }
                    >
                      {item.percentage}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Marks Report Section */}
        <div className="report-section">
          <h3 className="section-heading">Marks Report</h3>
          <div className="report-table-container">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Teacher</th>
                  <th>Total Marks</th>
                  <th>Obtained Marks</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {marksData[selectedYear].map((item, index) => (
                  <tr key={index}>
                    <td>{item.subject}</td>
                    <td>{item.teacher}</td>
                    <td>{item.totalMarks}</td>
                    <td>{item.obtainedMarks}</td>
                    <td
                      className={
                        item.obtainedMarks < 8 ? "fail-text" : "pass-text"
                      }
                    >
                      {item.obtainedMarks < 8 ? "Fail" : "Pass"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <button className="download-button" onClick={downloadReport}>
          Download Report
        </button>
      </div>
      <Footer />
    </>
  );
};

export default StudentReport;
