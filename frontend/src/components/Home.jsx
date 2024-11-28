import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLocal } from "../utils/helper";
import TicketView from "./TicketView";
import Sidebar from "./SideBar";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const username = "John Doe";

  useEffect(() => {
    const token = getLocal("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const logoutUser = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} />

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 bg-gray-100 transition-all duration-300`}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-white p-4 shadow-md border-b border-gray-300">
          <button
            className="text-gray-700"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>

          <div className="flex items-center space-x-4">
            <span className="text-gray-700">{username}</span>
            <button
              className="text-gray-700 hover:text-indigo-600"
              onClick={logoutUser}
            >
              <i className="fas fa-sign-out-alt text-xl"></i>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4">
          <TicketView />
        </div>
      </div>

      {/* Overlay for Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;
