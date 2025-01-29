import React from "react";

const ResultDetails = ({ outputDetails }) => {
  return (
    <div className="metrics-container mt-4 flex flex-col space-y-4 p-4 bg-gray-50 rounded-lg shadow-lg border-2 border-blue-500 relative">
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium text-gray-700">Status:&nbsp;</p>
        <span className="px-2 py-1 rounded-md bg-indigo-600 text-white text-xs font-semibold">
          {outputDetails?.status?.description}
        </span>
      </div>
      <div className="flex justify-evenly items-center">
        <p className="text-sm font-medium text-gray-700">Memory:</p>
        <span className="px-1 py-1 rounded-md bg-green-600 text-white text-xs font-semibold">
          {outputDetails?.memory}
        </span>
      </div>
      <div className="flex justify-evenly items-center">
        <p className="text-sm font-medium text-gray-700">Time:</p>
        <span className="px-2 py-1 rounded-md bg-purple-600 text-white text-xs font-semibold">
          {outputDetails?.time}
        </span>
      </div>
    </div>
  );
};

export default ResultDetails;