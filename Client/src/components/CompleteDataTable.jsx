import React, { useState } from "react";
import EditModal from "./EditModal";
import { useDispatch, useSelector } from "react-redux";
import { addEventData } from "../utils/eventDataSlice";
import axios from "../utils/axiosConfig";
const CompleteDataTable = ({ data, onUpdate, onDelete, handleClear }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const handleEdit = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastRow = currentPage * pageSize;
  const indexOfFirstRow = indexOfLastRow - pageSize;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
  const isAllRowsFilled = data.every(
    (row) => row.name && row.email && row.phoneNumber
  );
  const eventData = useSelector((store) => store.eventData[0]);
  const eventId = eventData.id;
  const organizationId = useSelector(
    (store) => store.organization.organizationData._id
  );
  const handleSubmit = async () => {
    try {
      // Your data object to be sent to the backend

      //  Send a POST request to the backend with your data
      const response = await axios.post(
        `/events/${eventId}/${organizationId}/participants`,
        data
      );
      handleClear();

      //Handle the response from the backend if needed
      console.log("Response from backend:", response.data);
      dispatch(addEventData(response.data));
      alert("suceess");
    } catch (error) {
      // Handle errors if the request fails
      //console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="table-container">
      {showModal && selectedRow && (
        <div className="modal-overlay">
          <EditModal
            rowData={selectedRow}
            onUpdate={(updatedData) => {
              onUpdate(updatedData);
              setShowModal(false);
            }}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </div>
      )}
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.phoneNumber}</td>
              <td>
                <button
                  className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none mt-4 ${
                    isAllRowsFilled ? "" : "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={() => handleEdit(row)}
                >
                  Edit
                </button>
                <button
                  className={`bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none mt-4 ${
                    isAllRowsFilled ? "" : "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={() => onDelete(row.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: Math.ceil(data.length / pageSize) }, (_, i) => (
          <button key={i + 1} onClick={() => handlePageChange(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
      {/* {fileFields.includes("name") && fileFields.includes("email") && ( */}
      {data.length > 0 && (
        <button
          onClick={handleSubmit}
          className={`submit-btn ${isAllRowsFilled ? "" : "disabled"}`}
          disabled={!isAllRowsFilled}
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default CompleteDataTable;
