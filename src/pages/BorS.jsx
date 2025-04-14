import React from "react";

const BorS = () => {
  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 to-blue-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Choose Your Role</h2>

        <button
          onClick={() => handleNavigation('/register')}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition-all duration-300 mb-4"
        >
          Buyer
        </button>

        <button
          onClick={() => handleNavigation('/Sregister')}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg shadow hover:bg-green-600 transition-all duration-300"
        >
          Seller
        </button>
      </div>
    </div>
  );
};

export default BorS;
