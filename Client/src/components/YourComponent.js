import React, { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import defaultBackgroundImage from "../../src/images/MailTemplateBackgroundImage.jpeg";
import QrCodeImage from "../../src/images/QR1.jpg";
const YourComponent = () => {
  const [horizontalPosition, setHorizontalPosition] = useState(50);
  const [verticalPosition, setVerticalPosition] = useState(50);
  const [qrCodeSize, setQrCodeSize] = useState(8);
  const [backgroundImage, setBackgroundImage] = useState(
    defaultBackgroundImage
  );
  const [qrCodeImages, setQrCodeImages] = useState();
  const componentRef = useRef(null);

  const handleHorizontalChange = (e) => {
    setHorizontalPosition(e.target.value);
  };

  const handleVerticalChange = (e) => {
    setVerticalPosition(e.target.value);
  };

  const handleSizeChange = (e) => {
    setQrCodeSize(e.target.value);
  };

  const handleGenerateImage = () => {
    if (componentRef.current) {
      htmlToImage
        .toPng(componentRef.current)
        .then((dataUrl) => {
          // Handle the generated data URL (image)
          console.log(dataUrl);
          // You can save or display the dataUrl as needed
        })
        .catch((error) => {
          console.error("Error generating image:", error);
        });
    }
  };

  const previewStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    width: "500px", // Adjust the width as needed
    height: "80vh", // Adjust the height as needed
  };

  const qrCodeStyle = {
    position: "absolute",
    top: `${verticalPosition}%`,
    left: `${horizontalPosition}%`,
    transform: "translate(-50%, -50%)",
    width: `${qrCodeSize}rem`, // Adjust the QR code size as needed
    height: `${qrCodeSize}rem`, // Adjust the QR code size as needed
  };

  return (
    <div>
      <button onClick={handleGenerateImage}>Generate Image</button>
      <div ref={componentRef} class="flex flex-col justify-center items-center">
        Haiii
      </div>
    </div>
  );
};

export default YourComponent;
