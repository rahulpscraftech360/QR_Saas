import React, { useState } from "react";
import EditModal from "./EditModal";

const IncompleteDataTable = ({ data, onUpdate, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);

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
                  className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none mt-4`}
                  onClick={() => handleEdit(row)}
                >
                  Edit
                </button>
                <button
                  className={`bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none mt-4`}
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
    </div>
  );
};

export default IncompleteDataTable;
