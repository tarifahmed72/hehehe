import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { jwtDecode } from 'jwt-decode';
const LoginAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const params = new URLSearchParams();
      params.append('username', username);
      params.append('password', password);

      const response = await axios.post(
        'https://dev-api.farmeasytechnologies.com/api/login',
        params.toString(),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
      );
            
      // Assuming the token is in response.data.access_token
      const token = response.data.access_token;
      if (token) {
        localStorage.setItem('farm-infinity-admin-token', token);
        navigate('/dashboard'); // Redirect to dashboard on successful login
 // Decode the token to get user information, including the role
        const decodedToken: any = jwtDecode(token);
        const userRole = decodedToken.role; // Assuming 'role' is the claim name for the role
 // Store the role in local storage
 localStorage.setItem('user-role', userRole);
      } else {
        setError('Login failed: No token received.');
      }

      // Start token refresh interval
      setInterval(async () => {
        const currentToken = localStorage.getItem('farm-infinity-admin-token');
        if (currentToken) {
          try {
            const refreshResponse = await axios.post('https://dev-api.farmeasytechnologies.com/api/refresh-token', {
              token: currentToken,
            });
            const newToken = refreshResponse.data.access_token;
            if (newToken) {
              localStorage.setItem('farm-infinity-admin-token', newToken);
              console.log('Token refreshed successfully');
            }
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
          }
        }
      }, 300000); // Refresh every 5 minutes (300000 milliseconds)
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Column - Illustration Placeholder */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-gray-100">
        {/* You can replace this div with an actual illustration or image */}
        <div className="w-full max-w-md text-center text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 mx-auto mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <h1 className="text-xl font-semibold">Welcome to the Admin Panel</h1>
          <p className="mt-2 text-sm">Manage your Farm Infinity platform efficiently.</p>
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-blue-600 relative overflow-hidden">
        {/* Abstract Shapes */}
        <div className="absolute bottom-0 left-0 mb-[-100px] ml-[-150px] w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 mt-[-100px] mr-[-150px] w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>

        <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-xl z-10">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Hello!</h2>
          <p className="text-gray-600 mb-6">Sign In to Your Account</p>

          <form onSubmit={handleLogin}>
            {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}
            
            <div className="mb-4 relative">
              <input
                type="text"
                id="username"
                className="pl-10 pr-3 py-2 w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-1 11H4a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2v11a2 2 0 01-2 2z" /></svg>
              </span>
            </div>
            
            <div className="mb-6 relative">
              <input
                type="password"
                id="password"
                className="pl-10 pr-3 py-2 w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </span>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
            >
              Login
            </button>

            <div className="mt-4 text-center">
              <a href="#" className="text-sm text-blue-200 hover:underline">Forgot Password?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
