import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Heart, User } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Search', path: '/donors', icon: Search },
    { name: 'Requests', path: '/dashboard', icon: Heart },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 flex items-center justify-around py-4 md:hidden z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link 
            key={item.name} 
            to={item.path} 
            className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-blood-600 scale-110' : 'text-gray-400 hover:text-blood-400'}`}
          >
            <item.icon className={`h-6 w-6 ${isActive ? 'fill-blood-600' : ''}`} />
            <span className="text-[10px] font-black uppercase tracking-tighter">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
