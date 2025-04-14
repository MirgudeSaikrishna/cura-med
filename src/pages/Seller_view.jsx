import React, { useState, useEffect } from 'react';

const Seller_view = () => {
  const [seller, setSeller] = useState('');
  const [products, setProducts] = useState([]);

  async function deleteProduct(id) {
    const response = await fetch('http://localhost:1337/api/deleteProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        id,
      }),
    });
    const data = await response.json();
    if (data.status === 'ok') {
      alert('Product deleted');
      getdata();
    } else {
      alert(data.error);
    }
  }

  async function getdata() {
    const response = await fetch('http://localhost:1337/api/S_view', {
      method: 'GET',
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    });
    const data = await response.json();
    if (data.status === 'ok') {
      setSeller(data.seller);
      setProducts(data.products);
      localStorage.setItem('shopName', data.seller.shopName);
    } else {
      alert(data.error);
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  }

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-teal-500 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center text-purple-700 mb-6">Welcome, {seller.shopName}</h1>
        <div className="mb-8 text-center">
          <p className="text-xl font-medium text-gray-800">{seller.address}</p>
        </div>

        <h2 className="text-2xl font-semibold text-purple-600 mb-4">Your Products</h2>
        <ul className="space-y-6">
          {products.map((product) => (
            <li key={product._id} className="flex flex-col md:flex-row justify-between items-center border-b pb-4">
              <div className="flex items-center space-x-4">
                {product.image && (
                  <img
                    src={`http://localhost:1337${product.image}`}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded-lg" // Reduced size of the image
                  />
                )}
                <div className="flex flex-col space-y-2">
                  <span className="text-lg font-semibold text-teal-700">{product.name}</span>
                  <span className="text-sm text-gray-600">${product.price}</span>
                  <p className="text-sm text-gray-500">{product.description}</p>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Delete Product
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 text-center space-x-4">
          <button
            onClick={() => (window.location.href = '/addProduct')}
            className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Add Product
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('shopName');
              window.location.href = '/login';
            }}
            className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Seller_view;
