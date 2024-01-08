import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../utils/firebase";
import HtmlTempate from "../components/HtmlTempate";
import { Upload, Input, Button, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import "antd/dist/antd.css"; // Import Ant Design styles
import Head from "../components/Head";
import TabletQRCodeScanner from "../components/TabletQRCodeScanner";

const { Dragger } = Upload;
const { TextArea } = Input;

const TabPreview = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const eventData = useSelector((store) => store.eventData[0]);
  const [inputSubject, setInputSubject] = useState("");
  const [uploadProgress, setUploadProgress] = useState(null);
  const uploadProps = {
    name: "file",
    multiple: false,
    beforeUpload: (file) => {
      setSelectedFile(file);
      return false; // Prevent automatic upload
    },
    onRemove: () => {
      setSelectedFile(null);
    },
  };

  const handleImageUpload = () => {
    if (!selectedFile) {
      message.error("Please select an image file to upload");
      return;
    }

    setIsUploading(true);
    const fileRef = ref(storage, `images/${Date.now()}`);

    const uploadTask = uploadBytesResumable(fileRef, selectedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading image:", error);
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setBackgroundImage(downloadURL);
          setIsUploading(false);
        });
      }
    );
  };
  const [verticalPosition, setVerticalPosition] = useState(25); // Initial vertical position
  const [horizontalPosition, setHorizontalPosition] = useState(25); // Initial horizontal position
  const [scannerSize, setScannerSize] = useState(50);
  const handleVerticalChange = (e) => {
    setVerticalPosition(e.target.value);
  };

  const handleHorizontalChange = (e) => {
    setHorizontalPosition(e.target.value);
  };
  const handleScannerSizeChange = (e) => {
    setScannerSize(e.target.value);
  };
  return (
    <>
      <Head />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-2">
        <div className="gap-3 justify-center items-center">
          <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
          <div>
            <Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag image to this area to upload
              </p>
            </Dragger>
          </div>

          <Button
            type="primary"
            onClick={handleImageUpload}
            disabled={isUploading}
            loading={isUploading}
            style={{ marginTop: 16 }}
          >
            {isUploading
              ? `Uploading...${uploadProgress}% done`
              : "Start Upload"}
          </Button>

          <div>
            <div className="slider-container ">
              <label htmlFor="vertical">Vertical Position:</label>
              <input
                className="ml-2"
                type="range"
                id="vertical"
                min="0"
                max="100"
                value={verticalPosition}
                onChange={handleVerticalChange}
              />

              <label htmlFor="horizontal">Horizontal Position:</label>
              <input
                className="ml-2"
                type="range"
                id="horizontal"
                min="0"
                max="100"
                value={horizontalPosition}
                onChange={handleHorizontalChange}
              />
              {/* <label htmlFor="size">Scanner Size:{scannerSize}</label>
              <input
                className="ml-2"
                type="range"
                id="size"
                min="1"
                max="100"
                value={scannerSize}
                onChange={handleScannerSizeChange}
              /> */}
            </div>
          </div>
        </div>
        <div>
          <h2>Tab Preview</h2>

          {backgroundImage && (
            <TabletQRCodeScanner
              backgroundImage={backgroundImage}
              scannerSize={scannerSize}
              scannerPosition={{
                top: verticalPosition,
                left: horizontalPosition,
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TabPreview;
