import React, { useState } from "react";
import "./TeacherLeave.scss";
import TeacherNavBar from "./TeacherNavBar";
import Footer from "../Footer";

const TeacherLeave = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
    status: "Pending",
  });
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    const timeDiff = Math.abs(endDate - startDate);
    const numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

    const newLeave = {
      startDate: formData.startDate,
      endDate: formData.endDate,
      reason: formData.reason,
      status: formData.status,
      numberOfDays: numberOfDays,
    };

    setLeaveData([...leaveData, newLeave]);
    setFormData({
      startDate: "",
      endDate: "",
      reason: "",
      status: "Pending",
    });
    setIsFormVisible(false);
  };

  const handleApplyLeaveClick = () => {
    setIsFormVisible(true);
  };

  return (
    <div className="teacher-leave-page">
      <TeacherNavBar />
      <div className="teacher-leave-container">
        <h2 className="teacher-leave-heading">Leave Management</h2>
        <button className="apply-leave-btn" onClick={handleApplyLeaveClick}>
          Apply Leave
        </button>

        {isFormVisible && (
          <form className="leave-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">End Date:</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="reason">Reason:</label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Submit Leave Request
            </button>
          </form>
        )}

        <div className="leave-table-container">
          <h3 className="table-heading">Applied Leaves</h3>
          <div className="table-wrapper">
            <table className="leave-table">
              <thead>
                <tr>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Days</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leaveData.map((leave, index) => (
                  <tr key={index}>
                    <td>{leave.startDate}</td>
                    <td>{leave.endDate}</td>
                    <td>{leave.numberOfDays}</td>
                    <td>{leave.reason}</td>
                    <td className={leave.status.toLowerCase()}>
                      {leave.status}
                    </td>
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

export default TeacherLeave;
