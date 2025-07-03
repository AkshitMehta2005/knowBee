import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  // Check if path is active
  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-purple-900 shadow-lg">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center">
            <img 
              src="/logo.png"
              alt="Q&A Platform Logo"
              className="h-8 w-auto"
            />
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className={`px-4 py-2 rounded-lg transition font-medium ${
              isActive('/') ? 'bg-white text-purple-900' : 'text-purple-100 hover:text-white'
            }`}
          >
            Home
          </Link>

          {user?.role === 'admin' && (
            <span className="text-sm text-purple-300 font-medium">
              Welcome, Admin
            </span>
          )}

          {user ? (
            <>
              <Link
                to="/profile"
                className={`px-4 py-2 rounded-lg transition font-medium ${
                  isActive('/profile') ? 'bg-white text-purple-900' : 'text-purple-100 hover:text-white'
                }`}
              >
                Profile
              </Link>

              <Link
                to="/my-questions"
                className={`px-4 py-2 rounded-lg transition font-medium ${
                  isActive('/my-questions') ? 'bg-white text-purple-900' : 'text-purple-100 hover:text-white'
                }`}
              >
                My Questions
              </Link>

              <Link
                to="/ask"
               className={`px-4 py-2 rounded-lg transition font-medium ${
                  isActive('/ask') ? 'bg-white text-purple-900' : 'text-purple-100 hover:text-white'
                }`}
              >
                Ask Question
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg text-purple-100 hover:text-white font-medium transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`px-4 py-2 rounded-lg transition font-medium ${
                  isActive('/login') ? 'bg-white text-purple-900' : 'text-purple-100 hover:text-white'
                }`}
              >
                Login
              </Link>

              <Link
                to="/register"
                className={`px-4 py-2 rounded-lg transition font-medium ${
                  isActive('/register') ?  'bg-white text-purple-900' : 'text-purple-100 hover:text-white'
                }`}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
