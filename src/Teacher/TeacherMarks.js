import React, { useState, useEffect } from "react";
import "./TeacherMarks.scss";
import TeacherNavBar from "./TeacherNavBar";
import Footer from "../Footer";

// Sample Data for Students, Subjects, and Marks
const students = [
  { id: 1, name: "Mohit Sharma" },
  { id: 2, name: "Rohit Sharma" },
  { id: 3, name: "Virat Kohli" },
  { id: 4, name: "Rishabh Pant" },
];

const subjects = [
  { id: 1, name: "Mathematics" },
  { id: 2, name: "Science" },
  { id: 3, name: "English" },
];

const TeacherMarks = () => {
  const [selectedYear, setSelectedYear] = useState("1 Year");
  const [selectedInternal, setSelectedInternal] = useState("Internal 1");
  const [marksData, setMarksData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [animateForm, setAnimateForm] = useState(false);

  useEffect(() => {
    if (showForm) {
      setTimeout(() => setAnimateForm(true), 50);
    } else {
      setAnimateForm(false);
    }
  }, [showForm]);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleInternalChange = (e) => {
    setSelectedInternal(e.target.value);
  };

  const handleAssignMarks = () => {
    setShowForm(true);
  };

  const handleMarkChange = (e, studentId, subjectId) => {
    let value = e.target.value;
    value = Math.max(0, Math.min(20, Number(value)));
    setMarksData((prevData) => ({
      ...prevData,
      [selectedYear]: {
        ...prevData[selectedYear],
        [selectedInternal]: {
          ...prevData[selectedYear]?.[selectedInternal],
          [studentId]: {
            ...prevData[selectedYear]?.[selectedInternal]?.[studentId],
            [subjectId]: value,
          },
        },
      },
    }));
  };

  const handleSubmitMarks = () => {
    setShowForm(false);
  };

  return (
    <div className="teacher-marks-page">
      <TeacherNavBar />
      <div className="teacher-marks-container">
        <h2 className="marks-heading">Assign Marks</h2>

        <div className="marks-controls">
          <div className="marks-selection">
            <label htmlFor="year">Select Year:</label>
            <select
              id="year"
              value={selectedYear}
              onChange={handleYearChange}
              className="selection-dropdown"
            >
              <option value="1 Year">1 Year</option>
              <option value="2 Year">2 Year</option>
              <option value="3 Year">3 Year</option>
            </select>
          </div>

          <div className="marks-selection">
            <label htmlFor="internal">Select Internal Exam:</label>
            <select
              id="internal"
              value={selectedInternal}
              onChange={handleInternalChange}
              className="selection-dropdown"
            >
              <option value="Internal 1">Internal 1</option>
              <option value="Internal 2">Internal 2</option>
            </select>
          </div>

          <button className="assign-mark-btn" onClick={handleAssignMarks}>
            Assign Marks
          </button>
        </div>

        {showForm && (
          <div className={`assign-marks-form ${animateForm ? 'show' : ''}`}>
            <h3 className="form-heading">
              Assign Marks for {selectedYear} - {selectedInternal}
            </h3>
            <div className="table-container">
              <table className="marks-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    {subjects.map((subject) => (
                      <th key={subject.id}>{subject.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      {subjects.map((subject) => (
                        <td key={subject.id}>
                          <input
                            type="number"
                            min="0"
                            max="20"
                            value={
                              marksData[selectedYear]?.[selectedInternal]?.[
                                student.id
                              ]?.[subject.id] || ""
                            }
                            onChange={(e) =>
                              handleMarkChange(e, student.id, subject.id)
                            }
                            className="marks-input"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="submit-btn" onClick={handleSubmitMarks}>
              Submit Marks
            </button>
          </div>
        )}

        <div className="marks-display">
          <h3 className="marks-display-heading">
            Marks for {selectedYear} - {selectedInternal}
          </h3>
          <div className="table-container">
            <table className="marks-table">
              <thead>
                <tr>
                  <th>Student</th>
                  {subjects.map((subject) => (
                    <th key={subject.id}>{subject.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    {subjects.map((subject) => (
                      <td key={subject.id}>
                        {marksData[selectedYear]?.[selectedInternal]?.[
                          student.id
                        ]?.[subject.id] || "-"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TeacherMarks;

