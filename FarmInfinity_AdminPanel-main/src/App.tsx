import "./App.css";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation, Navigate } from "react-router-dom";
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

const PrivateRoute = ({ element }: any) => {
  const isAuthenticated = localStorage.getItem("token"); // Check for token in local storage
  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/" replace />
  );
};
function App() {
  const location = useLocation();
  const hideSidebar = [
    "/",
    "/login-admin",
    "/login-agent",
  ].includes(location.pathname);

  return (
    <Router>
      <div className="flex h-screen">
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
              element={<PrivateRoute element={<Dashboard />} />}
            />
            <Route
              path="/fpo"
              element={<PrivateRoute element={<FPO />} />}
            />
            <Route
              path="/staff"
              element={<PrivateRoute element={<Staff />} />}
            />
            <Route
              path="/farmers"
              element={<PrivateRoute element={<Farmers />} />}
            />
            <Route
              path="/agent"
              element={<PrivateRoute element={<Agent />} />}
            />
            <Route
              path="/bank-agent"
              element={<PrivateRoute element={<BankAgent />} />}
            />
            <Route
              path="/farmers_details/farmerId/:farmerId/applicationId/:applicationId"
              element={<PrivateRoute element={<FarmerDetails />} />}
            />
            <Route
              path="/farmers_applications/:id"
              element={<PrivateRoute element={<FarmerApplication />} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
