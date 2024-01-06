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

  console.log("evemtId", params.id);
  const handleScan = (value) => {
    console.log("hereeee");
    console.log("value", value);
    const stringWithoutQuotes = value.replace(/^"(.*)"$/, "$1");
    setResult(stringWithoutQuotes);
  };
  console.log("result,", result);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/events/${eventId}`);
        setEventData(response.data);
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
  useEffect(() => {
    const performAsyncOperations = async () => {
      console.log("Result Type:", typeof result, result);
      console.log(
        "Participants Type:",
        typeof eventData?.participants,
        eventData?.participants
      );
      console.log("Present Type:", typeof eventData?.present);
      // setResult("658edae898640163f05ef4e5");
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
  // useEffect(() => {
  //   console.log("Result Type:", typeof result, result);
  //   console.log(
  //     "Participants Type:",
  //     typeof eventData?.participants,
  //     eventData?.participants
  //   );
  //   console.log("Present Type:", typeof eventData?.present);
  //   console.log("Result Type>>>:", typeof result, result);

  //   const performAsyncOperations = async () => {
  //     if (result && eventData && eventData?.participants) {
  //       setMessage("Validating....");
  //       console.log("eventData0", eventData);

  //       const isParticipant = await eventData.participants.includes(result);
  //       console.log("isParticipant", isParticipant);

  //       const participantIndex = eventData.participants.indexOf(result);

  //       if (participantIndex !== -1) {
  //         console.log(`Participant found at index ${participantIndex}`);
  //       } else {
  //         console.log("Participant not found.");
  //       }

  //       // You can place asynchronous operations here if needed
  //       // For example:
  //       // const data = await fetchData(); // Some asynchronous operation
  //       // console.log(data);
  //     }
  //   };

  //   performAsyncOperations(); // Invoke the async function
  // }, [result, eventData]);

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="rounded-lg shadow-lg overflow-hidden w-11/12 md:w-1/2 lg:w-1/3"></div>{" "}
      {!showScanner && ( // Show the scan button when the scanner is not visible
        <>
          {" "}
          <h1 className="text-2xl"> Open Scanner</h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleScanButtonClick}
          >
            Scan
          </button>
        </>
      )}
      {showScanner && ( // Show the scanner when 'showScanner' state is true
        <div className="w-full md:w-1/2 p-4">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <QrScanner onScan={handleScan} onError={handleError} />
          </div>
        </div>
      )}
      {/* <p className="mt-4 text-center">{message}</p> */}
      {showScanner ? (
        <span className="animate-pulse">Scanning....</span>
      ) : (
        <></>
      )}
      {result && (
        <p className="mt-4 text-center">
          Scanned Data:{" "}
          {
            result // Show the result after a successful scan
          }
        </p>
      )}
      {/* {message ? <></> : <span className="animate-pulse">Scanning....</span>} */}
      <p className="mt-4 text-center">{}</p>
      {showScanner && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCloseButtonClick}
        >
          Close
        </button>
      )}
    </div>
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
