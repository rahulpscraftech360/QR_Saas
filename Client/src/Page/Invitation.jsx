// import React, { useEffect, useState } from "react";
// import defaultBackgroundImage from "../../src/images/MailTemplateBackgroundImage.jpeg";
// import QrCodeImage from "../../src/images/QR1.jpg";
// import { useDropzone } from "react-dropzone";
// import Head from "../components/Head";
// import EventInvitationPreview from "../components/EventInvitationPreview";
// import { useSelector } from "react-redux";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import { storage } from "../utils/firebase";
// import PreviewComponent from "../components/PreviewComponent";
// import axios from "../utils/axiosConfig";
// import HtmlTempate from "../components/HtmlTempate";

// const Invitation = () => {
//   const [uploadImage, setUploadImage] = useState(null);
//   const [backgroundImage, setBackgroundImage] = useState();
//   const [isUploading, setIsUploading] = useState(false);
//   console.log("backgroundImage", backgroundImage);
//   const eventData = useSelector((store) => store.eventData[0]);
//   console.log(eventData, "<<<<<<<<>>>>>>>>>");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [inputSubject, setInputSubject] = useState("");
//   const [horizontalPosition, setHorizontalPosition] = useState(30);
//   const [verticalPosition, setVerticalPosition] = useState(30);
//   const [foregroundStyle, setForegroundStyle] = useState(
//     `bg-red-600 absolute top-[50%] left-[50%]   h-[10rem] w-[10rem] `
//   );
//   const [template, setTemplate] = useState(null);
//   console.log("foregroundStyle", foregroundStyle);
//   console.log("left", horizontalPosition);
//   const onDrop = (acceptedFiles) => {
//     setUploadImage(null);
//     setErrorMessage("");
//     const file = acceptedFiles[0];

//     const allowedImageTypes = ["image/jpeg", "image/png"];
//     console.log("File MIME type:", file.type);

//     if (file && allowedImageTypes.includes(file.type)) {
//       setUploadImage(URL.createObjectURL(file)); // Use URL.createObjectURL to display the image
//       setErrorMessage("");
//     } else {
//       setUploadImage(null);
//       setErrorMessage(
//         "Please select a valid image file (JPEG, PNG, GIF, BMP)."
//       );
//     }
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: "image/jpeg, image/png,", // Specify accepted image formats
//     maxFiles: 1, // Limit to a single file
//   });
//   // useEffect(() => {}, [setuploadImage]);

//   const handleInputChange = (e) => {
//     setUploadImage(null);
//     setInputSubject(e.target.value); // Update input message on change
//   };
//   useEffect(() => {
//     console.log("vertical", verticalPosition);
//     setForegroundStyle(
//       `bg-red-600 absolute translate-x-[${verticalPosition}] translate-y-[${horizontalPosition}]   h-[10rem] w-[10rem] `
//     );
//   }, [verticalPosition, horizontalPosition]);
//   useEffect(() => {}, [backgroundImage]);

//   const handleHorizontalChange = (e) => {
//     console.log("eventttt", e.target.value);
//     const newValue = e.target.value;
//     setHorizontalPosition(newValue);

//     console.log("left>>>>>>>chaged to", horizontalPosition);
//   };

//   const handleVerticalChange = (e) => {
//     setVerticalPosition(e.target.value);
//     console.log(e.target.value, "vertical", verticalPosition);
//   };
//   const gettngTemplate = async () => {
//     const response = await axios.get("template/templates/EmailImageTemplate2");
//     console.log("template", response.data);
//     setTemplate(response.data);
//   };
//   const handleImageUpload = () => {
//     console.log("uploading");
//     console.log(backgroundImage);

//     console.log(defaultBackgroundImage, eventData.title);
//     setIsUploading(true);
// if (uploadImage) {
//   console.log("imageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", uploadImage);
//   const fileRef = ref(storage, `images/${Date.now()}`);
//   console.log("fileref>>>>>>>>>>>>>>>????", fileRef);

//   fetch(uploadImage)
//     .then((res) => res.blob())
//     .then((blob) => {
//       const uploadTask = uploadBytesResumable(fileRef, blob);
//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log(`Upload is ${progress}% done`);
//           switch (snapshot.state) {
//             case "paused":
//               console.log("Upload is paused");
//               break;
//             case "running":
//               console.log("Upload is running");
//               break;
//           }
//         },
//         (error) => {
//           console.error("Error uploading image:", error);
//         },
//         () => {
//           getDownloadURL(fileRef).then((downloadURL) => {
//             console.log("File available at", downloadURL);
//             // Do something with the downloadURL, like setting it to state
//             setBackgroundImage(downloadURL);
//             setIsUploading(false);
//             console.log("backgroundImage", downloadURL);
//             // gettngTemplate(downloadURL);
//           });
//         }
//       );
//     })
//     .catch((error) => {
//       setIsUploading(false);
//       console.error("Error fetching image:", error);
//     })
//     .finally(() => {
//       setTimeout(() => setIsUploading(false), 30000);
//     });
// } else {
//   console.error("No image selected to upload");
// }
//   };

//   return (
//     <>
//       <Head />
//       <div className="grid grid-cols-2 grid-rows-2 gap-3 m-6">
//         {/* ... rest of your layout */}
//         <div className=" gap-3 justify-center items-center">
//           <label
//             htmlFor="fileInput"
//             className="mb-2 text-lg flex  items-center justify-center "
//           >
//             <h2 className=" text-xl font-semibold mb-4 pl-2 items-center justify-center">
//               Upload Image
//             </h2>
//           </label>

//           <div
//             {...getRootProps()}
//             className=" flex border border-dashed rounded-md p-4  items-center justify-center  cursor-pointer"
//           >
//             <input {...getInputProps()} />
//             <div className="flex flex-col  md:w-1/3 items-center  justify-center pt-5 pb-6">
//               {isDragActive ? (
//                 <div className="flex flex-col w-full md:w-1/3 items-center justify-center pt-5 pb-6">
//                   <svg
//                     className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 20 16"
//                   >
//                     <path
//                       stroke="currentColor"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                       stroke-width="2"
//                       d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//                     />
//                   </svg>
//                   <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                     <span className="font-semibold">Drop the files Here</span>{" "}
//                   </p>
//                   <p className="text-xs text-gray-500 dark:text-gray-400">
//                     jpeg, png, gif
//                   </p>
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center text-center justify-center pt-5 pb-6 ">
//                   <svg
//                     class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 20 16"
//                   >
//                     <path
//                       stroke="currentColor"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                       stroke-width="2"
//                       d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//                     />
//                   </svg>
//                   <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                     <span className="font-semibold">Click to upload</span> or
//                     drag and drop
//                   </p>
//                   <p className="text-xs text-gray-500 dark:text-gray-400">
//                     jpeg, png, gif
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//           <textarea
//             placeholder="Write Subject"
//             value={inputSubject}
//             onChange={handleInputChange}
//             className="border border-gray-300 rounded-md3 p-2 w-full focus:outline-none focus:border-gray-500 justify-center items-center"
//             rows={4} // Adjust the number of rows as needed
//           />

//           <div className="flex flex-row justify-center item-center mt-5">
//             {isUploading ? (
//               <button
//                 // onClick={handleImageUpload}
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
//               >
//                 Uploading...
//               </button>
//             ) : (
//               <button
//                 onClick={handleImageUpload}
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//               >
//                 Upload Image
//               </button>
//             )}
//           </div>
//         </div>
//         <div className="   ">
//           <div className="flex flex-col justify-center items-center  ">
//             <h2 className="text-xl font-medium text-center  ">Preview</h2>

//             <div className=" w-full md:w-1/2  flex flex-col ">
//               {backgroundImage && (
//                 <HtmlTempate
//                   subject={inputSubject}
//                   backgroundImage={backgroundImage}
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Invitation;

// import React, { useEffect, useState } from "react";
// import defaultBackgroundImage from "../../src/images/MailTemplateBackgroundImage.jpeg";
// import QrCodeImage from "../../src/images/QR1.jpg";
// import { useDropzone } from "react-dropzone";
// import Head from "../components/Head";
// import EventInvitationPreview from "../components/EventInvitationPreview";
// import { useSelector } from "react-redux";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import { storage } from "../utils/firebase";
// import PreviewComponent from "../components/PreviewComponent";
// import axios from "../utils/axiosConfig";
// import HtmlTempate from "../components/HtmlTempate";

//??
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import { storage } from "../utils/firebase";
// import axios from "../utils/axiosConfig";
// import HtmlTempate from "../components/HtmlTempate";
// import { Upload, Input, Button, Modal, message } from "antd";
// import { InboxOutlined } from "@ant-design/icons";
// import "antd/dist/antd.css"; // Import Ant Design styles
// import Head from "../components/Head";
// import { Header } from "antd/es/layout/layout";

// const { Dragger } = Upload;
// const { TextArea } = Input;

// const Invitation = () => {
//   const [uploadImage, setUploadImage] = useState(null);
//   const [backgroundImage, setBackgroundImage] = useState();
//   const [isUploading, setIsUploading] = useState(false);
//   console.log("backgroundImage", backgroundImage);
//   const eventData = useSelector((store) => store.eventData[0]);
//   console.log(eventData, "<<<<<<<<>>>>>>>>>");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [inputSubject, setInputSubject] = useState("");
//   const [horizontalPosition, setHorizontalPosition] = useState(30);
//   const [verticalPosition, setVerticalPosition] = useState(30);
//   const [foregroundStyle, setForegroundStyle] = useState(
//     `bg-red-600 absolute top-[50%] left-[50%]   h-[10rem] w-[10rem] `
//   );
//   const [template, setTemplate] = useState(null);
//   console.log("foregroundStyle", foregroundStyle);
//   console.log("left", horizontalPosition);

//   const uploadProps = {
//     name: "file",
//     multiple: false,
//     action: "",
//     onChange(info) {
//       const { file, fileList } = info;

//       if (file.status === "done") {
//         console.log(`${file.name} file uploaded successfully`);
//         setUploadImage(URL.createObjectURL(file.originFileObj)); // Use originFileObj for local preview
//       } else if (file.status === "error") {
//         console.error(`${file.name} file upload failed`);
//       }
//     },
//   };

//   const handleInputChange = (e) => {
//     setUploadImage(null);
//     setInputSubject(e.target.value); // Update input message on change
//   };
//   useEffect(() => {
//     console.log("vertical", verticalPosition);
//     setForegroundStyle(
//       `bg-red-600 absolute translate-x-[${verticalPosition}] translate-y-[${horizontalPosition}]   h-[10rem] w-[10rem] `
//     );
//   }, [verticalPosition, horizontalPosition]);
//   useEffect(() => {}, [backgroundImage]);

//   const handleHorizontalChange = (e) => {
//     console.log("eventttt", e.target.value);
//     const newValue = e.target.value;
//     setHorizontalPosition(newValue);

//     console.log("left>>>>>>>chaged to", horizontalPosition);
//   };

//   const handleVerticalChange = (e) => {
//     setVerticalPosition(e.target.value);
//     console.log(e.target.value, "vertical", verticalPosition);
//   };
//   const gettngTemplate = async () => {
//     const response = await axios.get("template/templates/EmailImageTemplate2");
//     console.log("template", response.data);
//     setTemplate(response.data);
//   };
//   const handleImageUpload = () => {
//     console.log("uploading");
//     console.log(backgroundImage);

//     console.log(eventData.title);
//     setIsUploading(true);
//     if (uploadImage) {
//       console.log("imageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", uploadImage);
//       const fileRef = ref(storage, `images/${Date.now()}`);
//       console.log("fileref>>>>>>>>>>>>>>>????", fileRef);

//       fetch(uploadImage)
//         .then((res) => res.blob())
//         .then((blob) => {
//           const uploadTask = uploadBytesResumable(fileRef, blob);
//           uploadTask.on(
//             "state_changed",
//             (snapshot) => {
//               const progress =
//                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//               console.log(`Upload is ${progress}% done`);
//               switch (snapshot.state) {
//                 case "paused":
//                   console.log("Upload is paused");
//                   break;
//                 case "running":
//                   console.log("Upload is running");
//                   break;
//               }
//             },
//             (error) => {
//               console.error("Error uploading image:", error);
//             },
//             () => {
//               getDownloadURL(fileRef).then((downloadURL) => {
//                 console.log("File available at", downloadURL);
//                 // Do something with the downloadURL, like setting it to state
//                 setBackgroundImage(downloadURL);
//                 setIsUploading(false);
//                 console.log("backgroundImage", downloadURL);
//                 // gettngTemplate(downloadURL);
//               });
//             }
//           );
//         })
//         .catch((error) => {
//           setIsUploading(false);
//           console.error("Error fetching image:", error);
//         })
//         .finally(() => {
//           setTimeout(() => setIsUploading(false), 30000);
//         });
//     } else {
//       console.error("No image selected to upload");
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-3 m-6">
//         {/* ... rest of your layout */}
//         <div className=" gap-3 justify-center items-center">
//           <label
//             htmlFor="fileInput"
//             className="mb-2 text-lg flex  items-center justify-center "
//           >
//             <h2 className=" text-xl font-semibold mb-4 pl-2 items-center justify-center">
//               Upload Image
//             </h2>
//           </label>

//           <Dragger {...uploadProps}>
//             <p className="ant-upload-drag-icon">
//               <InboxOutlined />
//             </p>
//             <p className="ant-upload-text">
//               Click or drag file to this area to upload
//             </p>
//             <p className="ant-upload-hint">
//               Support for a single upload. Strictly prohibit from uploading
//               company data or other band files
//             </p>
//           </Dragger>
//           <TextArea
//             placeholder="Write Subject"
//             value={inputSubject}
//             onChange={handleInputChange}
//             className="mt-4"
//             rows={4}
//           />
//           <Button
//             type="primary"
//             onClick={handleUpload}
//             disabled={isUploading}
//             loading={isUploading}
//             style={{ marginTop: 16 }}
//           >
//             {isUploading ? "Uploading" : "Start Upload"}
//           </Button>
//         </div>
//         <div>
//           <h2 className="text-xl font-medium text-center">Preview</h2>

//           <div className=" w-full md:w-1/2  flex flex-col ">
//             {backgroundImage && (
//               <HtmlTempate
//                 subject={inputSubject}
//                 backgroundImage={backgroundImage}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Invitation;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../utils/firebase";
import HtmlTempate from "../components/HtmlTempate";
import { Upload, Input, Button, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import "antd/dist/antd.css"; // Import Ant Design styles
import Head from "../components/Head";

const { Dragger } = Upload;
const { TextArea } = Input;

const Invitation = () => {
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

  return (
    <>
      <Head />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 m-6">
        <div className="gap-3 justify-center items-center">
          <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
          <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Dragger>
          <TextArea
            placeholder="Write Subject"
            value={inputSubject}
            onChange={(e) => setInputSubject(e.target.value)}
            className="my-4 mt-6  "
            rows={4}
          />

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
        </div>
        <div>
          <h2 className="text-xl font-medium text-center">Preview</h2>
          <div className="h-[50vh]  flex flex-col mt-4 mb-5">
            {backgroundImage && (
              <HtmlTempate
                subject={inputSubject}
                backgroundImage={backgroundImage}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Invitation;
