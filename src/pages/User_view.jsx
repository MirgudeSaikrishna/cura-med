import React, { useState, useEffect } from 'react';

const User_view = () => {
  const [sellers, setSellers] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    async function getdata() {
      try {
        const response = await fetch('http://localhost:1337/api/U_view', {
          method: 'GET',
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
        });
        const data = await response.json();
        if (data.status === 'ok') {
          setSellers(data.sellers);
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getdata();
  }, []);

  const handleViewProducts = (shopName) => {
    localStorage.setItem('shopName', shopName);
    window.location.href = '/Uproduct';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-300 to-teal-200 p-6 overflow-hidden">
      {/* Floating animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-green-300 opacity-30 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-teal-300 opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full bg-blue-300 opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 rounded-full bg-emerald-300 opacity-30 animate-ping"></div>
      </div>
      
      <div 
        className={`max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-lg bg-opacity-80 
        ${mounted ? 'scale-100 opacity-100' : 'scale-90 opacity-0'} 
        transition-all duration-700 ease-out relative z-10`}
      >
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-green-500">
              Healthcare Providers
            </h1>
            <p className="text-lg text-gray-600">Find the right provider for your needs</p>
          </div>
          
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-6 rounded-xl shadow-lg hover:shadow-xl 
            transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>

        {sellers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Loading providers...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sellers.map((seller, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl overflow-hidden shadow-lg 
                hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="h-40 bg-gradient-to-r from-teal-400 to-green-400 overflow-hidden relative">
                  <img 
                    src={`/api/placeholder/800/600?text=${seller.shopName}`}
                    alt={seller.shopName} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 
                    group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-white text-xl font-bold">{seller.shopName}</h3>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{seller.email}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{seller.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{seller.address}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleViewProducts(seller.shopName)}
                    className="w-full group relative bg-gradient-to-r from-teal-500 to-green-500 text-white py-2 px-4 rounded-xl 
                    shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-teal-400 to-green-400 opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="absolute left-0 w-12 h-full bg-white opacity-10 transform -skew-x-20 
                    transition-transform duration-700 group-hover:translate-x-full"></span>
                    <span className="relative flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      View Products
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default User_view;