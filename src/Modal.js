import React from "react";
import "./Modal.scss"; // Import the SCSS file for styling

const Modal = ({ isOpen, onClose }) => {
  return (
    isOpen && (
      <div className="modalView-overlay">
        <div className="modalView">
          <div className="modalView-header">
            <button className="close-btn" onClick={onClose}>
              X
            </button>
          </div>
          <div className="modalView-body">
            <h2>Time to decide!</h2>
            <p>You can eat now or go to a nearby place!</p>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
