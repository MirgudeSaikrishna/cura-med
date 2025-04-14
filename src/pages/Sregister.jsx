import React, { useState } from "react";

const Sregister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  async function registerUser(event) {
    event.preventDefault();
    const response = await fetch('http://localhost:1337/api/sregister', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formdata: {
          shopName: name,
          email,
          password,
          phone,
          address
        }
      })
    });
    const data = await response.json();
    if (data.status === 'ok') {
      alert('Registration successful');
      window.location.href = '/login';
    } else {
      alert(data.error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-200 to-lime-200 p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg space-y-6">
        <h1 className="text-4xl font-bold text-center text-purple-700">Seller Registration</h1>

        <form onSubmit={registerUser} className="space-y-6">
          <div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Shop Name"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all duration-300 ease-in-out hover:border-indigo-400"
              required
            />
          </div>

          <div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-300 ease-in-out hover:border-teal-400"
              required
            />
          </div>

          <div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-500 transition-all duration-300 ease-in-out hover:border-rose-400"
              required
            />
          </div>

          <div>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              placeholder="Phone"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 transition-all duration-300 ease-in-out hover:border-yellow-400"
              required
            />
          </div>

          <div>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="Address"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-300 ease-in-out hover:border-blue-400"
              required
            />
          </div>

          <div>
            <input
              type="submit"
              value="Register"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg transition duration-300 cursor-pointer"
            />
          </div>
        </form>

        <div className="flex justify-between mt-4 text-sm text-center">
          <button
            onClick={() => window.location.href = '/login'}
            className="text-indigo-600 hover:underline"
          >
            Go to Login
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="text-gray-600 hover:underline"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sregister;
