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
      const response = await axios.post(
              'https://dev-api.farmeasytechnologies.com/api/login',
              { username, password } // Send as JSON
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
 localStorage.setItem('user-role', userRole);      } else {
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="p-6 bg-white rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginAdmin;
