import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Droplet, Menu, UserCircle, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="glass-nav sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex justify-between items-center h-24">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-blood-50 p-2 rounded-2xl group-hover:bg-blood-100 transition-colors">
              <Droplet className="h-7 w-7 text-blood-600 fill-blood-600" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tight text-blood-600 leading-none">
                BLOOD<span className="text-gray-900">BOOST</span>
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">Biotect</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-12">
            <Link to="/donors" className="text-sm font-bold text-gray-500 hover:text-blood-600 transition-colors uppercase tracking-widest">Search</Link>
            {user ? (
              <div className="flex items-center space-x-8">
                <Link to="/dashboard" className="text-sm font-bold text-gray-500 hover:text-blood-600 transition-colors uppercase tracking-widest">Dashboard</Link>
                <div className="h-10 w-[1px] bg-gray-100"></div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-black text-gray-900 leading-none">{user.name}</p>
                    <p className="text-[10px] font-bold text-blood-600 uppercase tracking-tighter mt-1">{user.role}</p>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-3 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-blood-600 rounded-2xl transition-all border border-gray-100"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-6">
                <Link to="/login" className="text-sm font-bold text-gray-500 hover:text-blood-600 transition-colors uppercase tracking-widest">Login</Link>
                <Link to="/register" className="btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
