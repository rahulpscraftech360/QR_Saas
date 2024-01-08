import React, { useEffect, useState } from "react";

import { QrScanner } from "react-qrcode-scanner";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "../utils/axiosConfig";
import { addEventData } from "../utils/eventDataSlice";
function QRCodeScanner() {
  const [result, setResult] = useState();
  const [message, setMessage] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [cssSettings, setCssSettings] = useState(null);
  // console.log("css", cssSettings.tabletBackground.backgroundImage.url);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [scannerState, setScannerState] = useState();
  console.log("scannerState", scannerState);
  console.log("bg", cssSettings);

  const params = useParams();
  const dispatch = useDispatch();
  const eventId = params.id;
  const [errorMessage, setErrorMessage] = useState("");
  const previewStyle = {
    height: 240,
    width: 320,
  };
  const organizationId = useSelector(
    (state) => state.organization.organizationData._id
  );

  // console.log("evemtId", params.id);
  const handleScan = (value) => {
    // console.log("hereeee");
    // console.log("value", value);
    const stringWithoutQuotes = value.replace(/^"(.*)"$/, "$1");
    setResult(stringWithoutQuotes);
  };
  console.log("result,", result);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`/events/${eventId}`);
        setEventData(response.data);
        dispatch(addEventData(response.data));
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventData();
  }, [eventId]);

  useEffect(() => {
    if (eventData && eventData.cssSettings) {
      setCssSettings(eventData.cssSettings);
      const backgroundImageURL = eventData.cssSettings.tabletBackground.backgroundImage
        .slice(4, -1)
        .replace(/"/g, "");
      setBackgroundImage(backgroundImageURL);
      setScannerState(eventData.cssSettings.scanner);
    }
  }, [eventData]);

  useEffect(() => {
    const performAsyncOperations = async () => {
      console.log("Result Type:", typeof result, result);
      console.log(
        "Participants Type:",
        typeof eventData?.participants,
        eventData?.participants
      );
      console.log("Present Type:", typeof eventData?.present);

      console.log("Result Type>>>:", typeof result, result);
      if (result && eventData && eventData?.participants) {
        setMessage("Validating....");
        console.log("eventData0", eventData);
        const isParticipant = eventData.participants.includes(result);
        console.log("isParticipant", isParticipant);

        const participantIndex = eventData.participants.indexOf(result);

        if (participantIndex !== -1) {
          console.log(`Participant found at index ${participantIndex}`);
          if (isParticipant !== undefined) {
            setMessage("User Found");

            const isAttended = eventData.present.includes(result);

            if (!isAttended) {
              // alert("You have been added as a present attendee!");
              setMessage("User Added");

              // Perform actions to update the database - add user ID as presented
              const newPresentList = [...eventData.present, result];
              console.log("Updated present list", newPresentList);
              // Update the state or database with newPresentList
              console.log("<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>");
              const userId = result;
              const response = await axios.patch(
                `/events/${eventId}/${organizationId}/attendEvent`,
                {
                  userId,
                }
              );
              let newEventData = null;
              console.log("response", response.data);
              newEventData = await response.data;
              console.log(">>>>>", response.data);
              dispatch(addEventData(newEventData));
              setEventData(newEventData);
              alert("Welcome To the Event ");
            } else {
              alert("Sorry You Have Already Attended This Event");
              setMessage("Already Present");
            }
            setShowScanner(false);
          } else {
            setMessage("Not Found!");
            setShowScanner(false);
            // Perform actions when the participant is not found
          }
        } else {
          console.log("Participant not found.");
          alert("Participant not found.");
        }
      }
    };
    performAsyncOperations();
  }, [result]);

  const handleError = (error) => {
    setErrorMessage(error);
    message.error(`Error: ${error}`);
  };
  const [showScanner, setShowScanner] = useState(false);
  const handleScanButtonClick = () => {
    setResult(null);
    setMessage("Scanning......");
    setShowScanner(true); // Show the scanner when the button is clicked
  };
  const handleCloseButtonClick = () => {
    setShowScanner(false);
  };

  return (
    <>
      {backgroundImage ? (
        <div
          className="flex justify-center items-center w-full"
          style={{ height: "100vh", width: "100vw" }}
        >
          <div
            className="tablet-container"
            style={{
              width: "768px", // Increase the width for a larger preview
              // paddingTop: "0%", // Adjust padding-top to maintain the 4:3 aspect ratio (37.5% of 50%)
              height: "100%",
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
            >
              {" "}
            </div>

            {
              <div
                className="scanner bg-white items-center  justify-center"
                style={
                  scannerState

                  // {
                  //   // width: `${scannerSize}rem`, // Adjust if necessary
                  //   // height: `${1.5 * scannerSize}rem`, // Adjust if necessary

                  //   width: "200px", // Adjust if necessary
                  //   height: "300px",
                  //   position: "absolute",
                  //   top: `10em`,
                  //   left: `18em`,
                  //   border: "4px solid #ccc",
                  //   borderRadius: "8px",
                  //   overflow: "hidden",
                  // }
                }
              >
                <>
                  <div className="flex flex-col items-center justify-center h-full  ">
                    {/* <div className="rounded-lg shadow-lg overflow-hidden w-11/12 items-center justify-center   "></div>{" "} */}
                    {!showScanner && (
                      <div className="flex flex-grow items-center justify-center">
                        <button
                          className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-8 rounded"
                          onClick={handleScanButtonClick}
                        >
                          Scan
                        </button>
                      </div>
                    )}
                    {showScanner && ( // Show the scanner when 'showScanner' state is true
                      <div className="w-full  p-4">
                        <div className="bg-white rounded-lg shadow-lg p-1">
                          <QrScanner
                            onScan={handleScan}
                            onError={handleError}
                          />
                        </div>
                      </div>
                    )}
                    {/* <p className="mt-4 text-center">{message}</p> */}
                    {showScanner ? (
                      <span className="animate-pulse  px-2 rounded-lg text-emerald-500">
                        Scanning....
                      </span>
                    ) : (
                      <></>
                    )}
                    {result && (
                      <p className="mt-4 text-center">
                        {/* Scanned Data:{" "}
                        {
                          result // Show the result after a successful scan
                        } */}
                      </p>
                    )}
                    {/* {message ? <></> : <span className="animate-pulse">Scanning....</span>} */}
                    <p className="mt-4 text-center">{}</p>
                    {showScanner && (
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-8 rounded"
                        onClick={handleCloseButtonClick}
                      >
                        Close
                      </button>
                    )}
                  </div>
                </>
              </div>
            }
          </div>
        </div>
      ) : (
        <div className="flex h-screen justify-center items-center w-full">
          <div>Add template for Qr code scanner</div>
        </div>
      )}
    </>

    // <>
    //   <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    //     <div className="rounded-lg shadow-lg overflow-hidden w-11/12 md:w-1/2 lg:w-1/3"></div>{" "}
    //     {!showScanner && ( // Show the scan button when the scanner is not visible
    //       <>
    //         {" "}
    //         <h1 className="text-2xl"> Open Scanner</h1>
    //         <button
    //           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    //           onClick={handleScanButtonClick}
    //         >
    //           Scan
    //         </button>
    //       </>
    //     )}
    //     {showScanner && ( // Show the scanner when 'showScanner' state is true
    //       <div className="w-full md:w-1/2 p-4">
    //         <div className="bg-white rounded-lg shadow-lg p-4">
    //           <QrScanner onScan={handleScan} onError={handleError} />
    //         </div>
    //       </div>
    //     )}
    //     {/* <p className="mt-4 text-center">{message}</p> */}
    //     {showScanner ? (
    //       <span className="animate-pulse">Scanning....</span>
    //     ) : (
    //       <></>
    //     )}
    //     {result && (
    //       <p className="mt-4 text-center">
    //         Scanned Data:{" "}
    //         {
    //           result // Show the result after a successful scan
    //         }
    //       </p>
    //     )}
    //     {/* {message ? <></> : <span className="animate-pulse">Scanning....</span>} */}
    //     <p className="mt-4 text-center">{}</p>
    //     {showScanner && (
    //       <button
    //         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    //         onClick={handleCloseButtonClick}
    //       >
    //         Close
    //       </button>
    //     )}
    //   </div>
    // </>
  );
}

export default QRCodeScanner;
//   return (
//     <div>
//       <div className="w-full md:w-1/2">
//         <QrScanner onScan={handleScan} onError={handleError} />
//       </div>

//       <p>{message}</p>
//     </div>
//   );
// }

// export default QRCodeScanner;

// {showScanner && ( // Show the scanner when 'showScanner' state is true
// <div className="w-full md:w-1/2 p-4">
//   <div className="bg-white rounded-lg shadow-lg p-4">
//     <QrScanner onScan={handleScan} onError={handleError} />
//   </div>
// </div>
// )}
// {/* <p className="mt-4 text-center">{message}</p> */}
// {showScanner ? (
// <span className="animate-pulse">Scanning....</span>
// ) : (
// <></>
// )}
// {result && (
// <p className="mt-4 text-center">
//   Scanned Data:{" "}
//   {
//     result // Show the result after a successful scan
//   }
// </p>
// )}
// {/* {message ? <></> : <span className="animate-pulse">Scanning....</span>} */}
// <p className="mt-4 text-center">{}</p>
// {showScanner && (
// <button
//   className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//   onClick={handleCloseButtonClick}
// >
//   Close
// </button>
// )}

// {result && (
//   <p className="mt-4 text-center">
//     Scanned Data:{" "}
//     {
//       result // Show the result after a successful scan
//     }
//   </p>
// )}
// {/* {message ? <></> : <span className="animate-pulse">Scanning....</span>} */}
// <p className="mt-4 text-center">{}</p>
// {showScanner && (
//   <button
//     className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//     onClick={handleCloseButtonClick}
//   >
//     Close
//   </button>
// )}

//First Code

// <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//   <div className="rounded-lg shadow-lg overflow-hidden w-11/12 md:w-1/2 lg:w-1/3"></div>{" "}
//   {!showScanner && ( // Show the scan button when the scanner is not visible
//     <>
//       {" "}
//       <h1 className="text-2xl"> Open Scanner</h1>
//       <button
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         onClick={handleScanButtonClick}
//       >
//         Scan
//       </button>
//     </>
//   )}
//   {showScanner && ( // Show the scanner when 'showScanner' state is true
//     <div className="w-full md:w-1/2 p-4">
//       <div className="bg-white rounded-lg shadow-lg p-4">
//         <QrScanner onScan={handleScan} onError={handleError} />
//       </div>
//     </div>
//   )}
//   {/* <p className="mt-4 text-center">{message}</p> */}
//   {showScanner ? (
//     <span className="animate-pulse">Scanning....</span>
//   ) : (
//     <></>
//   )}
//   {result && (
//     <p className="mt-4 text-center">
//       Scanned Data:{" "}
//       {
//         result // Show the result after a successful scan
//       }
//     </p>
//   )}
//   {/* {message ? <></> : <span className="animate-pulse">Scanning....</span>} */}
//   <p className="mt-4 text-center">{}</p>
//   {showScanner && (
//     <button
//       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//       onClick={handleCloseButtonClick}
//     >
//       Close
//     </button>
//   )}
// </div>

// <>
// <div className="flex flex-col">
//   <div
//     className="flex justify-center items-center w-full"
//     // style={{ height: "80vh" }}
//   >
//     <div
//       className="tablet-container"
//       style={{
//         width: "80%", // Increase the width for a larger preview
//         paddingTop: "60%", // Adjust padding-top to maintain the 4:3 aspect ratio (37.5% of 50%)
//         position: "relative", // for absolute positioning inside
//         background: "white",
//         borderRadius: "20px",
//         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//         overflow: "hidden",
//         borderWidth: ".9rem",
//       }}
//     >
//       <div
//         className="tablet-background"
//         style={{
//           position: "absolute",

//           backgroundImage: `url(${backgroundImage})`,

//           top: "0",
//           left: "0",
//           height: "100%",
//           width: "100%",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       ></div>
//       {!showScanner && (
//         <div style={scannerState}>
//           {/* <div className="flex w-full h-full  justify-center items-center m-1/2 ">
//             <button
//               className="bg-emerald-500 w-2/3  hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
//               onClick={handleScanButtonClick}
//             >
//               Scan
//             </button>
//           </div> */}
//         </div>
//       )}
//       {showScanner && (
//         <div style={scannerState}>
//           {showScanner && (
//             <div className="w-full  p-4">
//               <div className=" bg-white rounded-lg shadow-lg p-1 justify-center item-center">
//                 <QrScanner
//                   className="pr-1"
//                   onScan={handleScan}
//                   onError={handleError}
//                 />
//               </div>
//             </div>
//           )}
//           <div className="flex flex-col w-full h-full   p-4">
//             {showScanner ? (
//               <>
//                 <span className="animate-pulse text-white text-center text-xl p-3">
//                   Scanning....
//                 </span>
//                 <div className="flex w-full  justify-center item-center">
//                   <button
//                     className="bg-red-500 hover:bg-red-700 w-full mx-4 text-white font-bold py-2 px-4 rounded"
//                     onClick={handleCloseButtonClick}
//                   >
//                     Close
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <></>
//             )}
//           </div>
//         </div>
//       )}{" "}
//     </div>
//   </div>
// </div>
// <div className=" flex item-center justify-center"></div>
// {/* </div> */}
// </>
