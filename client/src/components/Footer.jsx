import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Facebook, Twitter, Instagram, Mail, Phone, MapPin, Heart, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Logo & About */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-blood-50 p-2 rounded-2xl group-hover:bg-blood-100 transition-colors">
                <Droplet className="h-7 w-7 text-blood-600 fill-blood-600" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-tight text-blood-600 leading-none">
                  BLOOD<span className="text-gray-900">BOOST</span>
                </span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">Biotech</span>
              </div>
            </Link>
            <p className="text-gray-500 font-medium leading-relaxed tracking-tight">
              A premium digital network engineered for life-saving operations. Connecting verified heroes with critical needs in real-time.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="h-10 w-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:bg-blood-600 hover:text-white transition-all border border-gray-100">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900">Operations</h3>
            <ul className="space-y-4">
              {[
                { name: 'Find Donors', path: '/donors' },
                { name: 'Request Blood', path: '/register' },
                { name: 'Donor Register', path: '/register' },
                { name: 'Secure Login', path: '/login' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-500 font-bold hover:text-blood-600 transition-colors flex items-center gap-2 group">
                    {link.name} <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900">Support</h3>
            <ul className="space-y-4">
              {['Safety Protocol', 'Clinical Guidelines', 'Privacy Mainframe', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 font-bold hover:text-blood-600 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900">Contact Control</h3>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <div className="h-10 w-10 bg-blood-50 rounded-xl flex items-center justify-center shrink-0">
                   <MapPin className="h-5 w-5 text-blood-600" />
                </div>
                <span className="text-gray-500 font-medium text-sm leading-snug">Global Operations Center<br/>Block-7, BioTech Park, IN.</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="h-10 w-10 bg-blood-50 rounded-xl flex items-center justify-center shrink-0">
                   <Phone className="h-5 w-5 text-blood-600" />
                </div>
                <span className="text-gray-500 font-bold text-sm">+1 (800) BIOTECT</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="h-10 w-10 bg-blood-50 rounded-xl flex items-center justify-center shrink-0">
                   <Mail className="h-5 w-5 text-blood-600" />
                </div>
                <span className="text-gray-500 font-bold text-sm">ops@bloodboost.io</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">
            &copy; {new Date().getFullYear()} BloodBoostBiotect. System Status: <span className="text-green-500">Optimal</span>
          </p>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
            Built with <Heart className="h-3 w-3 text-blood-600 fill-blood-600" /> for Humanity
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
