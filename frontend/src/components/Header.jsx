import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

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

        <div className="flex items-center space-x-6">
          <Link to="/" className="text-purple-100 hover:text-white transition font-medium">
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
                className="text-purple-100 hover:text-white transition font-medium"
              >
                Profile
              </Link>
              <Link
                to="/my-questions"
                className="text-purple-100 hover:text-white transition font-medium"
              >
                My Questions
              </Link>
              <Link
                to="/ask"
                className="bg-white text-purple-900 px-4 py-2 rounded-lg hover:bg-purple-100 transition font-medium"
              >
                Ask Question
              </Link>
              <button
                onClick={handleLogout}
                className="text-purple-100 hover:text-white transition font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-purple-100 hover:text-white transition font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-purple-900 px-4 py-2 rounded-lg hover:bg-purple-100 transition font-medium"
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