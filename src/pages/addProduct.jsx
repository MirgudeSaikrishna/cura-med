import React, { useState } from 'react';

const Sproduct = () => {
  const [name, setname] = useState('');
  const [price, setprice] = useState('');
  const [description, setdescription] = useState('');
  const shopName = localStorage.getItem('shopName');
  const [image, setImage] = useState(null);

  async function addProduct(event) {
    event.preventDefault();
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
      alert('Product added');
      window.location.href = '/Seller_view';
    } else {
      alert(data.error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-teal-500 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-left text-purple-700 mb-6">Add Product</h1>
        <form onSubmit={addProduct} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700 mb-2" htmlFor="image">
              Upload Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="border-2 border-gray-300 rounded-md p-2 text-gray-700"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700 mb-2" htmlFor="name">
              Product Name
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
              className="border-2 border-gray-300 rounded-md p-2 text-gray-700"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700 mb-2" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              placeholder="Enter product price"
              value={price}
              onChange={(e) => setprice(e.target.value)}
              required
              className="border-2 border-gray-300 rounded-md p-2 text-gray-700"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700 mb-2" htmlFor="description">
              Product Description
            </label>
            <textarea
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              required
              className="border-2 border-gray-300 rounded-md p-2 text-gray-700"
            />
          </div>

          <div className="flex justify-start">
            <button
              type="submit"
              className="py-3 px-6 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sproduct;
