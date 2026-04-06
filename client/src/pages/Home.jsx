import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, Activity, Droplet, Users, ShieldCheck, ArrowRight, MapPin, Plus } from 'lucide-react';

const Home = () => {
  const [searchData, setSearchData] = useState({ bloodGroup: 'O+', city: '' });
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/donors?bloodGroup=${searchData.bloodGroup}&city=${searchData.city}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-blood-bg">
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 text-center lg:text-left space-y-10">
              <div className="inline-flex items-center gap-3 bg-blood-50 border border-blood-100 rounded-2xl px-5 py-2.5 animate-fade-in shadow-sm">
                <ShieldCheck className="h-5 w-5 text-blood-600" />
                <span className="text-blood-700 text-[10px] font-black uppercase tracking-[0.2em]">Validated Blood Network</span>
              </div>
              
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-gray-900 leading-[1.05] tracking-tight">
                Save Lives by <span className="text-blood-600 underline decoration-blood-100 underline-offset-8">Donating</span> Blood.
              </h1>
              
              <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Join our premium digital network connecting donors with those in urgent need. Precision matching, clinical excellence, and human connection.
              </p>

              {/* Quick Search Bar */}
              <form onSubmit={handleSearch} className="card-premium !p-2 flex flex-col md:flex-row gap-2 max-w-3xl mx-auto lg:mx-0 shadow-2xl">
                <div className="flex-1 relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-blood-600 h-5 w-5">
                    <Droplet className="fill-blood-600" />
                  </div>
                  <select 
                    value={searchData.bloodGroup}
                    onChange={(e) => setSearchData({...searchData, bloodGroup: e.target.value})}
                    className="w-full pl-14 pr-6 py-4 bg-transparent outline-none font-bold text-gray-900 rounded-2xl focus:bg-gray-50 transition-colors appearance-none cursor-pointer"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                      <option key={bg} value={bg}>{bg} Blood Group</option>
                    ))}
                  </select>
                </div>
                
                <div className="w-[1px] bg-gray-100 hidden md:block my-2"></div>
                
                <div className="flex-[1.5] relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blood-600 transition-colors h-5 w-5">
                    <MapPin />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Enter your city..." 
                    className="w-full pl-14 pr-6 py-4 bg-transparent outline-none font-bold text-gray-900 rounded-2xl focus:bg-gray-50 transition-colors placeholder:text-gray-400"
                    value={searchData.city}
                    onChange={(e) => setSearchData({...searchData, city: e.target.value})}
                  />
                </div>
                
                <button type="submit" className="btn-primary md:px-12 py-4">
                  <Search className="h-5 w-5" /> Search
                </button>
              </form>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4">
                <Link to="/register" className="btn-primary px-10 py-5 text-lg">
                  Become Donor <Plus className="h-5 w-5" />
                </Link>
                <Link to="/register" className="btn-outline px-10 py-5 text-lg">
                  Request Blood <Heart className="h-5 w-5 fill-blood-600" />
                </Link>
              </div>
            </div>
            
            <div className="flex-1 hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-10 bg-blood-100/30 rounded-full blur-3xl opacity-50 animate-pulse-soft"></div>
                <div className="relative card-premium !p-0 overflow-hidden border-[12px] border-white rotate-2 hover:rotate-0 transition-transform duration-700 shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1615461066841-6116ecaaba7d?q=80&w=1200&auto=format&fit=crop" 
                    alt="Blood Donation" 
                    className="w-full h-[600px] object-cover"
                  />
                  <div className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur-xl p-8 rounded-3xl border border-white shadow-2xl">
                    <div className="flex items-center gap-6">
                      <div className="h-16 w-16 bg-blood-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blood-200">
                        <Activity className="text-white h-8 w-8" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-blood-600 uppercase tracking-widest leading-none">Live Status</p>
                        <p className="text-2xl font-black text-gray-900 mt-1 tracking-tight">450+ New Donors</p>
                        <p className="text-sm text-gray-500 font-bold mt-1 tracking-tight italic">Matched in the last 24 hours</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats and Features Section */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="space-y-6">
              <div className="h-14 w-14 bg-blood-50 rounded-2xl flex items-center justify-center">
                <Users className="h-7 w-7 text-blood-600" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 tracking-tight leading-tight">Expertly Built Global Network.</h3>
              <p className="text-gray-500 font-medium leading-relaxed italic">"Our editorial approach to blood donation ensures every drop counts. Precision matching for human connection."</p>
            </div>
            
            <div className="space-y-6">
              <div className="h-14 w-14 bg-blood-50 rounded-2xl flex items-center justify-center">
                <Heart className="h-7 w-7 text-blood-600 fill-blood-600" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 tracking-tight leading-tight">Patient-First Priority Engine.</h3>
              <p className="text-gray-500 font-medium leading-relaxed italic">"Real-time geolocation matching ensures that those in critical need find compatible donors within minutes."</p>
            </div>

            <div className="card-premium !bg-blood-600 text-white flex flex-col justify-between shadow-red-200/50">
               <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-blood-100 mb-2">Platform Goal</p>
                 <p className="text-4xl font-black tracking-tighter">87% Reached</p>
               </div>
               <div className="mt-8 border-t border-white/20 pt-6 flex items-center justify-between">
                 <p className="font-bold text-sm">Target: 50,000 Lives Saved</p>
                 <ArrowRight className="h-6 w-6" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Feed Mockup Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
           <h2 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">Real-time Emergency Feed</h2>
           <div className="space-y-4">
              {[
                { group: 'O+', location: 'City General Hospital', dist: '2.4km away', status: 'CRITICAL', urgent: true },
                { group: 'A-', location: 'Mount Health Center', dist: '5.8km away', status: 'PENDING', urgent: false }
              ].map((feed, i) => (
                <div key={i} className="card-premium !p-6 flex items-center justify-between group hover:border-blood-100 transition-colors">
                  <div className="flex items-center gap-6">
                    <div className={`h-16 w-16 ${feed.urgent ? 'bg-blood-600 text-white' : 'bg-gray-50 text-blood-600'} rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg`}>
                      {feed.group}
                    </div>
                    <div className="text-left">
                      <p className="font-black text-gray-900 tracking-tight">{feed.location}</p>
                      <p className="text-sm font-bold text-gray-400 mt-1">{feed.dist}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${feed.urgent ? 'border-blood-600 text-blood-600 animate-pulse' : 'border-gray-100 text-gray-400'}`}>
                       {feed.status}
                     </span>
                     <Link to="/register" className="h-10 w-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-blood-600 group-hover:text-white transition-all">
                       <ArrowRight className="h-5 w-5" />
                     </Link>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
