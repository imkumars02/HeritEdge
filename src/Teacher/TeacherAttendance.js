import React, { useState, useEffect } from "react";
import "./TeacherAttendance.scss";
import TeacherNavBar from "./TeacherNavBar";
import Footer from "../Footer";

const years = ["1st Year", "2nd Year", "3rd Year"];
const classes = ["Class A", "Class B", "Class C"];
const subjects = ["Mathematics", "Physics", "Chemistry", "Biology"];
const practicals = ["Physics Lab", "Chemistry Lab", "Biology Lab"];

const students = {
  "1st Year": {
    "Class A": [
      { id: 1, name: "Arjun Kumar" },
      { id: 2, name: "Priya Sharma" },
      { id: 3, name: "Amit Yadav" },
    ],
    "Class B": [
      { id: 4, name: "Ravi Patel" },
      { id: 5, name: "Sneha Gupta" },
      { id: 6, name: "Vikram Singh" },
    ],
    "Class C": [
      { id: 7, name: "Neha Verma" },
      { id: 8, name: "Sahil Mehta" },
      { id: 9, name: "Ritika Jain" },
    ],
  },
  "2nd Year": {
    "Class A": [
      { id: 10, name: "Karan Reddy" },
      { id: 11, name: "Isha Bhat" },
      { id: 12, name: "Shivendra Kumar" },
    ],
    "Class B": [
      { id: 13, name: "Ayesha Khan" },
      { id: 14, name: "Rahul Patil" },
      { id: 15, name: "Simran Kapoor" },
    ],
    "Class C": [
      { id: 16, name: "Tanvi Gupta" },
      { id: 17, name: "Vishal Joshi" },
      { id: 18, name: "Anjali Soni" },
    ],
  },
  "3rd Year": {
    "Class A": [
      { id: 19, name: "Rajesh Nair" },
      { id: 20, name: "Pooja Rao" },
      { id: 21, name: "Manish Choudhary" },
    ],
    "Class B": [
      { id: 22, name: "Radhika Deshmukh" },
      { id: 23, name: "Nikhil Rathi" },
      { id: 24, name: "Sanjay Verma" },
    ],
    "Class C": [
      { id: 25, name: "Ankita Sharma" },
      { id: 26, name: "Raghav Gupta" },
      { id: 27, name: "Meera Agarwal" },
    ],
  },
};

const TeacherAttendance = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [selectedClass, setSelectedClass] = useState(classes[0]);
  const [attendanceData, setAttendanceData] = useState({});
  const [date, setDate] = useState("");
  const [markedAttendance, setMarkedAttendance] = useState({});
  const [attendanceType, setAttendanceType] = useState("lecture");
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [selectedPractical, setSelectedPractical] = useState(practicals[0]);

  const [filters, setFilters] = useState({
    name: "",
    year: "",
    class: "",
    date: "",
    type: "",
    subject: "",
  });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setSelectedClass(classes[0]);
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleAttendanceChange = (studentId, isPresent) => {
    setAttendanceData((prevData) => ({
      ...prevData,
      [studentId]: isPresent,
    }));
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleAttendanceTypeChange = (e) => {
    setAttendanceType(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handlePracticalChange = (e) => {
    setSelectedPractical(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAttendance = {
      date,
      type: attendanceType,
      subject:
        attendanceType === "lecture" ? selectedSubject : selectedPractical,
      attendance: Object.entries(attendanceData).map(([id, isPresent]) => ({
        id: parseInt(id),
        name: students[selectedYear][selectedClass].find(
          (student) => student.id === parseInt(id)
        ).name,
        isPresent,
      })),
    };
    setMarkedAttendance((prevMarkedAttendance) => ({
      ...prevMarkedAttendance,
      [selectedYear]: {
        ...prevMarkedAttendance[selectedYear],
        [selectedClass]: [
          ...(prevMarkedAttendance[selectedYear]?.[selectedClass] || []),
          newAttendance,
        ],
      },
    }));
    setShowForm(false);
    setAttendanceData({});
    alert("Attendance marked successfully!");
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filterAttendance = () => {
    let filteredAttendance = { ...markedAttendance };

    if (filters.year) {
      filteredAttendance = {
        [filters.year]: filteredAttendance[filters.year] || {},
      };
    }

    if (filters.class) {
      Object.keys(filteredAttendance).forEach((year) => {
        filteredAttendance[year] = {
          [filters.class]: filteredAttendance[year][filters.class] || [],
        };
      });
    }

    if (filters.date || filters.type || filters.subject) {
      Object.keys(filteredAttendance).forEach((year) => {
        Object.keys(filteredAttendance[year]).forEach((cls) => {
          filteredAttendance[year][cls] = filteredAttendance[year][cls].filter(
            (record) =>
              (!filters.date || record.date === filters.date) &&
              (!filters.type || record.type === filters.type) &&
              (!filters.subject || record.subject === filters.subject)
          );
        });
      });
    }

    if (filters.name) {
      Object.keys(filteredAttendance).forEach((year) => {
        Object.keys(filteredAttendance[year]).forEach((cls) => {
          filteredAttendance[year][cls] = filteredAttendance[year][cls].map(
            (record) => ({
              ...record,
              attendance: record.attendance.filter((student) =>
                student.name.toLowerCase().includes(filters.name.toLowerCase())
              ),
            })
          );
        });
      });
    }

    return filteredAttendance;
  };

  const renderAttendanceForm = () => (
    <div className="attendance-form-overlay">
      <div className="attendance-form-container">
        <h2>Mark Student Attendance</h2>
        <form onSubmit={handleSubmit} className="attendance-form">
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={handleDateChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="year">Year:</label>
            <select
              id="year"
              value={selectedYear}
              onChange={handleYearChange}
              required
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="class">Class:</label>
            <select
              id="class"
              value={selectedClass}
              onChange={handleClassChange}
              required
            >
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="attendanceType">Attendance Type:</label>
            <select
              id="attendanceType"
              value={attendanceType}
              onChange={handleAttendanceTypeChange}
              required
            >
              <option value="lecture">Lecture</option>
              <option value="practical">Practical</option>
            </select>
          </div>
          {attendanceType === "lecture" ? (
            <div className="form-group">
              <label htmlFor="subject">Subject:</label>
              <select
                id="subject"
                value={selectedSubject}
                onChange={handleSubjectChange}
                required
              >
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="form-group">
              <label htmlFor="practical">Practical:</label>
              <select
                id="practical"
                value={selectedPractical}
                onChange={handlePracticalChange}
                required
              >
                {practicals.map((practical) => (
                  <option key={practical} value={practical}>
                    {practical}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="attendance-list">
            <h3>
              {selectedYear} - {selectedClass} -{" "}
              {attendanceType === "lecture"
                ? selectedSubject
                : selectedPractical}
            </h3>
            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Present</th>
                  <th>Absent</th>
                </tr>
              </thead>
              <tbody>
                {students[selectedYear][selectedClass].map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>
                      <input
                        type="radio"
                        id={`present-${student.id}`}
                        name={`attendance-${student.id}`}
                        value="present"
                        checked={attendanceData[student.id] === true}
                        onChange={() =>
                          handleAttendanceChange(student.id, true)
                        }
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="radio"
                        id={`absent-${student.id}`}
                        name={`attendance-${student.id}`}
                        value="absent"
                        checked={attendanceData[student.id] === false}
                        onChange={() =>
                          handleAttendanceChange(student.id, false)
                        }
                        required
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="form-actions">
            <button type="submit" className="mark-attendance-btn">
              Submit Attendance
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderMarkedAttendance = () => {
    const filteredAttendance = filterAttendance();
    return (
      <div className="marked-attendance">
        {Object.entries(filteredAttendance).map(([year, yearData]) => (
          <div key={year} className="year-container">
            <h2>{year}</h2>
            {Object.entries(yearData).map(([cls, classData]) => (
              <div key={cls} className="class-container">
                <h3>{cls}</h3>
                {classData.map((record, index) => (
                  <div key={index} className="attendance-record">
                    <h4>
                      {record.date} - {record.type} - {record.subject}
                    </h4>
                    <table>
                      <thead>
                        <tr>
                          <th>Student Name</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {record.attendance.map((student) => (
                          <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.isPresent ? "Present" : "Absent"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <TeacherNavBar />
      <div className="student-attendance-page">
        <div className="student-attendance-container">
          <h1 className="attendance-heading">Student Attendance</h1>
          <div className="filters">
            <input
              type="text"
              name="name"
              placeholder="Search by name"
              value={filters.name}
              onChange={handleFilterChange}
            />
            <select
              name="year"
              value={filters.year}
              onChange={handleFilterChange}
            >
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              name="class"
              value={filters.class}
              onChange={handleFilterChange}
            >
              <option value="">All Classes</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
            />
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
            ><option value="">All Types</option>
              <option value="lecture">Lecture</option>
              <option value="practical">Practical</option>
            </select>
            <select
              name="subject"
              value={filters.subject}
              onChange={handleFilterChange}
            >
              <option value="">All Subjects/Practicals</option>
              {subjects.concat(practicals).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <button className="open-form-btn" onClick={() => setShowForm(true)}>
            Mark Attendance
          </button>

          {showForm && renderAttendanceForm()}

          {renderMarkedAttendance()}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TeacherAttendance;
