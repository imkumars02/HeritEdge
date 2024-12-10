import React, { useState } from "react";
import "./TeacherNavBar.scss";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Calendar,
  FileText,
  Clock,
  FileBarChart,
} from "lucide-react";

const TeacherNavBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="TeacherNavBar">
      <div className="Logo">
        <Link to="/Teacher">Teacher Portal</Link>
      </div>
      <nav className={isNavOpen ? "open" : ""}>
        <ul>
          <li>
            <Link to="/Teacher">
              <Home size={20} /> Home
            </Link>
          </li>
          <li>
            <Link to="/TeacherAttendance">
              <Calendar size={20} /> Attendance
            </Link>
          </li>
          <li>
            <Link to="/TeacherMarks">
              <FileText size={20} /> Marks
            </Link>
          </li>
          <li>
            <Link to="/TeacherTimeTable">
              <Clock size={20} /> Time Table
            </Link>
          </li>
          <li>
            <Link to="/TeacherReportPage">
              <FileBarChart size={20} /> Report
            </Link>
          </li>
        </ul>
      </nav>
      <div className="MenuToggle" onClick={toggleNav}>
        {isNavOpen ? <X size={24} /> : <Menu size={24} />}
      </div>
    </div>
  );
};

export default TeacherNavBar;
