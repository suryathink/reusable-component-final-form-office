import React from "react";
import "./CustomModel.css";

const CustomModal = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <p>{message}</p>
        </div>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={() => window.location.reload()}>Leave</button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
