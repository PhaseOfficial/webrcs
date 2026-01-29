import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaTicketAlt, FaUser, FaFileInvoice, FaGlobe, FaBoxOpen, FaSpinner } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; 

// Components
import ClientAreaNavbar from '../components/ClientAreaNavbar';
import Footer from '../components/footer';
import { useThemeClasses } from '../components/ThemeAware';

// Backend
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';

const ClientArea = () => {
  const themeClasses = useThemeClasses();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // State
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({ services: 0, domains: 0, tickets: 0, invoices: 0 });
  const [recentTickets, setRecentTickets] = useState([]);
  const [overdueInvoices, setOverdueInvoices] = useState({ count: 0, total: 0.00 });

  // Formatting Helper
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-GB', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  useEffect(() => {
    if (!user) return;

    const fetchClientData = async () => {
      try {
        setLoading(true);

        // 1. Fetch Profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setProfile(profileData);

        // 2. Fetch Counts (Parallel for speed)
        // Note: Using 'tickets' table from your schema
        const [services, domains, tickets, invoices] = await Promise.all([
          supabase.from('user_services').select('id', { count: 'exact' }).eq('user_id', user.id).eq('status', 'active'),
          supabase.from('user_domains').select('id', { count: 'exact' }).eq('user_id', user.id).eq('status', 'active'),
          supabase.from('tickets').select('id', { count: 'exact' }).eq('user_id', user.id).neq('status', 'closed'), 
          supabase.from('invoices').select('id', { count: 'exact' }).eq('user_id', user.id).eq('status', 'Unpaid')
        ]);

        setStats({
          services: services.count || 0,
          domains: domains.count || 0,
          tickets: tickets.count || 0,
          invoices: invoices.count || 0,
        });

        // 3. Fetch Recent Tickets (Using your existing 'tickets' table)
        // Mapping 'updated_at' since your schema uses that instead of 'last_updated'
        const { data: ticketData } = await supabase
          .from('tickets')
          .select('*')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false })
          .limit(3);
        setRecentTickets(ticketData || []);

        // 4. Calculate Overdue Invoices
        const { data: overdueData } = await supabase
          .from('invoices')
          .select('amount')
          .eq('user_id', user.id)
          .eq('status', 'Overdue');
        
        if (overdueData) {
          const total = overdueData.reduce((acc, inv) => acc + Number(inv.amount), 0);
          setOverdueInvoices({ count: overdueData.length, total });
        }

      } catch (error) {
        console.error("Error fetching dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [user]);

  const handleLogout = async (e) => {
      e.preventDefault();
      await signOut();
      navigate('/');
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${themeClasses.background}`}>
        <FaSpinner className="animate-spin text-4xl text-gray-500" />
      </div>
    );
  }

  // Stat Cards Config
  const statCards = [
    { icon: <FaBoxOpen />, value: stats.services, label: 'Services' },
    { icon: <FaGlobe />, value: stats.domains, label: 'Domains' },
    { icon: <FaTicketAlt />, value: stats.tickets, label: 'Tickets' },
    { icon: <FaFileInvoice />, value: stats.invoices, label: 'Invoices' },
  ];

  return (
    <div className={`min-h-screen ${themeClasses.background}`}>
      <ClientAreaNavbar />
      <div className="container mx-auto px-6 py-12">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
        >
          <div>
            <h1 className={`text-3xl font-bold ${themeClasses.text}`}>
              Welcome Back, {profile?.full_name?.split(' ')[0] || user?.email?.split('@')[0]}!
            </h1>
            <p className={themeClasses.textSecondary}>
              Dashboard Overview
            </p>
          </div>
          <Link to="/open-ticket" className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors shadow-md">
            Open Ticket
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column (Main Content) */}
          <div className="md:col-span-2">
            
            {/* Knowledgebase Search */}
            <div className={`p-6 rounded-lg ${themeClasses.card} mb-8 shadow-sm`}>
              <h3 className={`text-xl font-bold mb-4 ${themeClasses.text}`}>Search Knowledgebase</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter a question here to search our knowledgebase..."
                  className={`w-full p-3 pl-10 rounded-md border ${themeClasses.input} focus:ring-2 focus:ring-red-500 outline-none`}
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Active Products/Services Message */}
            {stats.services === 0 && (
              <div className={`p-6 rounded-lg ${themeClasses.card} mb-8 shadow-sm`}>
                <h3 className={`text-xl font-bold mb-4 ${themeClasses.text}`}>Your Active Products/Services</h3>
                <p className={themeClasses.textSecondary}>
                    It appears you do not have any active products/services with us yet.
                </p>
                <Link to="/services" className="text-red-500 font-semibold mt-4 inline-block hover:underline">
                    Browse Services...
                </Link>
              </div>
            )}
            
            {/* Overdue Invoices Alert */}
            {overdueInvoices.count > 0 && (
              <div className="p-6 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 mb-8">
                <h3 className="text-xl font-bold mb-2 text-red-800 dark:text-red-200">Overdue Invoices</h3>
                <p className="text-red-700 dark:text-red-300">
                  You have {overdueInvoices.count} overdue invoice(s) with a total balance due of 
                  <span className="font-bold"> US${overdueInvoices.total.toFixed(2)}</span>. 
                  Pay them now to avoid any interruptions in service.
                </p>
                <Link to="/billing" className="mt-3 inline-block bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700">
                    Pay Now
                </Link>
              </div>
            )}

            {/* Recent Support Tickets */}
            <div className={`p-6 rounded-lg ${themeClasses.card} shadow-sm`}>
              <h3 className={`text-xl font-bold mb-4 ${themeClasses.text}`}>Recent Support Tickets</h3>
              {recentTickets.length > 0 ? (
                <ul>
                  {recentTickets.map(ticket => (
                    <li key={ticket.id} className={`border-b ${themeClasses.border} py-4 last:border-0`}>
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                        <div>
                          <p className={`font-bold ${themeClasses.text} hover:text-red-500 cursor-pointer`}>
                             #{ticket.ticket_number} - {ticket.subject}
                          </p>
                          <p className={`text-sm ${themeClasses.textSecondary}`}>
                            Last Updated: {formatDate(ticket.updated_at)}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold w-fit uppercase ${
                            ticket.status === 'open' ? 'bg-green-100 text-green-700' : 
                            ticket.status === 'closed' ? 'bg-gray-100 text-gray-700' :
                            'bg-blue-100 text-blue-700'
                        }`}>
                          {ticket.status}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={themeClasses.textSecondary}>No recent tickets found.</p>
              )}
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <div>
            {/* Your Info */}
            <div className={`p-6 rounded-lg ${themeClasses.card} mb-8 shadow-sm`}>
              <h3 className={`text-xl font-bold mb-4 ${themeClasses.text}`}>Your Info</h3>
              <div className="flex items-start mb-4">
                <div className="bg-gray-100 dark:bg-zinc-800 p-3 rounded-full mr-4">
                    <FaUser className={`text-xl ${themeClasses.text}`} />
                </div>
                <div>
                  <p className={`font-bold text-lg ${themeClasses.text}`}>
                    {profile?.full_name || user?.email}
                  </p>
                  <p className={themeClasses.textSecondary}>{profile?.address || 'No address set'}</p>
                  <p className={themeClasses.textSecondary}>{profile?.city}</p>
                  <p className={themeClasses.textSecondary}>{profile?.country}</p>
                  <Link to="/client-area/profile" className="text-xs text-red-500 hover:underline mt-2 block">
                    Update Profile
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {statCards.map(stat => (
                <div key={stat.label} className={`p-4 rounded-lg ${themeClasses.card} text-center shadow-sm hover:-translate-y-1 transition-transform`}>
                  <div className={`text-2xl mb-2 flex justify-center text-red-500`}>
                     {stat.icon}
                  </div>
                  <div className={`text-3xl font-bold ${themeClasses.text}`}>{stat.value}</div>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Shortcuts */}
            <div className={`p-6 rounded-lg ${themeClasses.card} shadow-sm`}>
              <h3 className={`text-xl font-bold mb-4 ${themeClasses.text}`}>Shortcuts</h3>
              <ul className="space-y-2">
                <li>
                    <Link to="/services" className="text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2">
                        Order New Services
                    </Link>
                </li>
                <li>
                    <Link to="/domains" className="text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2">
                        Register a New Domain
                    </Link>
                </li>
                <li className="pt-2 border-t border-gray-100 dark:border-zinc-800">
                    <button onClick={handleLogout} className="text-red-500 font-semibold hover:text-red-600 flex items-center gap-2">
                        Logout
                    </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ClientArea;