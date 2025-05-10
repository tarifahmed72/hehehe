import axios from 'axios';

export async function fetchApplications() {
  const token = localStorage.getItem('token'); // Assuming the token is stored under the key 'token'

  if (!token) {
    console.error('No token found in localStorage');
    // Handle the case where the token is not available, e.g., redirect to login
    return null;
  }

  try {
    const response = await axios.get('https://dev-api.farmeasytechnologies.com/api/applications/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw error; // Re-throw the error for further handling
  }
}