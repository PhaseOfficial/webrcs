import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaMapMarkerAlt, FaCity, FaGlobe, FaSave, FaArrowLeft, FaSpinner } from 'react-icons/fa';

import ClientAreaNavbar from '../components/ClientAreaNavbar';
import Footer from '../components/footer';
import { useThemeClasses } from '../components/ThemeAware';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';

const ProfileUpdate = () => {
  const themeClasses = useThemeClasses();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({
    full_name: '',
    address: '',
    city: '',
    country: ''
  });

  // Fetch existing profile on load
  useEffect(() => {
    if (!user) return;

    const getProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
            throw error;
        }

        if (data) {
          setFormData({
            full_name: data.full_name || '',
            address: data.address || '',
            city: data.city || '',
            country: data.country || ''
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...formData,
          updated_at: new Date(),
        });

      if (error) throw error;

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      
      // Optional: Redirect back after short delay
      // setTimeout(() => navigate('/client-area'), 1500);

    } catch (error) {
      setMessage({ type: 'error', text: 'Error updating profile: ' + error.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${themeClasses.background}`}>
        <FaSpinner className="animate-spin text-4xl text-gray-500" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeClasses.background}`}>
      <ClientAreaNavbar />
      
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          {/* Header with Back Button */}
          <div className="flex items-center gap-4 mb-8">
            <Link 
              to="/client-area" 
              className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors ${themeClasses.text}`}
            >
              <FaArrowLeft />
            </Link>
            <div>
              <h1 className={`text-3xl font-bold ${themeClasses.text}`}>My Profile</h1>
              <p className={themeClasses.textSecondary}>Manage your personal information</p>
            </div>
          </div>

          {/* Feedback Message */}
          {message.text && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className={`mb-6 p-4 rounded-lg border ${
                message.type === 'success' 
                  ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300' 
                  : 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300'
              }`}
            >
              {message.text}
            </motion.div>
          )}

          {/* Form Card */}
          <div className={`p-8 rounded-xl shadow-lg border ${themeClasses.card} border-gray-100 dark:border-zinc-800`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Email (Read Only) */}
              <div>
                <label className={`block text-sm font-bold mb-2 ${themeClasses.text}`}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={user?.email}
                  disabled
                  className={`w-full p-3 rounded-lg border bg-gray-100 text-gray-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-gray-400 cursor-not-allowed`}
                />
                <p className="text-xs text-gray-400 mt-1">Email cannot be changed directly.</p>
              </div>

              {/* Full Name */}
              <div>
                <label className={`block text-sm font-bold mb-2 ${themeClasses.text}`}>
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className={`w-full p-3 pl-10 rounded-lg border focus:ring-2 focus:ring-red-500 outline-none transition-all ${themeClasses.input}`}
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className={`block text-sm font-bold mb-2 ${themeClasses.text}`}>
                  Address Line 1
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full p-3 pl-10 rounded-lg border focus:ring-2 focus:ring-red-500 outline-none transition-all ${themeClasses.input}`}
                    placeholder="123 Main St"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* City */}
                <div>
                  <label className={`block text-sm font-bold mb-2 ${themeClasses.text}`}>
                    City
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCity className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full p-3 pl-10 rounded-lg border focus:ring-2 focus:ring-red-500 outline-none transition-all ${themeClasses.input}`}
                      placeholder="Harare"
                    />
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label className={`block text-sm font-bold mb-2 ${themeClasses.text}`}>
                    Country
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaGlobe className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={`w-full p-3 pl-10 rounded-lg border focus:ring-2 focus:ring-red-500 outline-none transition-all ${themeClasses.input}`}
                      placeholder="Zimbabwe"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-zinc-800 flex justify-end gap-4">
                <Link 
                  to="/client-area"
                  className="px-6 py-3 rounded-lg text-gray-600 font-semibold hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-8 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors shadow-md disabled:opacity-50"
                >
                  {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

            </form>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileUpdate;