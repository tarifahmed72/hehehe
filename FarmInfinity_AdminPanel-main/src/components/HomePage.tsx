import { Link } from "react-router-dom"; // Import Link from react-router-dom


const HomePage = () => {

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

          <div className="flex flex-col"> {/* Added vertical space */}
              <Link to="/login-admin" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline text-center">
                Log In as Admin
              </Link>
            </div>

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
