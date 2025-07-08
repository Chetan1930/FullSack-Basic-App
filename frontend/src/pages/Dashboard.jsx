import React from "react";
import { useAuth } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with Logout */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome, {user?.username || "User"} 👋
          </h1>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-2">Your Profile</h2>
          <p className="text-gray-600">
            <strong>Email:</strong> {user?.email || "Not Available"}
          </p>
          <p className="text-gray-600 mt-1">
            <strong>Username:</strong> {user?.username || "Guest"}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">        
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-green-600 mb-2">Group Chat</h3>
            <p className="text-3xl font-semibold flex text-gray-800  justify-center">
              <button onClick={()=>navigate('/chat')}>Join</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
