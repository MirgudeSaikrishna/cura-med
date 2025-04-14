import React, { useState, useEffect } from 'react';

const User_view = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    async function getdata() {
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
    }
    getdata();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-300 to-lime-300 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">Available Sellers</h1>

        <ul className="space-y-4">
          {sellers.map((seller) => (
            <li key={seller._id} className="border-b pb-4">
              <div className="text-lg font-semibold text-teal-800">{seller.shopName}</div>
              <div className="text-sm text-gray-700">Email: {seller.email}</div>
              <div className="text-sm text-gray-700">Phone: {seller.phone}</div>
              <div className="text-sm text-gray-700 mb-4">Address: {seller.address}</div>
              <input
                type="button"
                onClick={() => {
                  localStorage.setItem('shopName', seller.shopName);
                  window.location.href = '/Uproduct';
                }}
                value="View Products"
                className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 cursor-pointer"
              />
            </li>
          ))}
        </ul>

        <div className="mt-6 text-center">
          <input
            type="button"
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
            value="Logout"
            className="mt-4 bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition duration-300 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default User_view;
