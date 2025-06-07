import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useParams } from 'react-router-dom';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


const Uproduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6); // Default products per page
  const [location, setLocation] = useState(null); 
  const [searchdata, setSearchdata] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const {shopName}=useParams();

  useEffect(() => {
    setMounted(true);
    async function getProducts() {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:1337/api/products/${shopName}?page=${currentPage}&limit=${productsPerPage}&search=${encodeURIComponent(searchdata)}`,
          {
            method: 'GET',
            headers: {
              'x-access-token': localStorage.getItem('token'),
            },
          }
        );
        const data = await response.json();
        if (data.status === 'ok') {
          setProducts(data.products);
          setLocation(data.location);
          setTotalPages(data.pagination?.totalPages || 1);
        } else {
          setProducts([]);
          alert(data.error);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    window.scrollTo({top:0, behavior: 'smooth' });
    getProducts();
  }, [shopName, currentPage, productsPerPage, searchdata]);

  const handleBack = () => {
    document.getElementById('uproduct-container').classList.add('scale-0', 'opacity-0');
    setTimeout(() => {
      localStorage.removeItem('shopName');
      window.location.href = '/User_view';
    }, 600);
  };

  // Pagination logic
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 4) pages.push('...');
      for (let i = Math.max(2, currentPage - 2); i <= Math.min(totalPages - 1, currentPage + 2); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 3) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };
  const pageNumbers = getPageNumbers();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-300 to-teal-200 p-6 overflow-hidden">
      {/* Floating animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-green-300 opacity-30 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-teal-300 opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full bg-blue-300 opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 rounded-full bg-emerald-300 opacity-30 animate-ping"></div>
      </div>
      
      {location && location.location.coordinates && (
        <MapContainer
          center={[location.location.coordinates[1], location.location.coordinates[0]]} // Note: Latitude comes first, then longitude
          zoom={13}
          style={{ height: '400px', width: '100%' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[location.location.coordinates[1], location.location.coordinates[0]]}>
          <Popup>
            <strong>{shopName}</strong><br />
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${location.location.coordinates[1]},${location.location.coordinates[0]}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              📍 Navigate with Google Maps
            </a>
          </Popup>
          </Marker>
        </MapContainer>
      )}
      <div 
        id="uproduct-container"
        className={`max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-lg bg-opacity-80 
        ${mounted ? 'scale-100 opacity-100' : 'scale-90 opacity-0'} 
        transition-all duration-700 ease-out relative z-10`}
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-green-500 mb-2">
              {shopName} Products
            </h1>
            <p className="text-lg text-gray-600">Browse available healthcare products</p>
          </div>
          
          <div className="relative mt-4 md:mt-0 w-full md:w-64 group">
            <input 
              type="text" 
              value={searchdata} 
              onChange={(e) => setSearchdata(e.target.value)}
              className="w-full px-4 py-3 bg-green-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 
              transition-all duration-300 placeholder-gray-400 pr-10"
              placeholder="Search products..."
            />
            <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-teal-500 to-green-500 transform origin-left scale-x-0 
            group-focus-within:scale-x-100 transition-transform duration-300 w-full"></div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or check back later</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {products.map((product) => (
              <div 
                key={product._id}
                className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl overflow-hidden shadow-lg 
                hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="h-48 overflow-hidden relative">
                  {product.image ? (
                    <img
                      src={`http://localhost:1337${product.image}`}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-teal-400 to-green-400 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-0 right-0 p-2">
                    <div className="bg-green-500 text-white text-sm py-1 px-3 rounded-full font-medium">
                      ${product.price}
                    </div>
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{product.description}</p>
                  
                  <button
                    className="w-full bg-gradient-to-r from-teal-500 to-green-500 text-white py-2 px-4 rounded-xl 
                    shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group relative"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-teal-400 to-green-400 opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="absolute left-0 w-12 h-full bg-white opacity-10 transform -skew-x-20 
                    transition-transform duration-700 group-hover:translate-x-full"></span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {(!loading && totalPages > 1 )&& (
          <div className="flex justify-center mt-8 space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 
              ${currentPage === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-teal-100 text-teal-600 hover:bg-teal-200'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {pageNumbers.map((number, idx) =>
              number === '...' ? (
                <span key={idx} className="w-10 h-10 flex items-center justify-center text-gray-400">...</span>
              ) : (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 
                  ${currentPage === number 
                    ? 'bg-gradient-to-r from-teal-500 to-green-500 text-white shadow-md' 
                    : 'bg-teal-50 text-teal-600 hover:bg-teal-100'}`}
                >
                  {number}
                </button>
              )
            )}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 
              ${currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-teal-100 text-teal-600 hover:bg-teal-200'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
        
        {/* Back button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleBack}
            className="bg-gray-100 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-200 transition-all duration-300 
            flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-1 active:translate-y-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Providers
          </button>
        </div>
      </div>
    </div>
  );
};

export default Uproduct;