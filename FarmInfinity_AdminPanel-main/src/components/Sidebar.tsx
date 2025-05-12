import { useState } from "react";
import { FaUsers, FaUserSecret } from "react-icons/fa";
import { RiBankFill, RiDashboardLine } from "react-icons/ri";
import { ImUsers } from "react-icons/im";
import { TbUserSquareRounded, TbCashBanknote } from "react-icons/tb";
import { HiMenu } from "react-icons/hi";
import { Link } from "react-router-dom";

import keycloak from '../keycloak';
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); 
  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden p-4 bg-gray-900 text-white">
        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
          <HiMenu className="text-amber-50 hover:text-amber-300" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${isOpen ? "block" : "hidden"
        } w-48 lg:block bg-blue-500 text-black p-4 h-screen space-y-4 fixed lg:static z-50 overflow-y-auto transition-all duration-300 ease-in-out`}
      > 

        {/* Logout Button (Top Right) */}
        <div className={`absolute top-4 right-4`}>
          <button onClick={() => keycloak.logout()} className="text-sm text-black hover:text-gray-700">
            Logout
          </button>
        </div>
        
        {/* Logo */}
        <div className={`mb-6`}>
          <a href="/" className="block">
            <img src="/logo.png" alt="Logo" className="h-12 w-auto mx-auto" />
          </a>
        </div>

        {/* Dashboard */}
        <div className="font-semibold flex items-center gap-2 py-3 px-2 hover:bg-gray-700 rounded cursor-pointer">
          <RiDashboardLine />
          <Link to="/dashboard">Dashboard</Link>

        </div>

        {/* Users */}
        <div>
          <div className="text-sm text-gray-400 uppercase font-bold mt-6 mb-2 px-2">Users</div>
          <div className="space-y-2 pl-2">
            <div className="flex items-center gap-2 px-2 py-2 hover:bg-gray-700 rounded transition-colors duration-200">
              <FaUsers />
              <Link to="/staff">Staffs</Link>
            </div>
            <div className="flex items-center gap-2 px-2 py-2 hover:bg-gray-700 rounded transition-colors duration-200">
              <FaUsers />
              <Link to="/farmers">Farmers</Link>
            </div>
            <div className="flex items-center gap-2 px-2 py-2 hover:bg-gray-700 rounded transition-colors duration-200">
              <ImUsers />
              <Link to="/fpo">FPO</Link>
            </div>
            <div className="flex items-center gap-2 px-2 py-2 hover:bg-gray-800 rounded">
              <FaUserSecret />
              <Link to="/agent">Agent</Link>
            </div>
            <div className="flex items-center gap-2 px-2 py-2 hover:bg-gray-800 rounded">
              <RiBankFill />
              <Link to="/bank-agent">Bank Agent</Link>
            </div>
          </div>
        </div>

        {/* Loan Management */}
        <div>
          <div className="text-sm text-gray-400 uppercase font-bold mt-6 mb-2 px-2">Loan Management</div>
          <div className="space-y-2 pl-2">
            <div className="flex items-center gap-2 px-2 py-2 hover:bg-gray-700 rounded transition-colors duration-200">
              <TbUserSquareRounded />
              <span>Borrower</span>
            </div>
            <div className="flex items-center gap-2 px-2 py-2 hover:bg-gray-700 rounded transition-colors duration-200">
              <TbCashBanknote />
              <span>Loan</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;



