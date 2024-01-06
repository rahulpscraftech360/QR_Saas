// import React, { useEffect, useState } from "react";
// import ProgressBar from "./ProgressBar";

// const JobProgress = () => {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const eventSource = new EventSource("http://localhost:5000/events");
//     if (typeof EventSource !== "undefined") {
//       console.log("yyy");
//     } else {
//       console.log("Yess");
//     }
//     eventSource.onmessage = (event) => {
//       const data = JSON.parse(event.data);

//       // Replace 'yourJobId' with the relevant job ID
//       setMessage(data);
//       console.log(data);
//     };
//     return () => eventSource.close();
//   }, []);

//   return (
//     <div className="">
//       {message ? (
//         <>
//           <div className="flex justify-between w-full ">
//             {" "}
//             <div className="text-4xl font-medium mx-3">
//               JobId:{message?.jobId}
//             </div>
//             <div className="text-4xl font-medium mx-3">
//               Job Progress:{message?.progress}%
//             </div>
//           </div>
//           <ProgressBar className="" progressPercentage={message?.progress} />
//         </>
//       ) : (
//         <div className="text-4xl text-gray-500 font-bold ">No Pending Task</div>
//       )}
//     </div>
//   );
// };

// export default JobProgress;

import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

const JobProgress = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:5000/events");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setTasks((currentTasks) => {
        const taskIndex = currentTasks.findIndex(
          (task) => task.jobId === data.jobId
        );

        if (taskIndex !== -1) {
          // Update existing task
          const updatedTasks = [...currentTasks];
          updatedTasks[taskIndex] = {
            ...updatedTasks[taskIndex],
            progress: data.progress,
          };
          return updatedTasks;
        } else {
          // Add new task
          return [...currentTasks, data];
        }
      });

      console.log(data);
    };

    return () => eventSource.close();
  }, []);

  return (
    <div>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.jobId} className="mb-4">
            <div className="flex justify-between w-full">
              <div className="text-4xl font-medium mx-3">
                JobId: {task.jobId}
              </div>
              <div className="text-4xl font-medium mx-3">
                Job Progress: {task.progress}%
              </div>
            </div>
            <ProgressBar progressPercentage={task.progress} />
          </div>
        ))
      ) : (
        <div className="text-4xl text-gray-500 font-bold">No Pending Tasks</div>
      )}
    </div>
  );
};

export default JobProgress;
