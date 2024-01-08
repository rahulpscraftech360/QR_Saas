import React, { useEffect } from "react";
import QRCodeScanner from "./QRCodeScanner"; // Assuming you have this component
import axios from "../utils/axiosConfig";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const TabletQRCodeScanner = ({
  backgroundImage,
  scannerSize,
  scannerPosition,
}) => {
  const eventData = useSelector((store) => store.eventData[0]);
  const eventId = eventData.id;
  console.log("scannerSize", scannerSize);
  const navigate = useNavigate();
  const extractCSSSettings = () => {
    return {
      tabletContainer: {
        width: "768px", // Increase the width for a larger preview
        height: "100%",
        position: "relative",
        background: "white",
        borderRadius: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      },
      tabletBackground: {
        backgroundImage: `url(${backgroundImage})`,
        position: "absolute",
        top: "0",
        left: "0",
        height: "100%",
        width: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      },
      scanner: {
        width: "200px", // Adjust if necessary
        height: "300px",
        // width: `${scannerSize}%`, // You need to pass scannerSize value
        // height: `${1.5 * scannerSize}%`, // Same here for scannerSize
        position: "absolute",
        top: `${scannerPosition.top}%`,
        left: `${scannerPosition.left}%`,
        border: "4px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
      },
    };
  };
  useEffect(() => {
    if (backgroundImage) {
      const css = extractCSSSettings();
      console.log("cssss", css);
    }
  }, []);
  const handleUploadScannerTemplate = async () => {
    try {
      const cssSettings = extractCSSSettings();
      // setIsLoading(true);
      console.log("CSS Settings:", cssSettings);

      const response = await axios.post(
        `/events/${eventId}/saveTemplate`,
        cssSettings
      );

      if (response.status === 200) {
        console.log("CSS settings saved successfully", response.data);
        alert("Template settings saved successfully");
      } else {
        console.error(
          "Failed to save CSS settings",
          response.status,
          response.data
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div
        className="flex justify-center items-center w-full"
        style={{ height: "80vh" }}
      >
        <div
          className="tablet-container"
          style={{
            width: "768px", // Increase the width for a larger preview
            height: "100%", // Adjust padding-top to maintain the 4:3 aspect ratio (37.5% of 50%)
            position: "relative", // for absolute positioning inside
            background: "white",
            borderRadius: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            overflow: "hidden",
            borderWidth: ".9rem",
          }}
        >
          <div
            className="tablet-background"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>

          <div
            className="scanner"
            style={{
              width: "200px", // Adjust if necessary
              height: "300px",
              position: "absolute",
              top: `${scannerPosition.top}%`,
              left: `${scannerPosition.left}%`,
              border: "4px solid #ccc",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          ></div>
        </div>
      </div>
      <div className=" flex item-center justify-center">
        <button
          onClick={handleUploadScannerTemplate}
          className="bg-blue-400 m-3 p-2 rounded-lg text-white text-lg"
        >
          Submit Template
        </button>
      </div>
    </div>
  );
};

export default TabletQRCodeScanner;
