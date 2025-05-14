import "./App.css";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import { Routes, Route, useLocation, Navigate } from "react-router-dom"; // Removed BrowserRouter import
import Farmers from "./components/Farmers";
import Agent from "./components/Agent";
import BankAgent from "./components/BankAgent";
import FarmerDetails from "./components/FarmerDetails";
import LoginAgent from "./components/LoginAgent";
import FPO from "./components/FPO";
import LoginAdmin from "./components/LoginAdmin";
import Staff from "./components/Staff";
import FarmerApplication from "./components/FarmerApplication";
import HomePage from "./components/HomePage";


const PrivateRoute = ({ element, allowedRoles }: any) => { // Added allowedRoles prop
  const isAuthenticated = localStorage.getItem("farm-infinity-admin-token"); // Check for token in local storage
  const userRole = localStorage.getItem("user-role"); // Get user role from local storage

  // Check if the user is authenticated and if their role is allowed
  if (isAuthenticated && userRole && allowedRoles.includes(userRole)) {
    return element;
  } else {
    // Redirect to home or an unauthorized page if not authenticated or role is not allowed
    return <Navigate to="/" replace />;
  }
};

function App() {
  const location = useLocation();
  const hideSidebar = [
    "/",
    "/login-admin",
    "/login-agent",
  ].includes(location.pathname);

  return (
    <div className="flex h-screen"> {/* Removed Router component */}
      {!hideSidebar && <Sidebar />}
      <div className={`flex-1 overflow-auto ${!hideSidebar ? "ml-48" : ""}`}>
        {" "}
        {/* Adjusted ml to ml-48 for left margin */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/login-agent" element={<LoginAgent />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} allowedRoles={['agent', 'manager', 'fpo']} />} // Added allowedRoles
          />
          <Route
            path="/fpo"
            element={<PrivateRoute element={<FPO />} allowedRoles={['agent', 'manager', 'fpo']} />} // Added allowedRoles
          />
          <Route
            path="/staff"
            element={<PrivateRoute element={<Staff />} allowedRoles={['agent', 'manager', 'fpo']} />} // Added allowedRoles
          />
          <Route
            path="/farmers"
            element={<PrivateRoute element={<Farmers />} allowedRoles={['agent', 'manager', 'fpo']} />} // Added allowedRoles
          />
          <Route
            path="/agent"
            element={<PrivateRoute element={<Agent />} allowedRoles={['agent', 'manager', 'fpo']} />} // Added allowedRoles
          />
          <Route
            path="/bank-agent"
            element={<PrivateRoute element={<BankAgent />} allowedRoles={['agent', 'manager', 'fpo']} />} // Added allowedRoles
          />
          <Route
            path="/farmers_details/farmerId/:farmerId/applicationId/:applicationId"
            element={<PrivateRoute element={<FarmerDetails />} allowedRoles={['agent', 'manager', 'fpo']} />} // Added allowedRoles
          />
          <Route
            path="/farmers_applications/:id"
            element={<PrivateRoute element={<FarmerApplication />} allowedRoles={['agent', 'manager', 'fpo']} />} // Added allowedRoles
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
