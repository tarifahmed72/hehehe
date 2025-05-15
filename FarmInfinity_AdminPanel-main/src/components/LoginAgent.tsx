import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginAgent = () => {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate(); // Keep navigate

  // Simulate login by storing a default token
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    localStorage.setItem("default-auth-token", "YOUR_DEFAULT_AGENT_TOKEN_HERE"); // Store default token
    navigate("/dashboard"); // Redirect to dashboard after simulated login
  };


 return (
    <div className="min-h-screen flex">
      {/* Left Column (Illustration Placeholder) */}
      <div className="w-1/2 bg-white flex items-center justify-center p-10">
        {/* Replace with your illustration */}
        <img src="/path/to/your/illustration.svg" alt="Login Illustration" className="max-w-full h-auto" />
      </div>

      {/* Right Column (Login Form) */}
      <div className="w-1/2 bg-blue-600 flex items-center justify-center p-10 relative overflow-hidden">
        {/* Abstract Shapes - Adjust as needed */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 opacity-20 rounded-full mix-blend-multiply transform translate-x-20 translate-y-20"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 opacity-20 rounded-full mix-blend-multiply transform -translate-x-20 -translate-y-20"></div>

        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md z-10">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">Hello!</h2>
          <p className="text-gray-600 mb-6 text-center">Sign In to Your Account</p>

          {/* Simplified form for simulated login */}
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                  Phone Number
                </label>
                <div className="flex items-center border rounded w-full py-2 px-3 text-gray-700 leading-tight focus-within:outline-none focus-within:shadow-outline">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <input
                    type="tel"
                    id="phone"
                    className="appearance-none border-none w-full text-gray-700 leading-tight focus:outline-none"
                    value={phone} // Keep the value prop
                    onChange={(e) => setPhone(e.target.value)} // 'e' is used here
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-200"
              >
                Login (Simulated)
              </button>
            </form>




        </div>
      </div>
    </div>
  );
};

export default LoginAgent;
