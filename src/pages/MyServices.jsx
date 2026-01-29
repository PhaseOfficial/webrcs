import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBoxOpen, FaShoppingCart, FaPlus, FaFilter, FaSpinner, FaSearch, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import ClientAreaNavbar from '../components/ClientAreaNavbar';
import Footer from '../components/footer';
import { useThemeClasses } from '../components/ThemeAware';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';

const MyServices = () => {
  const themeClasses = useThemeClasses();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fetch Data
  useEffect(() => {
    if (!user) return;

    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('user_services')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setServices(data || []);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [user]);

  // --- Derived Data & Pagination Logic ---
  const filteredServices = filterStatus === 'All' 
    ? services 
    : services.filter(s => s.status.toLowerCase() === filterStatus.toLowerCase());

  const totalEntries = filteredServices.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredServices.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate Counts
  const counts = {
    active: services.filter(s => s.status === 'active').length,
    pending: services.filter(s => s.status === 'pending').length,
    suspended: services.filter(s => s.status === 'suspended').length,
    terminated: services.filter(s => s.status === 'terminated').length,
    cancelled: services.filter(s => s.status === 'cancelled').length,
  };

  // Helper formatting
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'suspended': return 'bg-red-100 text-red-700 border-red-200';
      case 'terminated': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
          {/* Breadcrumbs */}
          <div className="text-sm mb-6 text-gray-500">
             <Link to="/client-area" className="hover:text-red-500">Portal Home</Link> 
             <span className="mx-2">/</span>
             <Link to="/client-area" className="hover:text-red-500">Client Area</Link>
             <span className="mx-2">/</span>
             <span className={`${themeClasses.text}`}>My Products & Services</span>
          </div>

          <h1 className={`text-3xl font-bold mb-8 ${themeClasses.text}`}>My Products & Services</h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* --- LEFT: ACTIONS SIDEBAR --- */}
            <div className="lg:col-span-1 space-y-6">
               <div className={`p-6 rounded-xl border ${themeClasses.card} border-gray-200 dark:border-zinc-800`}>
                  <h3 className={`font-bold mb-4 flex items-center gap-2 ${themeClasses.text}`}>
                     <FaFilter /> Actions
                  </h3>
                  <div className="space-y-3">
                     <Link to="/services" className="flex items-center gap-3 p-3 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors font-medium">
                        <FaPlus size={14} /> Place a New Order
                     </Link>
                     <Link to="/services" className="flex items-center gap-3 p-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors font-medium">
                        <FaShoppingCart size={14} /> View Available Addons
                     </Link>
                  </div>
               </div>
            </div>

            {/* --- RIGHT: MAIN CONTENT --- */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Status Overview Cards */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                 {[
                    { label: 'Active', count: counts.active, color: 'border-green-500 text-green-600' },
                    { label: 'Pending', count: counts.pending, color: 'border-yellow-500 text-yellow-600' },
                    { label: 'Suspended', count: counts.suspended, color: 'border-red-500 text-red-600' },
                    { label: 'Terminated', count: counts.terminated, color: 'border-gray-500 text-gray-600' },
                    { label: 'Cancelled', count: counts.cancelled, color: 'border-gray-400 text-gray-500' },
                 ].map(stat => (
                    <button 
                       key={stat.label}
                       onClick={() => setFilterStatus(stat.label)}
                       className={`p-4 rounded-lg border-b-4 bg-white dark:bg-zinc-900 shadow-sm hover:-translate-y-1 transition-transform text-center ${stat.color} ${filterStatus === stat.label ? 'ring-2 ring-offset-2 ring-gray-200 dark:ring-zinc-700' : ''}`}
                    >
                       <div className="text-2xl font-bold">{stat.count}</div>
                       <div className="text-xs font-medium uppercase tracking-wider text-gray-500">{stat.label}</div>
                    </button>
                 ))}
              </div>

              {/* Data Table Container */}
              <div className={`rounded-xl border shadow-sm ${themeClasses.card} border-gray-200 dark:border-zinc-800 overflow-hidden`}>
                 
                 {/* Table Controls */}
                 <div className="p-4 border-b border-gray-100 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                       Show 
                       <select 
                          value={itemsPerPage} 
                          onChange={(e) => setItemsPerPage(Number(e.target.value))}
                          className={`p-1 rounded border ${themeClasses.input} bg-transparent outline-none`}
                       >
                          <option value="10">10</option>
                          <option value="25">25</option>
                          <option value="50">50</option>
                          <option value={totalEntries || 1}>All</option>
                       </select>
                       entries
                    </div>
                    {/* Optional Search if needed later */}
                 </div>

                 {/* The Table */}
                 <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                       <thead>
                          <tr className="bg-gray-50 dark:bg-zinc-800/50 text-xs uppercase tracking-wider text-gray-500">
                             <th className="p-4 font-semibold">Product/Service</th>
                             <th className="p-4 font-semibold">Pricing</th>
                             <th className="p-4 font-semibold">Next Due Date</th>
                             <th className="p-4 font-semibold">Status</th>
                             <th className="p-4 font-semibold text-right"></th>
                          </tr>
                       </thead>
                       <tbody className={`text-sm ${themeClasses.text}`}>
                          {currentItems.length > 0 ? (
                             currentItems.map((service) => (
                                <tr key={service.id} className="border-b border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors">
                                   <td className="p-4 font-medium">
                                      <div className="font-bold">{service.name}</div>
                                      <div className="text-xs text-gray-500">{service.domain_name || 'No domain attached'}</div>
                                   </td>
                                   <td className="p-4">
                                      <div>{service.price || '-'}</div>
                                      <div className="text-xs text-gray-500">{service.billing_cycle}</div>
                                   </td>
                                   <td className="p-4 text-gray-600 dark:text-gray-400">
                                      {formatDate(service.next_due_date)}
                                   </td>
                                   <td className="p-4">
                                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(service.status)}`}>
                                         {service.status}
                                      </span>
                                   </td>
                                   <td className="p-4 text-right">
                                      <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded text-xs font-semibold transition-colors">
                                         Manage
                                      </button>
                                   </td>
                                </tr>
                             ))
                          ) : (
                             <tr>
                                <td colSpan="5" className="p-12 text-center text-gray-500">
                                   <div className="flex flex-col items-center justify-center">
                                      <div className="w-12 h-12 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-3">
                                         <FaBoxOpen className="text-gray-400" />
                                      </div>
                                      <p className="font-medium">No Records Found</p>
                                      <p className="text-xs mt-1">You don't have any {filterStatus !== 'All' ? filterStatus.toLowerCase() : ''} services yet.</p>
                                   </div>
                                </td>
                             </tr>
                          )}
                       </tbody>
                    </table>
                 </div>

                 {/* Pagination Footer */}
                 <div className="p-4 border-t border-gray-100 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <div>
                       Showing {totalEntries === 0 ? 0 : indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalEntries)} of {totalEntries} entries
                    </div>
                    
                    <div className="flex gap-2">
                       <button 
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1 || totalEntries === 0}
                          className="px-3 py-1 rounded border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                       >
                          Previous
                       </button>
                       <button 
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages || totalEntries === 0}
                          className="px-3 py-1 rounded border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                       >
                          Next
                       </button>
                    </div>
                 </div>

              </div>

            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default MyServices;