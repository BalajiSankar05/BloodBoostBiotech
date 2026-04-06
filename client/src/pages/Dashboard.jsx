import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import { 
  Plus, 
  Search, 
  Activity, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowUpRight,
  Droplet,
  Users,
  LayoutDashboard,
  Settings,
  Heart,
  MapPin,
  Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({ totalRequests: 0, pending: 0, accepted: 0 });
  const [loading, setLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState(user?.isAvailable || false);

  useEffect(() => {
    if (user) {
      fetchRequests();
      setIsAvailable(user.isAvailable);
    }
  }, [user]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      let res;
      if (user.role === 'Admin') {
        res = await API.get('/requests');
      } else if (user.role === 'Donor') {
        res = await API.get('/requests/donor-requests');
      } else {
        res = await API.get('/requests/myrequests');
      }
      setRequests(res.data);
      
      // Calculate simple stats
      const pending = res.data.filter(r => r.status === 'Pending').length;
      const accepted = res.data.filter(r => r.status === 'Accepted').length;
      setStats({ totalRequests: res.data.length, pending, accepted });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAvailability = async () => {
    try {
      const newStatus = !isAvailable;
      await API.put('/users/availability', { isAvailable: newStatus });
      setIsAvailable(newStatus);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await API.put(`/requests/${id}/status`, { status });
      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blood-bg">
        <Activity className="h-12 w-12 text-blood-600 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blood-bg flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-80 bg-white border-r border-gray-100 p-8 sticky top-24 h-[calc(100vh-6rem)]">
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2 mb-4">Main Menu</p>
          <button className="w-full flex items-center gap-4 px-6 py-4 bg-blood-50 text-blood-600 rounded-2xl font-black transition-all">
            <LayoutDashboard className="h-5 w-5" /> Dashboard
          </button>
          <Link to="/donors" className="w-full flex items-center gap-4 px-6 py-4 text-gray-500 hover:bg-gray-50 rounded-2xl font-bold transition-all">
            <Search className="h-5 w-5" /> Search Donors
          </Link>
          <button className="w-full flex items-center gap-4 px-6 py-4 text-gray-500 hover:bg-gray-50 rounded-2xl font-bold transition-all">
            <Settings className="h-5 w-5" /> Profile Settings
          </button>
        </div>

        <div className="mt-auto pt-8 border-t border-gray-50">
          <div className="bg-gray-50 rounded-3xl p-6 space-y-4">
             <div className="flex items-center gap-3">
               <div className="h-10 w-10 bg-blood-600 rounded-xl flex items-center justify-center text-white font-black">
                 {user.bloodGroup || '??'}
               </div>
               <div>
                 <p className="text-xs font-black text-gray-900 leading-none">{user.name}</p>
                 <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">{user.role}</p>
               </div>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-12 space-y-12 max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-black text-gray-900 tracking-tight">
              Operational <span className="text-blood-600">Pulse.</span>
            </h1>
            <p className="text-gray-500 font-medium tracking-tight">
              Real-time metrics and urgent directives for {user.name}.
            </p>
          </div>
          
          {user.role === 'Donor' && (
            <div className="card-premium !p-2 flex items-center gap-4 border-2 border-blood-100 shadow-red-100 select-none">
               <div className="pl-4">
                 <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 leading-none">Status</p>
                 <p className={`text-sm font-black mt-1 ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                   {isAvailable ? 'AVAILABLE TO DONATE' : 'OFFLINE'}
                 </p>
               </div>
               <button 
                onClick={handleToggleAvailability}
                className={`h-12 w-24 rounded-xl transition-all relative ${isAvailable ? 'bg-green-500' : 'bg-gray-200'}`}
               >
                 <div className={`absolute top-1 bottom-1 w-10 bg-white rounded-lg shadow-sm transition-all ${isAvailable ? 'right-1' : 'left-1'}`} />
               </button>
            </div>
          )}

          {user.role === 'User' && (
            <Link to="/donors" className="btn-primary">
              <Plus className="h-5 w-5" /> New Blood Request
            </Link>
          )}
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="card-premium space-y-4">
              <div className="h-10 w-10 bg-blood-50 rounded-xl flex items-center justify-center">
                <Heart className="h-5 w-5 text-blood-600 fill-blood-600" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 leading-none mb-2">Total Operations</p>
                <p className="text-4xl font-black text-gray-900 tracking-tight">{stats.totalRequests}</p>
              </div>
           </div>
           
           <div className="card-premium space-y-4">
              <div className="h-10 w-10 bg-orange-50 rounded-xl flex items-center justify-center">
                <Clock className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 leading-none mb-2">Pending Triage</p>
                <p className="text-4xl font-black text-gray-900 tracking-tight">{stats.pending}</p>
              </div>
           </div>

           <div className="card-premium space-y-4">
              <div className="h-10 w-10 bg-green-50 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 leading-none mb-2">Matched & Resolved</p>
                <p className="text-4xl font-black text-gray-900 tracking-tight">{stats.accepted}</p>
              </div>
           </div>
        </div>

        {/* Dynamic Request List */}
        <div className="space-y-6">
           <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Recent Directives</h2>
              <button className="text-xs font-black text-blood-600 uppercase tracking-widest hover:underline">Manage All</button>
           </div>

           <div className="space-y-4">
              {requests.length === 0 ? (
                <div className="card-premium text-center py-20 text-gray-400 font-bold border-dashed border-2">
                  No active directives found in your sector.
                </div>
              ) : (
                requests.map((req) => (
                  <div key={req._id} className="card-premium group hover:border-blood-100 transition-all">
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                           <div className="h-16 w-16 bg-blood-50 rounded-2xl flex items-center justify-center group-hover:bg-blood-100 transition-colors">
                              <span className="text-2xl font-black text-blood-600">{req.bloodGroup}</span>
                           </div>
                           <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-black text-gray-900 tracking-tight leading-none">{req.patientName}</h4>
                                <span className={`text-[8px] font-black px-2 py-0.5 rounded-full border ${
                                  req.status === 'Accepted' ? 'border-green-100 text-green-600 bg-green-50' : 
                                  req.status === 'Rejected' ? 'border-red-100 text-red-600 bg-red-50' : 
                                  'border-orange-100 text-orange-600 bg-orange-50'
                                }`}>
                                  {req.status.toUpperCase()}
                                </span>
                              </div>
                              <div className="flex items-center gap-4">
                                 <p className="text-xs font-bold text-gray-400 flex items-center gap-1">
                                   <MapPin className="h-3 w-3" /> {req.hospitalName}, {req.city}
                                 </p>
                                 <p className="text-xs font-bold text-gray-400 flex items-center gap-1">
                                   <Phone className="h-3 w-3" /> {req.contact}
                                 </p>
                              </div>
                           </div>
                        </div>

                        <div className="flex items-center gap-3">
                           {user.role === 'Donor' && req.status === 'Pending' && (
                             <>
                               <button 
                                onClick={() => handleStatusUpdate(req._id, 'Accepted')}
                                className="h-12 w-12 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all flex items-center justify-center shadow-sm"
                               >
                                 <CheckCircle2 className="h-5 w-5" />
                               </button>
                               <button 
                                onClick={() => handleStatusUpdate(req._id, 'Rejected')}
                                className="h-12 w-12 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all flex items-center justify-center shadow-sm"
                               >
                                 <XCircle className="h-5 w-5" />
                               </button>
                             </>
                           )}
                           <button className="h-12 w-12 bg-gray-50 text-gray-400 rounded-xl hover:bg-blood-50 hover:text-blood-600 transition-all flex items-center justify-center border border-gray-100">
                              <ArrowUpRight className="h-5 w-5" />
                           </button>
                        </div>
                     </div>
                  </div>
                ))
              )}
           </div>
        </div>

        {/* Custom Admin Section */}
        {user.role === 'Admin' && (
           <div className="mt-12 space-y-8 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Global Oversight Panel</h2>
                <div className="flex gap-4">
                   <div className="px-4 py-2 bg-blood-50 border border-blood-100 rounded-xl text-blood-700 text-[10px] font-black uppercase tracking-widest">
                     System Status: ONLINE
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card-premium !p-6 space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 leading-none">Total Donors</p>
                  <p className="text-3xl font-black text-gray-900">1,284</p>
                </div>
                <div className="card-premium !p-6 space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 leading-none">Active Requests</p>
                  <p className="text-3xl font-black text-gray-900">42</p>
                </div>
                <div className="card-premium !p-6 space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 leading-none">Successful Matches</p>
                  <p className="text-3xl font-black text-green-600">892</p>
                </div>
                <div className="card-premium !p-6 space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 leading-none">Urgency Level</p>
                  <p className="text-3xl font-black text-red-600">CRITICAL</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <button className="card-premium text-left space-y-4 hover:border-blood-600 transition-all group">
                    <div className="h-14 w-14 bg-blood-50 rounded-2xl flex items-center justify-center group-hover:bg-blood-600 transition-colors">
                      <Users className="h-7 w-7 text-blood-600 group-hover:text-white" />
                    </div>
                    <h4 className="text-xl font-black tracking-tight text-gray-900">Personnel Audit</h4>
                    <p className="text-sm font-medium text-gray-500">Review donor credentials, verify hospital affiliations, and manage user access logs.</p>
                 </button>
                 <button className="card-premium text-left space-y-4 hover:border-blood-600 transition-all group">
                    <div className="h-14 w-14 bg-blood-50 rounded-2xl flex items-center justify-center group-hover:bg-blood-600 transition-colors">
                      <Activity className="h-7 w-7 text-blood-600 group-hover:text-white" />
                    </div>
                    <h4 className="text-xl font-black tracking-tight text-gray-900">Supply Chain Metrics</h4>
                    <p className="text-sm font-medium text-gray-500">Monitor regional blood availability and visualize demand spikes in real-time.</p>
                 </button>
              </div>
           </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
