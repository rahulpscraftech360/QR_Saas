import React from "react";

const ProgressBar = ({ progressPercentage }) => {
  return (
    <div className="h-2 w-full bg-gray-300 relative mt-5">
      {/* Neutral background */}
      <div className=" w-full absolute rounded-full h-2.5  bg-gray-300"></div>

      {/* Colored progress up to the specified percentage */}
      <div
        style={{
          width: `${progressPercentage}%`,
          transition: "width 0.5s ease-in-out",
        }}
        className={`h-2.5 rounded-full absolute ${
          progressPercentage < 30
            ? "bg-red-600"
            : progressPercentage < 50
            ? "bg-red-400"
            : progressPercentage < 60
            ? "bg-yellow-400"
            : progressPercentage < 70
            ? "bg-green-600"
            : "bg-green-700"
        }`}
      ></div>
    </div>
  );
};

export default ProgressBar;
