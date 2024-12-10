import React from "react";
import "./TeacherClass.scss";
import TeacherNavBar from "./TeacherNavBar";
import Footer from "../Footer";

const TeacherClass = () => {
  // Sample data representing assigned subjects
  const assignedSubjects = [
    {
      subject: "Mathematics",
      className: "Class 1",
      year: "1st Year",
    },
    {
      subject: "Science",
      className: "Class 2",
      year: "1st Year",
    },
    {
      subject: "English",
      className: "Class 3",
      year: "2nd Year",
    },
    {
      subject: "History",
      className: "Class 4",
      year: "2nd Year",
    },
    {
      subject: "Computer Science",
      className: "Class 5",
      year: "3rd Year",
    },
  ];

  return (
    <>
      <TeacherNavBar />
      <div className="teacher-class-container">
        <h2 className="teacher-class-heading">Assigned Subjects</h2>

        <div className="teacher-class-table-container">
          <table className="teacher-class-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Class</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {assignedSubjects.map((subjectData, index) => (
                <tr key={index}>
                  <td>{subjectData.subject}</td>
                  <td>{subjectData.className}</td>
                  <td>{subjectData.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TeacherClass;
