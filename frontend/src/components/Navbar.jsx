import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/UserContext';

const Navbar = () => {
  const { logout, user,isAuthenticated } = useAuth();

  return (
    <nav className="flex justify-between items-center bg-blue-700 px-6 py-4 text-black min-w-xs
">
      <div className="text-xl font-semibold">
        QuickMeet
      </div>
      <div className="space-x-4">
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
