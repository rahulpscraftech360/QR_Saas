import React, { useEffect, useState } from "react";
import defaultBackgroundImage from "../../src/images/MailTemplateBackgroundImage.jpeg";
import QrCodeImage from "../../src/images/QR1.jpg";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const HtmlTempate = (props) => {
  const [backgroundImage, setBackGroundImage] = useState(null);
  console.log("backgroundImageee", backgroundImage);
  const [horizontalPosition, setHorizontalPosition] = useState(50);
  const [verticalPosition, setVerticalPosition] = useState(50);
  const [subject, setSubject] = useState("");
  const handleHorizontalChange = (e) => {
    setHorizontalPosition(e.target.value);
  };

  const navigate = useNavigate();
  useEffect(() => {
    // This block of code will execute when `backgroundImage` changes
    console.log("Background image has changed:", backgroundImage);
    setBackGroundImage(props);
    setSubject(props.subject);
  }, [props.backgroundImage, props.subject]);
  const participants = useSelector((store) => store.eventData[0].participants);
  console.log(participants, "participant");
  const handleVerticalChange = (e) => {
    setVerticalPosition(e.target.value);
  };
  useEffect(() => {
    console.log("props", props.backgroundImage);
    setBackGroundImage(props.backgroundImage);
    setSubject(props.subject);
    console.log("here", backgroundImage);
  }, []);

  const [htmlTemplate, setHtmlTemplate] = useState(`
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          margin: 0;
          padding: 0;
          height: auto;
        }
        #htmltoimage {
          position: relative;
          text-align: center;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .background-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        .overlay-image {
          position: absolute;
          top: ${verticalPosition}%;
          left: ${horizontalPosition}%;
          transform: translate(-50%, -50%);
          max-width:35%;
          max-height: 35%;
          position: "absolute",

        }
      </style>
      <title>emailimage</title>
    </head>
    <body>
      <div id="htmltoimage">
        <img class="background-image" src="${props.backgroundImage}" alt="background image">
        <img class="overlay-image" src="https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg" alt="overlay image">
      </div>
    </body>
    </html>
  `);
  useEffect(() => {
    setHtmlTemplate(`
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            margin: 0;
            padding: 0;
            height: 80%;
          }
          #htmltoimage {
            position: relative;
            text-align: center;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .backgroundImage {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
          }
          .overlayImage {
            position: absolute;
            top: ${verticalPosition}%; 
            left: ${horizontalPosition}%;
            transform: translate(-50%, -50%);
            max-width:35%;
          max-height: 35%;
            position: absolute;
          }
        </style>
        <title>emailimage</title>
      </head>
      <body>
        <div id="htmltoimage">
          <img class="backgroundImage" src="${props.backgroundImage}" alt="background image">
          <img class="overlayImage" src="https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg" alt="overlay image">
        </div>
      </body>
    </html>
  `);
  }, [horizontalPosition, verticalPosition, backgroundImage]);

  const saveTemplate = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/v1/template/templates/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ htmlContent: htmlTemplate }),
        }
      );

      if (response.ok) {
        // Handle success (template saved successfully)
        console.log("Template saved successfully!");
      } else {
        // Handle failure
        console.error("Failed to save template.");
      }
    } catch (error) {
      console.error("Error saving template:", error);
    }
  };

  const [htmlContent, setHtmlContent] = useState(""); // HTML content state

  const handleHtmlChange = (event) => {
    setHtmlContent(event.target.value); // Update HTML content in state
  };

  const sendHtmlToBackend = async () => {
    console.log(htmlTemplate);
    try {
      const response = await axios.post("http://localhost:5000/v1/email/send", {
        htmlTemplate,
        participants,
        subject,
      });

      // Log the response
      console.log("Response from the server:", response);
      if (response.status === 200) {
        const updatedHtml = response.data;
        // Handle the updated HTML received from the backend
        console.log("Updated HTML:", updatedHtml);
      } else {
        console.error("Failed to update HTML on the backend.");
      }
    } catch (error) {
      console.error("Error updating HTML:", error);
    }
  };

  const SendEmail = () => {
    console.log("template", htmlTemplate);
    // if (htmlTemplate) {
    //   const element = document.createElement("a");
    //   const file = new Blob([htmlTemplate], { type: "text/html" });
    //   element.href = URL.createObjectURL(file);
    //   console.log("JJJJJJJJJJJJJJJJJJ", element);
    //   element.download = "template.html";
    //   document.body.appendChild(element);
    //   element.click();
    //   document.body.removeChild(element);
    // }

    sendHtmlToBackend();
    navigate("/events/updates");
  };

  return (
    <div className=" ">
      <div
        dangerouslySetInnerHTML={{ __html: htmlTemplate }}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      {/* <button onClick={saveTemplate}>Save Template</button> */}

      <div className="  ">
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
          className=" ml-2"
          type="range"
          id="vertical"
          min="0"
          max="100"
          value={verticalPosition}
          onChange={handleVerticalChange}
        />
      </div>
      <div className="flex  justify-center">
        {" "}
        <button
          className="bg-emerald-500 text-white m-3 rounded-lg border p-2"
          onClick={SendEmail}
        >
          Send Email
        </button>
      </div>
    </div>
  );
};

export default HtmlTempate;
