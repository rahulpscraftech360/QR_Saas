import React, { useState, useEffect } from "react";

const EditModal = ({ rowData, onUpdate, showModal, setShowModal }) => {
  const [editedData, setEditedData] = useState(rowData);

  useEffect(() => {
    if (showModal) {
      setEditedData(rowData);
    }
  }, [rowData, showModal]);

  const handleInputChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Validation logic here
    onUpdate(editedData);
  };

  return showModal ? (
    <div className="modal">
      <input
        type="text"
        name="name"
        placeholder="name"
        value={editedData.name || ""}
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        placeholder="email"
        value={editedData.email || ""}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="phoneNumber"
        placeholder="phoneNumber"
        value={editedData.phoneNumber || ""}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Update</button>
      <button onClick={() => setShowModal(false)}>Close</button>
    </div>
  ) : null;
};

export default EditModal;
