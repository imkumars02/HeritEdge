import React from "react";
import "./Teacher.scss";
import TeacherNavBar from "./TeacherNavBar";
import Footer from "../Footer";
import {
  CheckCircle,
  FileText,
  Calendar,
  BarChart,
  Clock,
  Clipboard,
} from "lucide-react"; // Import icons
import { useNavigate } from "react-router-dom";

const Teacher = () => {
  const navigate = useNavigate();
  return (
    <>
      <TeacherNavBar />
      <div className="teacher-dashboard-container">
        <h2 className="teacher-dashboard-heading">Teacher Dashboard</h2>
        <div className="teacher-dashboard">
          <div className="dashboard-item" onClick={()=>{navigate('/TeacherAttendance');}}>
            <CheckCircle size={40} />
            <h3>Mark Attendance</h3>
          </div>
          <div className="dashboard-item" onClick={()=>{navigate('/TeacherMarks');}}>
            <FileText size={40} />
            <h3>Subject Marks</h3>
          </div>
          <div className="dashboard-item" onClick={()=>{navigate('/TeacherClass');}}>
            <Clipboard size={40} />
            <h3>Class & Subject</h3>
          </div>
          <div className="dashboard-item" onClick={()=>{navigate('/TeacherTimeTable');}}>
            <Calendar size={40} />
            <h3>Time Table</h3>
          </div>
          <div className="dashboard-item" onClick={()=>{navigate('/TeacherReportPage');}}>
            <BarChart size={40} />
            <h3>Report</h3>
          </div>
          <div className="dashboard-item" onClick={()=>{navigate('/TeacherLeave');}}>
            <Clock size={40} />
            <h3>Leave</h3>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Teacher;
