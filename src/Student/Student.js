import React from "react";
import StudentNavBar from "./StudentNavBar";
import { CheckCircle, FileText, Calendar, BarChart } from "lucide-react";
import "./Student.scss";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";

const Student = () => {
  const navigate = useNavigate();

  return (
    <>
      <StudentNavBar />
      <div className="student-dashboard">
        <div className="dashboard-container">
          <div
            className="dashboard-item"
            onClick={() => {
              navigate("/StudentAttendance");
            }}
          >
            <CheckCircle size={40} />
            <h3>Attendance</h3>
          </div>
          <div
            className="dashboard-item"
            onClick={() => {
              navigate("/StudentMarks");
            }}
          >
            <FileText size={40} />
            <h3>Subject Marks</h3>
          </div>
          <div
            className="dashboard-item"
            onClick={() => {
              navigate("/StudentTimeTable");
            }}
          >
            <Calendar size={40} />
            <h3>Time Table</h3>
          </div>
          <div
            className="dashboard-item"
            onClick={() => {
              navigate("/StudentReportPage");
            }}
          >
            <BarChart size={40} />
            <h3>Reports</h3>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Student;
