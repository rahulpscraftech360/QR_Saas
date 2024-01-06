// import React, { useState } from "react";
// import organizationSlice from "./../utils/organizationSlice";
// import { useSelector } from "react-redux";
// import axios from "../utils/axiosConfig";
// import Head from "../components/Head";
// import { useNavigate } from "react-router-dom";
// const EventCreationForm = () => {
//   const organization = useSelector(
//     (store) => store.organization.organizationData
//   );
//   const [errorMessage, setErrorMessage] = useState(null);
//   console.log(errorMessage, ":::::>>>>");
//   console.log(organization, "?????");
//   const [formData, setFormData] = useState({
//     title: "",
//     date: "",
//     location: "",
//     description: "",
//     organization: organization._id,
//   });
//   const navigate = useNavigate();
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Handle form submission logic
//     console.log("Form submitted:", formData);

//     try {
//       const response = await axios.post("/events", formData);
//       console.log(response.status);
//       if (response.status === 201) {
//         // Registration successful
//         alert(`Event created Successfully!`);
//         navigate("/events");
//       } else {
//         // Handle other success status codes or unexpected responses
//         console.error("Unexpected response:", response);
//       }
//     } catch (error) {
//       // Handle request failure or error
//       console.error("Event creation failed:>", error.response.data);

//       if (error.response && error.response.data && error.response.data.data) {
//         const errorMessage = error.response.data.data;

//         setErrorMessage(errorMessage); // Set the error message received from the backend
//       } else {
//         // Set a generic error message if specific error data is not available
//         setErrorMessage(
//           "An error occurred while creating the event. Please try again."
//         );
//       }
//     }
//   };

//   return (
//     <div className="sm:col-span-11">
//       <div className="p-4 rounded-lg shadow-md bg-blue-100">
//         <Head />
//         <h2 className="text-xl font-semibold mb-4 text-blue-700">
//           Create Event
//         </h2>
//         {errorMessage ? (
//           <label className="block mb-1 text-red-500">{errorMessage}</label>
//         ) : (
//           <div></div>
//         )}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <input
//               type="text"
//               name="title"
//               placeholder="Event Title"
//               value={formData.title}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
//             />
//           </div>
//           <div className="mb-4">
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
//             />
//           </div>
//           <div className="mb-4">
//             <input
//               type="text"
//               name="location"
//               placeholder="Location"
//               value={formData.location}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
//             />
//           </div>
//           <div className="mb-4">
//             <textarea
//               name="description"
//               placeholder="Description"
//               value={formData.description}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
//             ></textarea>
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none"
//           >
//             Create Event
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EventCreationForm;
import "antd/dist/antd.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, DatePicker, Alert } from "antd";
import Sidebar from "../components/Sidebar";
import Head from "../components/Head";
//import "antd/dist/antd.css"; // Import Ant Design styles

const EventCreationForm = () => {
  const organization = useSelector(
    (store) => store.organization.organizationData
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    console.log("Received values of form: ", values);
    const formData = {
      ...values,
      date: values["date"].format("YYYY-MM-DD"), // format date
      organization: organization._id,
    };

    try {
      const response = await axios.post("/events", formData);
      if (response.status === 201) {
        alert("Event created Successfully!");
        navigate("/events");
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Event creation failed: ", error.response.data);
      const message =
        error.response?.data?.data ||
        "An error occurred while creating the event. Please try again.";
      setErrorMessage(message);
    }
  };

  return (
    <>
      {/* <Header /> */}
      <Head />
      <div className=" flex ">
        <div className="  ">
          <Sidebar />
        </div>

        {/* <Head />
    <div className="w-1/6 sm:w-2/6">
    
    </div> */}
        <div className="w-full mt-5">
          <div className="flex justify-center items-center ">
            <div className="w-full max-w-2xl p-4 rounded-lg shadow-md bg-[#f5f5fe]  mx-auto">
              <h2 className="text-xl font-semibold mb-4 text-slate-700">
                Create Event
              </h2>
              {errorMessage && (
                <Alert
                  message={errorMessage}
                  type="error"
                  showIcon
                  className="mb-5 "
                />
              )}
              <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                  name="title"
                  label="Event Title"
                  rules={[
                    {
                      required: true,
                      message: "Please input the title of the event!",
                    },
                  ]}
                >
                  <Input placeholder="Event Title" />
                </Form.Item>
                <Form.Item
                  name="date"
                  label="Date"
                  rules={[
                    { required: true, message: "Please select the date!" },
                  ]}
                >
                  <DatePicker className="w-full" />
                </Form.Item>
                <Form.Item
                  name="location"
                  label="Location"
                  rules={[
                    { required: true, message: "Please input the location!" },
                  ]}
                >
                  <Input placeholder="Location" />
                </Form.Item>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: "Please input the description!",
                    },
                  ]}
                >
                  <Input.TextArea placeholder="Description" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="w-full">
                    Create Event
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCreationForm;
