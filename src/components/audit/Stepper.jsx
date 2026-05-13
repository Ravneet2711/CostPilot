import React from "react";

const Stepper = ({ step }) => {
  return (
    <div className="flex items-center justify-between mb-12">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
            step >= 1
              ? "bg-black text-white shadow-lg ring-4 ring-purple-100"
              : "bg-white border border-gray-200 text-gray-500"
          }`}
        >
          1
        </div>
        <p
          className={`font-medium hidden sm:block ${
            step >= 1 ? "text-black" : "text-gray-500"
          }`}
        >
          Your Stack
        </p>
      </div>

      <div className="flex-1 h-[2px] bg-gradient-to-r from-purple-200 to-transparent mx-4"></div>

      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
            step >= 2
              ? "bg-black text-white"
              : "bg-white border border-gray-200 text-gray-500"
          }`}
        >
          2
        </div>
        <p
          className={`font-medium hidden sm:block ${
            step >= 2 ? "text-black" : "text-gray-500"
          }`}
        >
          Usage & Team
        </p>
      </div>

      <div className="flex-1 h-[2px] bg-gradient-to-r from-purple-200 to-transparent mx-4"></div>

      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
            step >= 3
              ? "bg-black text-white shadow-lg ring-4 ring-purple-100"
              : "bg-white border border-gray-200 text-gray-500"
          }`}
        >
          3
        </div>
        <p
          className={`font-medium hidden sm:block ${
            step >= 3 ? "text-black" : "text-gray-500"
          }`}
        >
          Review
        </p>
      </div>
    </div>
  );
};

export default Stepper;
