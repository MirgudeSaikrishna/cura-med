import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');

  async function loginUser(event) {
    event.preventDefault();
    const response = await fetch('http://localhost:1337/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usertype,
        email,
        password,
      }),
    });
    const data = await response.json();
    if (data.user) {
      localStorage.setItem('token', data.user);
      alert('Login successful');
      if (data.type === 'seller') {
        window.location.href = '/Seller_view';
      } else {
        window.location.href = '/User_view';
      }
    } else {
      alert('Check credentials');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-purple-800 mb-6">Sign In</h1>

        <form onSubmit={loginUser} className="space-y-6">
          <div>
            <label htmlFor="options" className="block text-sm font-medium text-gray-700">User Type</label>
            <select
              id="options"
              value={usertype}
              onChange={(e) => setUsertype(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition duration-300"
            >
              <option value="">-- Select --</option>
              <option value="seller">Seller</option>
              <option value="user">User</option>
            </select>
          </div>

          <div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition duration-300"
              required
            />
          </div>

          <div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition duration-300"
              required
            />
          </div>

          <div>
            <input
              type="submit"
              value="Login"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg transition duration-300 cursor-pointer"
            />
          </div>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => window.location.href = '/register'}
            className="text-indigo-600 hover:underline"
          >
            Don't have an account? Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
