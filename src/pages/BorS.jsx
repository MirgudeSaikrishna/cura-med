import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BorS = () => {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate(); // Use React Router's navigate hook instead of window.location
  
  useEffect(() => {
    setMounted(true);
    
    // Add a simple pulse animation to draw attention
    const interval = setInterval(() => {
      const icons = document.querySelectorAll('.pulse-icon');
      icons.forEach(icon => {
        icon.classList.add('scale-125');
        setTimeout(() => {
          icon.classList.remove('scale-125');
        }, 500);
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleNavigation = (path) => {
    document.getElementById('main-container').classList.add('scale-0', 'opacity-0');
    setTimeout(() => {
      navigate(path); // Use navigate function instead of window.location
    }, 600);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 via-blue-300 to-teal-200 p-4 overflow-hidden">
      {/* Floating animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-pink-300 opacity-30 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-blue-300 opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full bg-teal-300 opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 rounded-full bg-purple-300 opacity-30 animate-ping"></div>
      </div>
      
      {/* Main container with 3D effects */}
      <div 
        id="main-container"
        className={`bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md text-center backdrop-blur-lg bg-opacity-80 transform perspective-1000 
        ${mounted ? 'scale-100 rotate-0 opacity-100' : 'scale-90 rotate-3 opacity-0'} 
        transition-all duration-700 ease-out relative z-10`}
      >
        <div className="absolute -top-5 -left-5 w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-lg 
        transform -rotate-12 transition-transform duration-500 hover:rotate-0 pulse-icon">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
        
        <div className="absolute -top-5 -right-5 w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg 
        transform rotate-12 transition-transform duration-500 hover:rotate-0 pulse-icon">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">MediPortal</h1>
        <h2 className="text-xl font-medium text-gray-600 mb-6">Your complete healthcare companion</h2>
        
        <div className="mb-8 bg-blue-50 p-4 rounded-xl">
          <p className="text-gray-600">Access information about medicines, hospitals, and healthcare services tailored to your needs</p>
        </div>
        
        <h3 className="text-2xl font-semibold text-gray-700 mb-6">Choose Your Role</h3>

        <div className="grid gap-6">
          <button
            onClick={() => handleNavigation('/register')}
            className="group relative w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 active:translate-y-0"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute left-0 w-12 h-full bg-white opacity-10 transform -skew-x-20 transition-transform duration-700 group-hover:translate-x-full"></span>
            <span className="relative flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-medium text-lg">I'm a Patient</span>
            </span>
          </button>

          <button
            onClick={() => handleNavigation('/Sregister')}
            className="group relative w-full bg-gradient-to-r from-teal-500 to-green-500 text-white py-4 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 active:translate-y-0"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-teal-400 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute left-0 w-12 h-full bg-white opacity-10 transform -skew-x-20 transition-transform duration-700 group-hover:translate-x-full"></span>
            <span className="relative flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="font-medium text-lg">I'm a Provider</span>
            </span>
          </button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500">Get trusted medical information and services at your fingertips</p>
        </div>
      </div>
    </div>
  );
};

export default BorS;