import React, { useEffect, useState } from "react";
import defaultBackgroundImage from "../../src/images/MailTemplateBackgroundImage.jpeg";
import QrCodeImage from "../../src/images/QR1.jpg";
import { useSelector } from "react-redux";
import QRCode from "qrcode";
import * as htmlToImage from "html-to-image";

const EventInvitationPreview = (props) => {
  const eventData = useSelector((store) => store.eventData[0]);
  console.log("clg>>>>>>>>>>>>>>>>>>>", props.template);

  const [backgroundImage, setBackgroundImage] = useState(props.backgroundImage);
  console.log("clg>>>>>>>>backgroundImage>>>>>>>>>>>", backgroundImage);

  const [qrCodeImages, setQrCodeImages] = useState();
  console.log("qrCodeImages", qrCodeImages);
  const [horizontalPosition, setHorizontalPosition] = useState(50);
  const [verticalPosition, setVerticalPosition] = useState(50);
  const [qrCodeSize, setQrCodeSize] = useState(8);
  const handleHorizontalChange = (e) => {
    setHorizontalPosition(e.target.value);
  };

  const handleVerticalChange = (e) => {
    setVerticalPosition(e.target.value);
  };

  const handleSizeChange = (e) => {
    setQrCodeSize(e.target.value);
  };

  useEffect(() => {
    setBackgroundImage(props.defaultBackgroundImage);
  }, [props]);
  const participantQRCodes = [];

  const generateQRCode = async (participantId) => {
    try {
      // Generate QR code for each participant ID
      const qrCodeDataUrl = await QRCode.toDataURL(
        `Participant ID: ${participantId}`
      );

      // Store the QR code data URL in the array
      participantQRCodes.push({
        participant: participantId,
        qrcode: qrCodeDataUrl,
      });
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
    console.log(participantQRCodes);
    setQrCodeImages(participantQRCodes);
  };

  const sendEmail = () => {
    if (
      eventData &&
      eventData.participants &&
      eventData.participants.length > 0
    ) {
      eventData.participants.forEach((participantId) => {
        generateQRCode(participantId);
      });
    }
  };

  const handleEmailSubmit = () => {
    generateQRCode();

    // sendEmail();
  };

  const previewStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    width: "500px", // Adjust the width as needed
    height: "80vh", // Adjust the height as needed
    backgroundColor: "red",
  };

  const qrCodeStyle = {
    position: "absolute",
    top: `${verticalPosition}%`,
    left: `${horizontalPosition}%`,
    transform: "translate(-50%, -50%)",
    width: `${qrCodeSize}rem`, // Adjust the QR code size as needed
    height: `${qrCodeSize}rem`, // Adjust the QR code size as needed
  };

  const htmlTemplate = `<html lang=\"en\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><style>body { margin: 0; padding: 0; height: 80vh; } #htmltoimage { position: relative; text-align: center; height: 100%; display: flex; align-items: center; justify-content: center; } .background-image { max-width: 100%; max-height: 100%; object-fit: contain; } .overlay-image { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); max-width: 15%; max-height: 15%; } </style><title>emailimage</title></head><body><div id=\"htmltoimage\"><img class=\"background-image\" src=\"https://s0hjs.mjt.lu/img2/s0hjs/db5b9cfa-90d8-4a2d-b1ca-03732b9a6b24/content\" alt=\"background image\"><img class=\"overlay-image\" src=\"https://s0hjs.mjt.lu/img2/s0hjs/db5b9cfa-90d8-4a2d-b1ca-03732b9a6b24/content\" alt=\"overlay image\"></div></body></html>`;

  return (
    <div class="flex flex-col justify-center items-center  ">
      <div style={previewStyle}>
        <div id="container">
          <div dangerouslySetInnerHTML={{ __html: htmlTemplate }} />{" "}
        </div>
        <div style={qrCodeStyle}>
          <img src={QrCodeImage} alt="QR Code" />
        </div>
      </div>
      <div className="mt-5">
        <div>
          <label htmlFor="horizontal" className=" text-lg pt-1">
            Horizontal Position: {horizontalPosition}%
          </label>
          <input
            className=" ml-2"
            type="range"
            id="horizontal"
            min="0"
            max="100"
            value={horizontalPosition}
            onChange={handleHorizontalChange}
          />
        </div>
        <div>
          <label htmlFor="vertical" className=" text-lg pt-1">
            Vertical Position: {verticalPosition}%
          </label>
          <input
            className=" ml-8"
            type="range"
            id="vertical"
            min="0"
            max="100"
            value={verticalPosition}
            onChange={handleVerticalChange}
          />
        </div>
        <div>
          <label className=" text-lg pt-1" htmlFor="qrSize">
            QR Code Size (rem):
          </label>
          <input
            className=" ml-2  border border-spacing-1 border-black rounded-lg text-center"
            type="number"
            value={qrCodeSize}
            onChange={handleSizeChange}
            step="0.1"
          />
        </div>
        <button
          onClick={handleEmailSubmit}
          className="bg-green-500  rounded-lg  p-3"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default EventInvitationPreview;
