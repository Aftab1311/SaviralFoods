import React from 'react';

const TemporaryDownPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-red-600 via-red-500 to-red-600 text-white">
      <div className="text-center px-6 py-10 bg-black bg-opacity-50 rounded-lg shadow-lg">
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
