import React, { useState } from "react";
import "./TeacherTimeTable.scss";
import TeacherNavBar from "./TeacherNavBar";
import Footer from "../Footer";

const TeacherTimeTable = () => {
  const [timeTableData, setTimeTableData] = useState([]);
  const [formData, setFormData] = useState({
    className: "",
    year: "",
    timeTableImage: null,
  });
  const [showForm, setShowForm] = useState(false); // State to toggle the form visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      timeTableImage: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.className && formData.year && formData.timeTableImage) {
      // Add the new timetable to the state
      const newTimeTable = {
        className: formData.className,
        year: formData.year,
        image: formData.timeTableImage,
      };

      setTimeTableData([...timeTableData, newTimeTable]);

      // Clear form data and hide the form after submission
      setFormData({
        className: "",
        year: "",
        timeTableImage: null,
      });
      setShowForm(false); // Close the form
    } else {
      alert("Please fill all the fields and upload an image.");
    }
  };

  return (
    <>
      <TeacherNavBar />
      <div className="teacher-time-table-container">
        <h2 className="teacher-time-table-heading">Manage Time Tables</h2>

        {/* Button to toggle the form visibility */}
        <button
          className="add-time-table-btn"
          onClick={() => setShowForm(true)}
        >
          ADD Time Table
        </button>

        {/* Display the form if showForm is true */}
        {showForm && (
          <form className="time-table-form" onSubmit={handleSubmit}>
            <label>
              Class:
              <input
                type="text"
                name="className"
                value={formData.className}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Year:
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Upload Time Table Image:
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </label>

            <button type="submit" className="submit-btn">
              Add Time Table
            </button>
          </form>
        )}

        {/* Display added time tables */}
        <div className="time-table-display">
          {timeTableData.length > 0 ? (
            <div className="time-table-list">
              {timeTableData.map((data, index) => (
                <div key={index} className="time-table-item">
                  <h3>{`${data.className} - ${data.year}`}</h3>
                  <img
                    src={data.image}
                    alt={`${data.className} Time Table`}
                    className="time-table-image"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p>No timetables added yet. Please add a timetable.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TeacherTimeTable;
  