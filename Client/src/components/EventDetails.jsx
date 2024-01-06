import React, { useState } from "react";

import ParticipantsTable from "./ParticipantsTable.jsx";
import { useNavigate } from "react-router-dom";
// import Modal from "react-modal";
import {
  MailOutlined,
  MessageOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";

import { Button } from "antd";
import Modal from "antd/es/modal/Modal.js";
const EventDetails = ({ eventData, showAdd, setShowAdd }) => {
  const eventId = eventData.id;
  console.log("eventIdddd", eventId);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const showAddParticipent = () => {
    return setShowAdd(!showAdd);
  };
  const handleOptionClick = (option) => {
    if (option === "email") {
      navigate(`/events/${eventId}/sendInvitation`);
    }
    // Handle other options as needed
    // For example: message, pdf
    console.log(`Selected option: ${option}`);
    closeModal(); // Close modal after selecting an option
  };
  const ScannerTabletPreview = (option) => {
    navigate(`/events/${eventId}/tabPreview`);

    // Handle other options as needed
    // For example: message, pdf
  };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  console.log("eventData????", eventData);

  const navigate = useNavigate();
  return (
    <div className=" mx-auto   mt-1  ">
      <h2 className="text-3xl font-bold mb-4 text-center text-[#182a23]">
        {eventData?.title}
      </h2>

      <div className=" ">
        <div className=" flex justify-center">
          <div className="gap-3 flex">
            <div className="mr-2">
              <Button
                onClick={showAddParticipent}
                className="add-participant-button "
                style={{ backgroundColor: "", color: "Blue" }}
              >
                Add participant
              </Button>
            </div>
            <div>
              <Button
                onClick={openModal}
                className="send-invitation-button"
                style={{ backgroundColor: "", color: "green" }}
              >
                Send Invitation
              </Button>
            </div>
            <div>
              <Button
                onClick={ScannerTabletPreview}
                className="send-invitation-button"
                style={{ backgroundColor: "", color: "black" }}
              >
                Scanner
              </Button>
            </div>
          </div>
        </div>

        <div className="col-span-2 col-start-5"></div>

        <Modal
          title="Choose an option"
          visible={modalIsOpen}
          onCancel={closeModal}
          footer={null} // Remove default footer buttons
        >
          <div className="text-center">
            <Button
              onClick={() => handleOptionClick("email")}
              className="mr-2 custom-email-button"
              icon={<MailOutlined />}
            >
              Email
            </Button>
            <Button
              onClick={() => handleOptionClick("message")}
              className="mr-2 custom-message-button"
              icon={<MessageOutlined />}
            >
              Message
            </Button>
            <Button
              onClick={() => handleOptionClick("pdf")}
              className="mr-2 custom-pdf-button"
              icon={<FilePdfOutlined />}
            >
              PDF
            </Button>
          </div>
        </Modal>
      </div>

      <p className="text-gray-600 font-bold mb-4">Date</p>
      <p className="text-gray-600 mb-2">{formatDate(eventData?.date)}</p>
      <p className="text-gray-600 font-bold mb-4">Location</p>
      <p className="text-gray-600 mb-2">{eventData?.location}</p>

      <div className="min-h-[100px]">
        <p className="text-gray-600 font-bold mb-4">Description</p>
        <p className="text-gray-600 mb-6">{eventData.description}</p>
      </div>

      <h3 className="text-lg font-semibold mb-2">
        Participants: {eventData?.participants?.length}
      </h3>

      {eventData?.participants && <ParticipantsTable id={eventData.id} />}
    </div>
  );
};

export default EventDetails;
