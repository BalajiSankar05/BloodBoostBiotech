import React, { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { Search, MapPin, Phone, Droplet, User, Heart, Filter, ArrowRight, Navigation, Loader2, Calendar } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Donors = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [donors, setDonors] = useState([]);
  const [bloodGroup, setBloodGroup] = useState(queryParams.get('bloodGroup') || '');
  const [city, setCity] = useState(queryParams.get('city') || '');
  const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });
  const [loading, setLoading] = useState(false);
  const [locLoading, setLocLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const fetchDonors = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/users/donors', {
        params: { 
          bloodGroup, 
          city,
          latitude: userLocation.latitude,
          longitude: userLocation.longitude
        }
      });
      setDonors(data);
    } catch (error) {
      console.error('Failed to fetch donors', error);
    } finally {
      setLoading(false);
    }
  };

  const getBrowserLocation = () => {
    if (!navigator.geolocation) return;
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        setLocLoading(false);
      },
      () => setLocLoading(false)
    );
  };

  useEffect(() => {
    getBrowserLocation();
  }, []);

  useEffect(() => {
    fetchDonors();
  }, [location.search, userLocation.latitude]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (bloodGroup) params.append('bloodGroup', bloodGroup);
    if (city) params.append('city', city);
    navigate({ search: params.toString() });
  };

  return (
    <div className="min-h-screen bg-blood-bg pb-24">
      {/* Search Header */}
      <section className="pt-16 pb-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 text-center space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="inline-flex items-center gap-3 bg-blood-50 border border-blood-100 rounded-2xl px-5 py-2.5 shadow-sm">
               <Filter className="h-4 w-4 text-blood-600" />
               <span className="text-blood-700 text-[10px] font-black uppercase tracking-[0.2em]">Precision Filter Engine</span>
            </div>
            <div className={`inline-flex items-center gap-3 border rounded-2xl px-5 py-2.5 shadow-sm transition-all ${userLocation.latitude ? 'bg-green-50 border-green-100 text-green-700' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
               {locLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Navigation className="h-4 w-4" />}
               <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                 {userLocation.latitude ? '10KM Proximity Active' : 'Location Not Detected'}
               </span>
            </div>
          </div>
          <h1 className="text-5xl font-black text-gray-900 tracking-tight leading-none">Find <span className="text-blood-600">Donors.</span></h1>
          
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto card-premium !p-2 flex flex-col md:flex-row gap-2 mt-8 shadow-2xl">
            <div className="flex-1 relative">
              <Droplet className="absolute left-5 top-1/2 -translate-y-1/2 text-blood-600 h-5 w-5 fill-blood-600" />
              <select 
                value={bloodGroup} 
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-transparent outline-none font-bold text-gray-900 appearance-none cursor-pointer rounded-2xl focus:bg-gray-50 transition-colors"
              >
                <option value="">All Blood Groups</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                  <option key={bg} value={bg}>{bg} Group</option>
                ))}
              </select>
            </div>
            <div className="w-[1px] bg-gray-100 hidden md:block my-2"></div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input 
                type="text" 
                placeholder="City Name" 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-transparent outline-none font-bold text-gray-900 rounded-2xl focus:bg-gray-50 transition-colors placeholder:text-gray-400"
              />
            </div>
            <button type="submit" className="btn-primary md:px-12 py-4">
              <Search className="h-5 w-5" /> Filter Results
            </button>
          </form>
        </div>
      </section>

      {/* Donor Grid */}
      <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="h-12 w-12 border-4 border-blood-100 border-t-blood-600 rounded-full animate-spin"></div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Querying Network...</p>
          </div>
        ) : donors.length === 0 ? (
          <div className="card-premium py-32 text-center space-y-4 border-dashed border-2">
             <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                <Search className="h-8 w-8 text-gray-300" />
             </div>
             <div className="space-y-1">
               <h3 className="text-xl font-black text-gray-900 tracking-tight">No Matching Operatives.</h3>
               <p className="text-gray-400 font-medium">Try broadening your search parameters or check back shortly.</p>
             </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {donors.map(donor => (
              <div key={donor._id} className="card-premium group hover:border-blood-100 transition-all flex flex-col justify-between h-full relative overflow-hidden">
                {donor.distance !== undefined && (
                  <div className="absolute top-0 right-0 bg-blood-600 text-white px-4 py-1 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <Navigation className="h-3 w-3 fill-white" /> {donor.distance.toFixed(1)} km away
                  </div>
                )}
                
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="h-16 w-16 bg-blood-50 rounded-2xl flex items-center justify-center group-hover:bg-blood-600 transition-all duration-500">
                      <span className="text-2xl font-black text-blood-600 group-hover:text-white">{donor.bloodGroup}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-none capitalize">{donor.name}</h3>
                    <div className="space-y-2 pt-2">
                       <p className="text-sm font-bold text-gray-500 flex items-center gap-2">
                         <MapPin className="h-4 w-4 text-blood-600" /> {donor.city || 'Location Shared'}
                       </p>
                       <p className="text-sm font-bold text-gray-500 flex items-center gap-2">
                         <Phone className="h-4 w-4 text-blood-600" /> {donor.contact}
                       </p>
                       {donor.lastDonationDate && (
                         <p className="text-xs font-black text-gray-400 flex items-center gap-2 uppercase tracking-tight">
                           <Calendar className="h-4 w-4" /> Last Donation: {new Date(donor.lastDonationDate).toLocaleDateString()}
                         </p>
                       )}
                    </div>
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-gray-50 flex items-center gap-3">
                   <Link to="/register" className="btn-primary !py-3 !px-4 flex-1 text-sm">
                      Request Blood <Heart className="h-4 w-4 fill-white" />
                   </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Donors;
