import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  async function registerUser(event) {
    event.preventDefault();
    const formdata = {
      name,
      email,
      password
    };

    try {
      const response = await fetch('http://localhost:1337/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formdata }),
      });
      const data = await response.json();
      
      if (data.status === 'ok') {
        document.getElementById('register-container').classList.add('scale-0', 'opacity-0');
        setTimeout(() => {
          navigate('/login');
        }, 600);
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  }

  const handleBackNavigation = () => {
    document.getElementById('register-container').classList.add('scale-0', 'opacity-0');
    setTimeout(() => {
      navigate('/');
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
        id="register-container"
        className={`bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md text-center backdrop-blur-lg bg-opacity-80 transform perspective-1000 
        ${mounted ? 'scale-100 rotate-0 opacity-100' : 'scale-90 rotate-3 opacity-0'} 
        transition-all duration-700 ease-out relative z-10`}
      >
        <div className="absolute -top-5 -left-5 w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-lg 
        transform -rotate-12 transition-transform duration-500 hover:rotate-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>

        <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">Create Account</h1>
        <h2 className="text-lg font-medium text-gray-600 mb-8">Join MediPortal as a Patient</h2>
        
        <form onSubmit={registerUser} className="space-y-6">
          <div className="group relative">
            <input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Full Name"
              required
              className="w-full px-4 py-3 bg-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 placeholder-gray-400"
            />
            <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 transform origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 w-full"></div>
          </div>
          
          <div className="group relative">
            <input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email Address"
              required
              className="w-full px-4 py-3 bg-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 placeholder-gray-400"
            />
            <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 transform origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 w-full"></div>
          </div>
          
          <div className="group relative">
            <input 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-3 bg-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 placeholder-gray-400"
            />
            <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 transform origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 w-full"></div>
          </div>
          
          <button
            type="submit"
            className="group relative w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 active:translate-y-0"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute left-0 w-12 h-full bg-white opacity-10 transform -skew-x-20 transition-transform duration-700 group-hover:translate-x-full"></span>
            <span className="relative flex items-center justify-center">
              <span className="font-medium text-lg">Register</span>
            </span>
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-4">
          <p className="text-sm text-gray-500">Already have an account?</p>
          
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-blue-100 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-200 transition-all duration-300"
          >
            Log In
          </button>
          
          <button
            onClick={handleBackNavigation}
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-all duration-300 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;