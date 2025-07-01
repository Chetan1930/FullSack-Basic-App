import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(UserContext);

  return (
    <nav className="flex justify-between items-center bg-blue-600 px-6 py-4 text-white">
      <div className="text-xl font-semibold">
        <Link to="/">QuickMeet</Link>
      </div>
      <div className="space-x-4">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        ) : (
          <>
            <span className="text-sm text-white">Hi, {user.username}</span>
            <button onClick={logout} className="ml-2 underline hover:text-red-300">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
