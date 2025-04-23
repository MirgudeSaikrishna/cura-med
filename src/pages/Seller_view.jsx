import React, { useState, useEffect } from 'react';

const Seller_view = () => {
  const [seller, setSeller] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  async function deleteProduct(id) {
    try {
      const response = await fetch('http://localhost:1337/api/deleteProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (data.status === 'ok') {
        alert('Product deleted');
        getdata();
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  }

  async function getdata() {
    setLoading(true);
    try {
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
    } catch (error) {
      console.error('Error fetching seller data:', error);
      alert('Failed to load seller data');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setMounted(true);
    getdata();
  }, []);

  const handleLogout = () => {
    document.getElementById('seller-container').classList.add('scale-0', 'opacity-0');
    setTimeout(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('shopName');
      window.location.href = '/login';
    }, 600);
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
        id="seller-container"
        className={`max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-lg bg-opacity-80 
        ${mounted ? 'scale-100 opacity-100' : 'scale-90 opacity-0'} 
        transition-all duration-700 ease-out relative z-10`}
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Loading seller data...</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div>
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-green-500 mb-2">
                  Welcome, {seller.shopName}
                </h1>
                <p className="text-lg text-gray-600">{seller.address}</p>
              </div>
              
              <div className="flex space-x-4 mt-4 md:mt-0">
                <button
                  onClick={() => (window.location.href = '/addProduct')}
                  className="bg-gradient-to-r from-teal-500 to-green-500 text-white py-2 px-6 rounded-xl
                  shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0
                  flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Product
                </button>
                
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 px-6 rounded-xl
                  shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0
                  flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 mb-6">
                Your Products
              </h2>
              
              {products.length === 0 ? (
                <div className="text-center py-12 bg-blue-50 rounded-2xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-blue-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
                  <p className="text-gray-500">Add your first product to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {products.map((product) => (
                    <div 
                      key={product._id} 
                      className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl overflow-hidden shadow-md
                      hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-32 h-32 relative overflow-hidden">
                          {product.image ? (
                            <img
                              src={`http://localhost:1337${product.image}`}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-r from-teal-400 to-green-400 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 p-5 flex flex-col md:flex-row justify-between">
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                              <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                              <div className="px-3 py-1 rounded-full bg-green-500 text-white text-sm font-medium w-fit">
                                ${product.price}
                              </div>
                            </div>
                            <p className="text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                          </div>
                          
                          <div className="mt-4 md:mt-0 ml-0 md:ml-4 flex items-center">
                            <button
                              onClick={() => deleteProduct(product._id)}
                              className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-4 rounded-xl 
                              shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center
                              group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-pink-600 relative overflow-hidden"
                            >
                              <span className="absolute left-0 w-8 h-full bg-white opacity-10 transform -skew-x-20 
                              transition-transform duration-700 group-hover:translate-x-32"></span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Seller_view;