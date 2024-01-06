import React from "react";
import JobProgress from "../components/JobProgress";

const Updates = () => {
  return (
    <div className="flex flex-col  items-center h-screen ">
      <h1 className="flex flex-col  items-center text-4xl text-gray-800 font-bold mb-4 w-full ">
        <div> Task Progress</div>
      </h1>
      <div className="flex flex-col space-y-4 m-10 p-10 w-[75%]">
        {/* Your JobProgress component */}
        {/* Assuming JobProgress is your component */}
        <JobProgress />
      </div>
    </div>
  );
};

export default Updates;
