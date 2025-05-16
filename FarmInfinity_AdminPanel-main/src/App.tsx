import "./App.css";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import Staff from "./components/Staff";
import Farmers from "./components/Farmers";
import Agent from "./components/Agent";
import BankAgent from "./components/BankAgent";
import FarmerDetails from "./components/FarmerDetails";
import FPO from "./components/FPO";
import FarmerApplication from "./components/FarmerApplication";
import LoginAdmin from "./components/LoginAdmin";
import LoginAgent from "./components/LoginAgent";
import HomePage from "./components/HomePage"; // Assuming you have a HomePage component
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="flex h-screen">
      <Routes>
        {/* Login Routes (without sidebar) */}
        <Route path="/admin/login" element={<LoginAdmin />} />
 <Route path="/" element={<HomePage />} />
        <Route path="/agent/login" element={<LoginAgent />} />

        {/* Routes with Sidebar */}
        <Route path="/*" element={<LayoutWithSidebar />} />
      </Routes>
    </div>
  );
}

// A component to wrap routes that should have the sidebar
function LayoutWithSidebar() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/fpo" element={<FPO />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/farmers" element={<Farmers />} />
          <Route path="/agent" element={<Agent />} />
          <Route path="/bank-agent" element={<BankAgent />} />
          <Route
            path="/farmers_details/farmerId/:farmerId/applicationId/:applicationId"
            element={<FarmerDetails />}
          />
          <Route
            path="/farmers_applications/:id"
            element={<FarmerApplication />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;

