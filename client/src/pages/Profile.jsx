import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import { User, Mail, MapPin, Phone, Droplet, ShieldCheck, ArrowRight, Activity, Camera } from 'lucide-react';

const Profile = () => {
  const { user, login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bloodGroup: user?.bloodGroup || '',
    city: user?.city || '',
    contact: user?.contact || '',
    profileImage: user?.profileImage || ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        bloodGroup: user.bloodGroup,
        city: user.city,
        contact: user.contact,
        profileImage: user.profileImage
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const { data } = await API.put('/users/profile', formData);
      login(data); // Update local storage and context
      setMessage('Profile updated successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="text-center py-20 text-gray-400 font-bold">Please log in to view profile.</div>;

  return (
    <div className="min-h-screen bg-blood-bg pb-24">
      {/* Profile Header */}
      <section className="pt-24 pb-32 bg-white border-b border-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blood-50/50 to-transparent opacity-50"></div>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 flex flex-col items-center space-y-8">
           <div className="relative group">
              <div className="h-40 w-40 bg-gray-100 rounded-[3rem] border-8 border-white shadow-2xl overflow-hidden">
                 <img 
                    src={formData.profileImage || `https://ui-avatars.com/api/?name=${user.name}&background=b91c1c&color=fff&size=200`} 
                    alt="Profile" 
                    className="w-full h-full object-cover" 
                 />
              </div>
              <button className="absolute bottom-4 right-4 h-12 w-12 bg-white rounded-2xl shadow-xl border border-gray-100 flex items-center justify-center text-blood-600 hover:scale-110 transition-transform">
                 <Camera className="h-5 w-5" />
              </button>
           </div>

           <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 bg-blood-50 border border-blood-100 rounded-full px-4 py-1.5 shadow-sm mb-2">
                 <ShieldCheck className="h-4 w-4 text-blood-600" />
                 <span className="text-blood-700 text-[10px] font-black uppercase tracking-[0.2em]">{user.role} Account</span>
              </div>
              <h1 className="text-5xl font-black text-gray-900 tracking-tight leading-none">{user.name}</h1>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Credentialized Network Member</p>
           </div>
        </div>
      </section>

      {/* Main Profile Form */}
      <main className="max-w-5xl mx-auto px-6 -mt-24 relative z-20">
         <div className="card-premium space-y-12 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-50 pb-8">
               <div className="space-y-1">
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight leading-none">Security Directives</h2>
                  <p className="text-gray-400 font-medium tracking-tight">Update your core identity and operational details.</p>
               </div>
               <div className="h-12 w-12 bg-blood-50 rounded-2xl flex items-center justify-center">
                  <Activity className="h-6 w-6 text-blood-600 animate-pulse" />
               </div>
            </div>

            {message && (
              <div className={`p-4 rounded-2xl border flex items-center gap-3 font-bold text-sm ${message.includes('success') ? 'bg-green-50 border-green-100 text-green-600' : 'bg-red-50 border-red-100 text-red-600'}`}>
                 {message.includes('success') ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                 {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                     <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Full Identity</label>
                     <div className="relative group">
                        <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blood-600 h-5 w-5" />
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field pl-14" placeholder="Enter Full Name" />
                     </div>
                  </div>

                  <div className="space-y-3">
                     <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Encrypted Email</label>
                     <div className="relative group">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blood-600 h-5 w-5" />
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field pl-14" placeholder="Email Address" disabled />
                     </div>
                  </div>

                  <div className="space-y-3">
                     <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Blood Classification</label>
                     <div className="relative group">
                        <Droplet className="absolute left-5 top-1/2 -translate-y-1/2 text-blood-600 h-5 w-5 fill-blood-600" />
                        <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="input-field pl-14 appearance-none cursor-pointer">
                           <option value="">Select Group</option>
                           {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                             <option key={bg} value={bg}>{bg} Group</option>
                           ))}
                        </select>
                     </div>
                  </div>

                  <div className="space-y-3">
                     <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Operational City</label>
                     <div className="relative group">
                        <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blood-600 h-5 w-5" />
                        <input type="text" name="city" value={formData.city} onChange={handleChange} className="input-field pl-14" placeholder="City Name" />
                     </div>
                  </div>

                  <div className="space-y-3">
                     <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Comms. Number</label>
                     <div className="relative group">
                        <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blood-600 h-5 w-5" />
                        <input type="text" name="contact" value={formData.contact} onChange={handleChange} className="input-field pl-14" placeholder="+91..." />
                     </div>
                  </div>
               </div>

               <div className="pt-8 flex flex-col md:flex-row gap-4">
                  <button type="submit" disabled={loading} className="btn-primary flex-1 py-5 text-lg">
                     {loading ? 'Optimizing Profile...' : 'Save Directives'} <ArrowRight className="h-5 w-5" />
                  </button>
                  <button type="button" className="btn-outline px-10 py-5 text-lg">
                     Reset Changes
                  </button>
               </div>
            </form>
         </div>
      </main>
    </div>
  );
};

export default Profile;
