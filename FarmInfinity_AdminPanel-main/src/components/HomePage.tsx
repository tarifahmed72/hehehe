import { FaGoogle } from "react-icons/fa"; // Using react-icons for Google icon
import { BsEye, BsEyeSlash } from "react-icons/bs"; // Icons for password visibility
import { useState } from "react";

const HomePage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left Section (Form) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          {/* Logo */}
          <div className="mb-6">
            <img src="/logo.png" alt="FarmInfinity Logo" className="h-12 w-auto" />
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back !
          </h1>
          <p className="text-gray-500 mb-6">
            Enter to get unlimited access to data & information.
          </p>

          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email *
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter your mail address"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password *
              </label>
              <div className="relative">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline pr-10"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? <BsEyeSlash /> : <BsEye />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center text-gray-700 text-sm">
                <input type="checkbox" className="form-checkbox mr-2" />
                Remember me
              </label>
            </div>

            <div className="mb-6">
              {/* Replace with your login logic */}
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
                type="button"
              >
                Log In
              </button>
            </div>

            <div className="text-center text-gray-500 mb-6">Or, Login with</div>

            {/* Sign up with Google button */}
            <button
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-full flex items-center justify-center"
              type="button"
            >
              <FaGoogle className="mr-2 text-blue-500" />
              Sign up with google
            </button>

            <div className="text-center mt-6 text-gray-700 text-sm">
              Don't have an account?{" "}
              <a className="text-blue-500 hover:text-blue-800" href="#">
                Register here
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* Right Section (Illustration) */}
      {/* You can add a background color or a simple pattern here */}
      <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 relative overflow-hidden">
        {/* Add some simple geometric shapes or keep it as a gradient */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-blue-400 opacity-30 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-teal-400 opacity-30 rounded-full transform translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-yellow-400 opacity-50 transform rotate-45"></div>
      </div>
    </div>
  );
};

export default HomePage;
