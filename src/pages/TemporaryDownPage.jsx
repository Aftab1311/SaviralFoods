import React from "react";

const TemporaryDownPage = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-red-600 via-red-500 to-red-600 text-white">
      {/* Warning Sign in Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-[900px] w-[700px] text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.666 1.732-3L13.732 4c-.77-1.334-2.694-1.334-3.464 0L4.34 16c-.77 1.334.192 3 1.732 3z"
          />
        </svg>
      </div>

      {/* Foreground Content */}
      <div className="relative text-center px-6 py-10 bg-black bg-opacity-20 rounded-lg shadow-lg">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Website Unavailable
        </h1>
        <p className="text-lg md:text-xl font-semibold">
          This website has been taken down temporarily. Please check back later.
        </p>
      </div>
    </div>
  );
};

export default TemporaryDownPage;
