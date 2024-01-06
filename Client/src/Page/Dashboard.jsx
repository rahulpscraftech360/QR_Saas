import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { checkFileData } from "../utils/checkFiledata";
import DataTable from "../components/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { addData, clearData } from "../utils/dataSlice";
import { addEventData } from "../utils/eventDataSlice";
import axios from "../utils/axiosConfig";
import AddParticipants from "./AddParticipants";
import EventDetails from "../components/EventDetails";
import { Layout, Menu, Row } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import Head from "../components/Head";
import Sidebar from "./../components/Sidebar";
import { Link } from "react-router-dom";
import { CalendarHeart, Home } from "lucide-react";
import {
  CalendarOutlined,
  HomeOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const Dashboard = ({ eventId }) => {
  console.log("ideeeeeeeeeeeeeeeeeeeee<<<<<<<<<<<", eventId);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [fileFields, setFileFields] = useState([]);
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [fileData, setFileData] = useState([]);

  const [qrCodeDataURI, setQRCodeDataURI] = useState(null);
  const [dataChange, setDataChange] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  console.log("ahowAdd", showAdd);
  // console.log("first params", eventId);
  const dispatch = useDispatch();
  console.log("filedata", fileData);
  console.log("lenghthh", fileData.length);

  const dataToSend = useSelector((state) => state.data);
  const organizationId = useSelector(
    (state) => state.organization.organizationData._id
  );
  console.log("org>>>>", organizationId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/events/${eventId}`);
        setEventData(response.data);
        dispatch(addEventData(response.data));
      } catch (error) {
        // Handle errors here
        console.error("Error fetching event data:", error);
      }
    };

    fetchData(); // Call the fetchData function here
  }, [eventId]);

  const onDrop = (acceptedFiles) => {
    setSelectedFile(null);
    setErrorMessage("");
    const file = acceptedFiles[0];
    const allowedTypes = [
      "application/json",
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Add .xlsx MIME type
    ];

    if (file && allowedTypes.includes(file.type)) {
      setSelectedFile(file);
      setErrorMessage("");
    } else {
      setSelectedFile(null);

      setErrorMessage(
        "Please select a valid file (JSON, CSV, Excel, or XLSX)."
      );
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = () => {
    // Logic for file upload goes here
    console.log("Uploading file:", selectedFile);
    // You can add further logic for file upload
    setFileFields([]);
    setNumberOfPeople(0);
    setFileData([]);
    checkFileData(selectedFile, setFileFields, setNumberOfPeople, setFileData);
  };
  useEffect(() => {
    if (fileData.length > 0) {
      console.log(fileData, ">>>>>>>");
      dispatch(addData(fileData));

      // Assuming addData is your action creator
    }
  }, [dispatch, fileData]);

  useEffect(() => {
    console.log("data changeddddd");
    const fetchData = async () => {
      try {
        const response = await axios.get(`/events/${eventId}`);
        // setEventData(response.data);
        console.log("adding to store>>>>>>", response.data);
        dispatch(addEventData(response.data));
        console.log("eventdata", response.data);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching event data:", error);
      }
    };

    fetchData();
  }, []);

  const handleClear = async () => {
    try {
      // Your data object to be sent to the backend

      setSelectedFile(null);
      setFileFields([]);
      setNumberOfPeople(0);
      setFileData([]);
      dispatch(clearData());
      setDataChange(!dataChange);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          {/* <Sidebar /> */}
          <Menu mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/">
                <div className="flex space-x-2">
                  <HomeOutlined
                    style={{ fontSize: "1.5em", verticalAlign: "middle" }}
                  />
                  {!collapsed && (
                    <h1 className="hidden sm:block  sm:text-2xl">Home</h1>
                  )}
                </div>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/events">
                <div className="flex space-x-2">
                  <CalendarOutlined
                    style={{ fontSize: "1.5em", verticalAlign: "middle" }}
                  />
                  {!collapsed && (
                    <h1 className="hidden sm:block  sm:text-2xl">Events</h1>
                  )}
                </div>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <MenuOutlined />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
          <Content style={{ margin: "0 0" }}>
            <div className="site-layout-background">
              <div className="flex flex-col w-full   justify-center items-center bg-[#f5f5fe]  ">
                <h1 className="text-3xl font-bold mb-6">Event Information</h1>
                <div className="p-6 m-4 w-full md:w-2/3 flex justify-center">
                  <div className=" p-6 m-4 flex flex-col bg-[#f6f6f6] rounded-lg shadow-xl shadow-slate-500 border-spacing-1 justify-center items-center ">
                    {eventData && (
                      <EventDetails
                        setShowAdd={setShowAdd}
                        showAdd={showAdd}
                        eventData={eventData}
                      />
                    )}

                    {showAdd && (
                      // <div className="w-fullp-6 flex flex-col bg-[#f6f6f6] rounded-lg shadow-xl shadow-slate-500 border-spacing-1 justify-center items-center  ">
                      <div className=" w-full p-3  bg-[#f6f6f6] rounded-lg shadow-xl ">
                        <h1 className=" text-3xl font-bold mb-6">
                          Add Participants
                        </h1>

                        <div className="mb-6">
                          <label
                            htmlFor="sourceDropdown"
                            className="block mb-2 text-lg"
                          ></label>
                        </div>
                        <div className="mb-6">
                          <label
                            htmlFor="fileInput"
                            className="block mb-2 text-lg"
                          >
                            <h2 className=" text-xl font-semibold mb-4 pl-2">
                              Upload File
                            </h2>
                          </label>
                          <div
                            {...getRootProps()}
                            className="border border-dashed rounded-md p-4 cursor-pointer"
                          >
                            <input
                              {...getInputProps()}
                              accept=".json, .csv, .xls, .xlsx"
                            />
                            {isDragActive ? (
                              <div className="flex flex-col w-full md:w-1/3 items-center justify-center pt-5 pb-6">
                                <svg
                                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 20 16"
                                >
                                  <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                  />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                  <span className="font-semibold">
                                    Drop the files Here
                                  </span>{" "}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  JSON, CSV, Excel, or XLSX
                                </p>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 20 16"
                                >
                                  <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                  />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  JSON, CSV, Excel, or XLSX
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        {errorMessage && (
                          <p className="text-red-500 mb-4">{errorMessage}</p>
                        )}
                        {selectedFile && (
                          <div className="bg-gray-100 p-4 rounded-md">
                            <h2 className="text-xl font-semibold mb-2">
                              Selected File:
                            </h2>
                            <div className="h-px bg-gray-600 my-4"></div>

                            <p className="text-gray-700">
                              File Name: {selectedFile.name}
                            </p>
                            <p className="text-gray-700">
                              File Type: {selectedFile.type}
                            </p>

                            <div className="flex justify-center">
                              <button
                                onClick={handleUpload}
                                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none"
                              >
                                Parse Data
                              </button>
                            </div>
                          </div>
                        )}
                        {selectedFile && (
                          <div className="grid grid-col-3">
                            <h2 className=" text-xl font-semibold mb-4 pl-2 ">
                              Available Data
                            </h2>

                            {numberOfPeople > 0 && (
                              <div className="text-xl font-semibold mb-4 pl-2 ">
                                No of People : {numberOfPeople}{" "}
                              </div>
                            )}
                            {fileFields ? (
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {fileFields.map((field, index) => (
                                  <li
                                    key={index}
                                    className="bg-emerald-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none"
                                  >
                                    {field}
                                  </li>
                                ))}
                              </div>
                            ) : (
                              <>
                                <div>nill</div>
                              </>
                            )}
                          </div>
                        )}
                        <DataTable
                          fileFields={fileFields}
                          handleClear={handleClear}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;
