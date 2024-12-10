import React, { useState } from "react";
import "./TeacherReportPage.scss";
import TeacherNavBar from "./TeacherNavBar";
import Footer from "../Footer";
import jsPDF from "jspdf"; // Importing jsPDF library

// Sample Data for Attendance and Marks Report
const attendanceData = [
  {
    subject: "Mathematics",
    teacher: "Mr. Ram",
    totalLectures: 20,
    attendedLectures: 15,
  },
  {
    subject: "Science",
    teacher: "Ms. Ramesh",
    totalLectures: 18,
    attendedLectures: 12,
  },
  {
    subject: "English",
    teacher: "Mr. Rohan",
    totalLectures: 22,
    attendedLectures: 17,
  },
];

const marksData = [
  {
    subject: "Mathematics",
    teacher: "Mr. Ram",
    totalMarks: 20,
    obtainedMarks: 18,
  },
  {
    subject: "Science",
    teacher: "Ms. Ramesh",
    totalMarks: 20,
    obtainedMarks: 6,
  },
  {
    subject: "English",
    teacher: "Mr. Rohan",
    totalMarks: 20,
    obtainedMarks: 14,
  },
];

const TeacherReportPage = () => {
  const [selectedYear, setSelectedYear] = useState("1 Year");

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  // Function to handle the printing of the report
  const handlePrint = () => {
    window.print();
  };

  // Function to handle downloading the report as PDF
  const handleDownload = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Teacher Report", 14, 20);
    doc.setFontSize(14);

    // Adding Year
    doc.text(`Year: ${selectedYear}`, 14, 30);

    // Adding Attendance Report
    doc.text("Attendance Report", 14, 40);
    attendanceData.forEach((data, index) => {
      doc.text(
        `${data.subject} - ${data.teacher}: ${data.attendedLectures}/${
          data.totalLectures
        } (${((data.attendedLectures / data.totalLectures) * 100).toFixed(
          2
        )}%)`,
        14,
        50 + index * 10
      );
    });

    // Adding Marks Report
    doc.text("Marks Report", 14, 90);
    marksData.forEach((data, index) => {
      const status = data.obtainedMarks < 8 ? "Fail" : "Pass";
      doc.text(
        `${data.subject} - ${data.teacher}: ${data.obtainedMarks}/${data.totalMarks} (${status})`,
        14,
        100 + index * 10
      );
    });

    doc.save("teacher_report.pdf");
  };

  return (
    <>
      <TeacherNavBar />
      <div className="teacher-report-container">
        <h2 className="report-heading">Teacher Report</h2>

        <div className="year-selection">
          <label htmlFor="year">Select Year:</label>
          <select id="year" onChange={handleYearChange} value={selectedYear}>
            <option value="1 Year">1 Year</option>
            <option value="2 Year">2 Year</option>
            <option value="3 Year">3 Year</option>
          </select>
        </div>

        <div className="buttons-container">
          <button onClick={handlePrint} className="print-btn">
            Print Report
          </button>
          <button onClick={handleDownload} className="download-btn">
            Download PDF
          </button>
        </div>

        <div className="report-section">
          <h3 className="section-heading">Attendance Report</h3>
          <div className="table-responsive">
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
                {attendanceData.map((data, index) => {
                  const percentage = (
                    (data.attendedLectures / data.totalLectures) *
                    100
                  ).toFixed(2);
                  const percentageClass =
                    percentage < 75 ? "red-text" : "blue-text";
                  return (
                    <tr key={index}>
                      <td>{data.subject}</td>
                      <td>{data.teacher}</td>
                      <td>{data.totalLectures}</td>
                      <td>{data.attendedLectures}</td>
                      <td className={percentageClass}>{percentage}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="report-section">
          <h3 className="section-heading">Marks Report</h3>
          <div className="table-responsive">
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
                {marksData.map((data, index) => {
                  const status = data.obtainedMarks < 8 ? "Fail" : "Pass";
                  const statusClass =
                    status === "Fail" ? "fail-text" : "pass-text";
                  return (
                    <tr key={index}>
                      <td>{data.subject}</td>
                      <td>{data.teacher}</td>
                      <td>{data.totalMarks}</td>
                      <td>{data.obtainedMarks}</td>
                      <td className={statusClass}>{status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TeacherReportPage;
