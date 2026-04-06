import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AlertCircle, User, Mail, Lock, Heart, MapPin, Phone, Calendar, Navigation, Loader2 } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'User', 
    bloodGroup: 'O+', city: '', contact: '',
    lastDonationDate: '', latitude: null, longitude: null
  });
  const [locationLoading, setLocationLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData({
          ...formData,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setLocationLoading(false);
      },
      () => {
        setError('Unable to retrieve your location');
        setLocationLoading(false);
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account');
    }
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center p-6 bg-blood-bg">
      <div className="w-full max-w-2xl">
        <div className="card-premium space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Create Account</h1>
            <p className="text-gray-500 font-medium tracking-tight">
              Join our network of life-savers today.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-600">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm font-bold">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blood-600 h-5 w-5 transition-colors" />
                  <input type="text" name="name" required placeholder="John Doe" onChange={handleChange} className="input-field pl-14" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blood-600 h-5 w-5 transition-colors" />
                  <input type="email" name="email" required placeholder="john@example.com" onChange={handleChange} className="input-field pl-14" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blood-600 h-5 w-5 transition-colors" />
                  <input type="password" name="password" required placeholder="••••••••" onChange={handleChange} className="input-field pl-14" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">I want to be a</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blood-600 h-5 w-5 transition-colors" />
                  <select name="role" value={formData.role} onChange={handleChange} className="input-field pl-14 appearance-none cursor-pointer">
                    <option value="User">Requester (User)</option>
                    <option value="Donor">Blood Donor</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Location (Tamil Nadu)</label>
                <div className="relative group">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blood-600 h-5 w-5 transition-colors" />
                  <select name="city" required value={formData.city} onChange={handleChange} className="input-field pl-14 appearance-none cursor-pointer">
                    <option value="">Select your city</option>
                    {['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Tiruppur', 'Vellore', 'Erode', 'Thoothukudi', 'Dindigul', 'Thanjavur', 'Ranipet', 'Sivakasi', 'Kanchipuram', 'Karur', 'Namakkal', 'Kumbakonam', 'Nagercoil', 'Cuddalore', 'Hosur', 'Ambur', 'Karaikudi', 'Pudukkottai', 'Dharmapuri'].sort().map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              {formData.role === 'Donor' && (
                <div className="space-y-4 md:col-span-2 animate-fade-in">
                  <div className="bg-blood-50 p-6 rounded-3xl border border-blood-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-blood-700 ml-1">Blood Group</label>
                      <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="input-field !py-2 !px-4">
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                          <option key={bg} value={bg}>{bg}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-blood-700 ml-1">Contact</label>
                      <div className="relative group">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-blood-400 h-4 w-4" />
                        <input type="text" name="contact" required placeholder="+91..." onChange={handleChange} className="input-field !py-2 !pl-10" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-blood-700 ml-1">Last Donation Date</label>
                      <div className="relative group">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-blood-400 h-4 w-4" />
                        <input type="date" name="lastDonationDate" onChange={handleChange} className="input-field !py-2 !pl-10" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-blood-700 ml-1">Last Donation Date</label>
                      <div className="relative group">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-blood-400 h-4 w-4" />
                        <input type="date" name="lastDonationDate" onChange={handleChange} className="input-field !py-2 !pl-10" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button type="submit" className="btn-primary w-full py-5 text-lg">
              Create Account <Heart className="h-5 w-5 fill-white" />
            </button>
          </form>

          <footer className="pt-6 border-t border-gray-50 text-center">
            <p className="text-gray-500 font-medium tracking-tight">
              Already have an account?{' '}
              <Link to="/login" className="text-blood-600 font-black hover:underline underline-offset-4">
                Login here
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Register;
