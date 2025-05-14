import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginAgent = () => {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

 const handleSendOtp = async () => {
    try {
    await axios.post("https://dev-api.farmeasytechnologies.com/api/send-otp", {
      phone_number: phone,
    });
    setOtpSent(true);
    } catch (err) {
      console.error("Error sending OTP:", err);
    }
 };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post("https://dev-api.farmeasytechnologies.com/api/verify-otp", {
        phone_number: phone,
        otp: Number(otp),
        officer: false,
      });

      const exchangeResponse = await axios.post("https://dev-api.farmeasytechnologies.com/api/exchange-code", {
        token: res.data.token,
      });

      // Assuming the new token is in exchangeResponse.data.access_token
      const newToken = exchangeResponse.data.access_token;
      if (newToken) {
        localStorage.setItem("farm-infinity-admin-token", newToken); // Store the new token
        navigate("/dashboard"); // Redirect to dashboard on successful login
      } else {
        console.error("Exchange code failed: No new token received.");
      }
    } catch (err) {
      console.error("Error verifying OTP or exchanging code:", err);
    }
  };
 const navigate = useNavigate();

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

          {!otpSent ? (
            <form onSubmit={handleSendOtp}>
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
                    value={phone}
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
                Send OTP
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <div className="mb-4">
                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
                  OTP
                </label>
                 <div className="flex items-center border rounded w-full py-2 px-3 text-gray-700 leading-tight focus-within:outline-none focus-within:shadow-outline">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                     <path fillRule="evenodd" d="M18 8H2a1 1 0 00-1 1v2a1 1 0 001 1h16a1 1 0 001-1V9a1 1 0 00-1-1zM2 7a2 2 0 00-2 2v2a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2H2zm13 5H5v1h10v-1z" clipRule="evenodd" />
                   </svg>
                  <input
                    type="text"
                    id="otp"
                    className="appearance-none border-none w-full text-gray-700 leading-tight focus:outline-none"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)} // 'e' is used here
                    placeholder="Enter OTP"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-200"
              >
                Verify OTP
              </button>
            </form>
          )}

          <div className="text-center mt-4">
            <a href="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAgent;
