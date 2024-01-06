// // // DataTable.js
// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteData, updateData, updateDataList } from "../utils/dataSlice";

// const EditModal = ({ rowData, onUpdate, showModal, setShowModal }) => {
//   const [editedData, setEditedData] = useState(rowData);
//   const dispatch = useDispatch();
//   const modalRef = useRef(null);
//   const [errorMessage, setErrorMessage] = useState("");
//   useEffect(() => {
//     setEditedData(rowData);
//   }, [rowData]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedData({ ...editedData, [name]: value });
//   };

//   const handleUpdate = () => {
//     const { name, email, phoneNumber } = editedData;

//     // Check if all fields are present and validate email and phone number
//     if (
//       name &&
//       email &&
//       phoneNumber &&
//       /^\S+@\S+\.\S+$/.test(email) &&
//       /^\d*$/.test(phoneNumber)
//     ) {
//       console.log("Updated data:", editedData);
//       dispatch(updateDataList(editedData));
//       setShowModal(false);
//       setErrorMessage(""); // Clear any previous error message
//     } else {
//       setErrorMessage("Please provide valid data for all fields."); // Set error message for validation failure
//     }
//   };

//   const handleCloseModal = (e) => {
//     if (modalRef.current && !modalRef.current.contains(e.target)) {
//       setShowModal(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleCloseModal);
//     return () => {
//       document.removeEventListener("mousedown", handleCloseModal);
//     };
//   }, []);

//   const handleEmailChange = (e) => {
//     const { value } = e.target;
//     // Basic email pattern check

//     setEditedData({ ...editedData, email: value });
//   };

//   const handlePhoneChange = (e) => {
//     const { value } = e.target;
//     // Check if the input value is a number
//     if (/^\d*$/.test(value)) {
//       setEditedData({ ...editedData, phoneNumber: value });
//     }
//   };

//   return (
//     <div className="modal  " ref={modalRef}>
//       <div>
//         <input
//           className="border bottom-1 bg-slate-400 p-2"
//           type="text"
//           name="name"
//           value={editedData.name}
//           onChange={handleInputChange}
//         />
//         <input
//           className="border bottom-1 bg-slate-400 p-2"
//           type="text"
//           name="email"
//           value={editedData.email}
//           onChange={handleEmailChange}
//         />
//         <input
//           className="border bottom-1 bg-slate-400 p-2"
//           type="text"
//           name="phoneNumber"
//           value={editedData.phoneNumber}
//           onChange={handlePhoneChange}
//         />
//         {/* Update button */}

//         <button className="bg-blue-500 p-2 rounded-lg" onClick={handleUpdate}>
//           Update
//         </button>
//       </div>
//       <div>
//         {errorMessage && <div className="error-message">{errorMessage}</div>}
//       </div>
//       {/* Input fields for editing */}
//     </div>
//   );
// };
// const DataTable = ({ fileFields, handleSubmit }) => {
//   const data = useSelector((state) => state.data);
//   const dispatch = useDispatch();
//   console.log("data>>> table", data);
//   const [currentPage, setCurrentPage] = useState(1);
//   const dataLength = data ? data.length : 0;

//   const pageSize = 5;

//   // Calculate pagination logic
//   const indexOfLastRow = currentPage * pageSize;
//   const indexOfFirstRow = indexOfLastRow - pageSize;
//   const currentRows = data?.slice(indexOfFirstRow, indexOfLastRow) || [];

//   const index = indexOfFirstRow + 1;
//   // Pagination buttons
//   const pageNumbers = [];
//   if (data) {
//     for (let i = 1; i <= Math.ceil(data.length / pageSize); i++) {
//       pageNumbers.push(
//         <button key={i} onClick={() => setCurrentPage(i)} className="mr-2">
//           {i}
//         </button>
//       );
//     }
//   }
//   const [showModal, setShowModal] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);

//   // const handleRowClick = (row) => {
//   //   setShowModal(true);
//   //   setSelectedRow(row);
//   // };
//   const handleEdit = (row) => {
//     setSelectedRow(row);
//     setShowModal(true);
//   };

//   const handleDelete = (id) => {
//     dispatch(deleteData(id));
//   };
//   const handleUpdateData = (updatedData) => {
//     // console.log(updateData);
//     dispatch(updateDataList(updatedData));
//     setShowModal(false);
//   };

//   const isAllRowsFilled = data.every(
//     (row) => row.name && row.email && row.phoneNumber
//   );

//   return (
//     <div>
//       {dataLength > 0 && (
//         <>
//           <h2 className="text-xl font-semibold mb-4 pl-2">
//             Available Data ({data.length} people)
//           </h2>
//           {currentRows.some(
//             (row) => !row.name || !row.email || !row.phoneNumber
//           ) && (
//             <div className="incomplete-data-banner">Incomplete Data Found</div>
//           )}
//           {showModal && selectedRow && (
//             <div className="modal-overlay">
//               <div className="modal-content">
//                 <EditModal
//                   rowData={selectedRow}
//                   onUpdate={handleUpdateData}
//                   showModal={showModal}
//                   setShowModal={setShowModal}
//                   onClose={() => setShowModal(false)}
//                 />
//               </div>
//             </div>
//           )}
//           <div className="table-container">
//             <table className="data-table">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Phone Number</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentRows.map((row, count) => {
//                   const isDataIncomplete =
//                     !row.name || !row.email || !row.phoneNumber;
//                   const rowClassName = isDataIncomplete
//                     ? "incomplete-row"
//                     : "complete-row";

//                   return (
//                     <tr key={row.id} className={rowClassName}>
//                       <td>{row.name}</td>
//                       <td>{row.email}</td>
//                       <td>{row.phoneNumber}</td>
//                       <td>
//                         <button
//                           onClick={() => handleEdit(row)}
//                           className="text-blue-500 mr-2"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(row.id)}
//                           className="text-red-500"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>

//             <div className="pagination">{pageNumbers}</div>

//             <div className="submit-button">
//               {fileFields.includes("name") && fileFields.includes("email") && (
//                 <button
//                   onClick={handleSubmit}
//                   className={`submit-btn ${isAllRowsFilled ? "" : "disabled"}`}
//                   disabled={!isAllRowsFilled}
//                 >
//                   Submit
//                 </button>
//               )}
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default DataTable;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDataList, deleteData } from "../utils/dataSlice";
import CompleteDataTable from "./CompleteDataTable";
import IncompleteDataTable from "./IncompleteDataTable";

const DataTable = ({ handleClear }) => {
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [completeData, setCompleteData] = useState([]);
  const [incompleteData, setIncompleteData] = useState([]);

  useEffect(() => {
    const complete = data.filter(
      (row) => row.name && row.email && row.phoneNumber
    );
    const incomplete = data.filter(
      (row) => !row.name || !row.email || !row.phoneNumber
    );

    setCompleteData(complete);
    setIncompleteData(incomplete);
  }, [data]);

  const handleUpdateData = (updatedData) => {
    dispatch(updateDataList(updatedData));
  };

  const handleDelete = (id) => {
    dispatch(deleteData(id));
  };

  return (
    <div>
      <h2>Incomplete Data</h2>
      <IncompleteDataTable
        data={incompleteData}
        onUpdate={handleUpdateData}
        onDelete={handleDelete}
      />

      <h2>Complete Data</h2>
      <CompleteDataTable
        data={completeData}
        onUpdate={handleUpdateData}
        handleClear={handleClear}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default DataTable;
