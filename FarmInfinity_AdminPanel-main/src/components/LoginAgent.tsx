import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginAgent = () => {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleSendOtp = async () => {
    try {
    await axios.post("https://dev-api.farmeasytechnologies.com/api/send-otp", {
      phone_number: phone,
    });
    setOtpSent(true);
    } catch (err) {
      console.error("Error sending OTP:", err);
      setError("Failed to send OTP. Please try again.");
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
        setError("Login failed. Could not get a valid token.");
      }
    } catch (err) {
      console.error("Error verifying OTP or exchanging code:", err);
      setError("Login failed. Please check your OTP or try again.");
    }
  };
 const navigate = useNavigate();

  return (
    <div className="p-6">
      {!otpSent ? (
        <>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="border p-2" />
          <button onClick={handleSendOtp} className="bg-blue-600 text-white px-4 py-2 ml-2">Send OTP</button>
        </>
      ) : (
        <>
          <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" className="border p-2" />
          <button onClick={handleVerifyOtp} className="bg-green-600 text-white px-4 py-2 ml-2">Verify</button>
        </>
      )}
    </div>
  );
};

export default LoginAgent;
