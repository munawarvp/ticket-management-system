import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLocal } from "../utils/helper";

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
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 text-lg font-bold border-b border-gray-700">
            Dashboard
          </div>
          <ul className="flex-grow space-y-2 p-4">
            <li className="bg-gray-700 rounded-md px-4 py-2 cursor-pointer">
              Tickets
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col flex-1 bg-gray-100">
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

        <div className="flex-1 p-6">
          <h1 className="text-xl font-semibold text-gray-800">Welcome to the Dashboard</h1>
          <p className="mt-2 text-gray-600">Here is the content of your dashboard.</p>
        </div>
      </div>

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
