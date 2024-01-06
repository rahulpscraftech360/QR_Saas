// // DataTable.js
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteData, updateData } from "../utils/dataSlice";
import axios from "../utils/axiosConfig";

import { Pagination, Table } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// const ParticipantsTable = (params) => {
//   const id = params;

//   console.log("idddddd", id);
//   const [data, setData] = useState([]);
//   const [trigger, setTrigger] = useState(true);
//   console.log("params", ">>>>>>>", params);
//   console.log("data>>> table", params);
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

//   useEffect(() => {
//     const fetchData = async () => {
//       const eventId = id.id; // Extract the ID from the object
//       console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE", eventId);
//       const response = await axios.get(`/events/${eventId}/allParticipent`, {
//         timeout: 10000,
//       });
//       console.log(response);
//       setData(response.data);
//     };
//     fetchData();
//   }, [trigger]);

//   const deleteOne = async (userId) => {
//     const eventId = id.id;
//     console.log("deleting", userId);
//     let confirmDelete = window.confirm(
//       "Are you sure to delete this participant?"
//     );
//     if (confirmDelete) {
//       try {
//         const response = await axios.patch(
//           `/events/${eventId}/removeParticipant`,
//           {
//             userId,
//           }
//         );
//         console.log(response.data);
//         setTrigger(!trigger);
//         // Log the response data
//       } catch (error) {
//         console.error(error); // Log any errors
//       }
//     }
//     return false;
//   };

//   return (
//     <div>
//       {dataLength > 0 && (
//         <>
//           <h2 className="text-xl font-semibold mb-4 pl-2">
//             Available Data ({data.length} people)
//           </h2>

//           <table className=" w-full border-collapse border border-gray-600">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Phone Number</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody className="w-full">
//               {currentRows.map((row, count) => (
//                 <tr key={row.id}>
//                   <td>{index + count}</td> {/* Display serial number */}
//                   <td>{row.name}</td>
//                   <td>{row.email}</td>
//                   <td>{row.phoneNumber}</td>
//                   <td>
//                     <button
//                       onClick={() => {
//                         console.log("row", row.id);
//                         deleteOne(row.id);
//                       }}
//                       className="text-red-500"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <div className="mt-4">{pageNumbers}</div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ParticipantsTable;
// import React, { useEffect, useState } from "react";
// import axios from "../utils/axiosConfig";
// import { Table, Pagination } from "antd";
// import "antd/dist/antd.css"; // Import Ant Design styles
// import { useSelector } from "react-redux";

// const ParticipantsTable = (params) => {
//   const id = params.id;
//   // const [data, setData] = useState([]);
//   const updated = useSelector((store) => store.eventData[0].participants);
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 5;

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await axios.get(`/events/${id}/allParticipent`, {
//         timeout: 10000,
//       });
//       setData(response.data);
//     };
//     fetchData();
//   }, [id, updated]);

//   const deleteOne = async (userId) => {
//     let confirmDelete = window.confirm(
//       "Are you sure to delete this participant?"
//     );
//     if (confirmDelete) {
//       try {
//         await axios.patch(`/events/${id}/removeParticipant`, { userId });
//         setData((prevData) => prevData.filter((user) => user.id !== userId));
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };

//   // Define columns for Ant Design table
//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "Phone Number",
//       dataIndex: "phoneNumber",
//       key: "phoneNumber",
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => (
//         <button onClick={() => deleteOne(record.id)} className="text-red-500">
//           Delete
//         </button>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4 pl-2">
//         Available Data ({data.length} people)
//       </h2>
//       <Table
//         dataSource={data}
//         columns={columns}
//         rowKey="id"
//         pagination={false} // Disable built-in pagination
//       />
//       <Pagination
//         current={currentPage}
//         onChange={(page) => setCurrentPage(page)}
//         total={data.length}
//         pageSize={pageSize}
//         className="mt-4"
//       />
//     </div>
//   );
// };

// export default ParticipantsTable;

const ParticipantsTable = (params) => {
  const id = params.id;
  const updated = useSelector((store) => store.eventData[0].participants);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/events/${id}/allParticipent`, {
        timeout: 10000,
      });
      setData(response.data);
    };
    fetchData();
  }, [id, updated]);

  const deleteOne = async (userId) => {
    let confirmDelete = window.confirm(
      "Are you sure to delete this participant?"
    );
    if (confirmDelete) {
      try {
        await axios.patch(`/events/${id}/removeParticipant`, { userId });
        setData((prevData) => prevData.filter((user) => user.id !== userId));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Define columns for Ant Design table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <button onClick={() => deleteOne(record.id)} className="text-red-500">
          Delete
        </button>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 pl-2">
        Available Data ({data.length} people)
      </h2>
      <Table
        dataSource={data.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        )}
        columns={columns}
        rowKey="id"
        pagination={false} // Disable built-in pagination
      />
      <Pagination
        current={currentPage}
        onChange={handlePageChange}
        total={data.length}
        pageSize={pageSize}
        className="mt-4"
      />
    </div>
  );
};

export default ParticipantsTable;
