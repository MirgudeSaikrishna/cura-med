import React, { useState, useEffect } from 'react';

const Sproduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const shopName = localStorage.getItem('shopName');

  useEffect(() => {
    setMounted(true);
    
    // Clean up preview URL when component unmounts
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, []);

  // Create preview when image is selected
  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
      return;
    }
    
    const url = URL.createObjectURL(image);
    setPreviewUrl(url);
    
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [image]);

  async function addProduct(event) {
    event.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('seller', shopName);
      if (image) formData.append('image', image);

      const response = await fetch('http://localhost:1337/api/addproduct', {
        method: 'POST',
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
        body: formData,
      });

      const data = await response.json();
      if (data.status === 'ok') {
        alert('Product added successfully!');
        handleBack();
      } else {
        alert(data.error || 'Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('An error occurred while adding the product');
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleBack = () => {
    document.getElementById('sproduct-container').classList.add('scale-0', 'opacity-0');
    setTimeout(() => {
      window.location.href = '/Seller_view';
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
        id="sproduct-container"
        className={`max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-lg bg-opacity-80 
        ${mounted ? 'scale-100 opacity-100' : 'scale-90 opacity-0'} 
        transition-all duration-700 ease-out relative z-10`}
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-green-500 mb-2">
            Add New Product
          </h1>
          <p className="text-lg text-gray-600">Enter details to add a product to your store</p>
        </div>
        
        <form onSubmit={addProduct} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left side - Image upload */}
            <div className="w-full md:w-1/3">
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-1 block" htmlFor="image">
                  Product Image
                </label>
                <div 
                  className={`mt-1 h-52 border-2 border-dashed rounded-xl flex flex-col items-center justify-center
                  ${previewUrl ? 'border-teal-400 bg-teal-50' : 'border-gray-300 bg-gray-50'} 
                  transition-all duration-300 overflow-hidden relative group`}
                >
                  {previewUrl ? (
                    <>
                      <img 
                        src={previewUrl} 
                        alt="Product preview" 
                        className="w-full h-full object-cover absolute inset-0"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            setImage(null);
                            setPreviewUrl(null);
                          }}
                          className="bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm text-gray-500 text-center">
                        Click to upload or<br />drag and drop
                      </p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>
            
            {/* Right side - Product details */}
            <div className="flex-1">
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-1 block" htmlFor="name">
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 
                  focus:border-transparent transition-all duration-300 placeholder-gray-400"
                />
              </div>
              
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-1 block" htmlFor="price">
                  Price (USD)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="number"
                    id="price"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    min="0"
                    step="0.01"
                    className="w-full pl-8 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 
                    focus:border-transparent transition-all duration-300 placeholder-gray-400"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-1 block" htmlFor="description">
                  Product Description
                </label>
                <textarea
                  id="description"
                  placeholder="Enter product description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 
                  focus:border-transparent transition-all duration-300 placeholder-gray-400 resize-none"
                ></textarea>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-100 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-200 transition-all duration-300 
              flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-1 active:translate-y-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-teal-500 to-green-500 text-white py-2 px-6 rounded-lg
              shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0
              flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sproduct;