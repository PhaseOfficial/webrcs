import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { 
  FaEnvelope, 
  FaEnvelopeOpen, 
  FaUser, 
  FaFilter,
  FaSearch,
  FaReply,
  FaTrash,
  FaPhone,
  FaGlobe,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa';

export default function Contact() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'new', 'read', 'subscribed'
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchContacts();
  }, [filter]);

  const fetchContacts = async () => {
    try {
      let query = supabase
        .from('contact')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply status filter
      if (filter === 'new') {
        query = query.eq('status', 'new');
      } else if (filter === 'read') {
        query = query.eq('status', 'read');
      } else if (filter === 'subscribed') {
        query = query.eq('subscribe', true);
      }

      const { data, error } = await query;

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateContactStatus = async (contactId, newStatus) => {
    try {
      const { error } = await supabase
        .from('contact')
        .update({ status: newStatus })
        .eq('id', contactId);

      if (error) throw error;
      
      // Update local state
      setContacts(contacts.map(contact => 
        contact.id === contactId ? { ...contact, status: newStatus } : contact
      ));
      
      // Update selected contact if open
      if (selectedContact?.id === contactId) {
        setSelectedContact({ ...selectedContact, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating contact status:', error);
    }
  };

  const toggleSubscription = async (contactId, currentSubscription) => {
    try {
      const { error } = await supabase
        .from('contact')
        .update({ subscribe: !currentSubscription })
        .eq('id', contactId);

      if (error) throw error;
      
      setContacts(contacts.map(contact => 
        contact.id === contactId ? { ...contact, subscribe: !currentSubscription } : contact
      ));
      
      if (selectedContact?.id === contactId) {
        setSelectedContact({ ...selectedContact, subscribe: !currentSubscription });
      }
    } catch (error) {
      console.error('Error updating subscription:', error);
    }
  };

  const deleteContact = async (contactId) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;

    try {
      const { error } = await supabase
        .from('contact')
        .delete()
        .eq('id', contactId);

      if (error) throw error;
      
      setContacts(contacts.filter(contact => contact.id !== contactId));
      
      if (selectedContact?.id === contactId) {
        setSelectedContact(null);
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  // Parse contact info (could be email, phone, or other contact method)
  const parseContactInfo = (contactInfo) => {
    if (!contactInfo) return { type: 'unknown', value: '' };
    
    // Check if it's an email
    if (contactInfo.includes('@')) {
      return { type: 'email', value: contactInfo };
    }
    
    // Check if it's a phone number (simple check)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (phoneRegex.test(contactInfo.replace(/[\s\-\(\)]/g, ''))) {
      return { type: 'phone', value: contactInfo };
    }
    
    // Default to generic contact
    return { type: 'other', value: contactInfo };
  };

  // Filter contacts based on search term
  const filteredContacts = contacts.filter(contact =>
    contact.contact_info?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.source?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'read': return 'bg-green-100 text-green-800 border-green-200';
      case 'archived': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSourceColor = (source) => {
    switch (source) {
      case 'website': return 'bg-purple-100 text-purple-800';
      case 'landing-page': return 'bg-orange-100 text-orange-800';
      case 'referral': return 'bg-pink-100 text-pink-800';
      case 'social': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getContactIcon = (type) => {
    switch (type) {
      case 'email': return <FaEnvelope className="text-blue-500" />;
      case 'phone': return <FaPhone className="text-green-500" />;
      default: return <FaUser className="text-gray-500" />;
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center p-12">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading contacts...</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-full">
      {/* Contacts List */}
      <div className={`${selectedContact ? 'w-1/2' : 'w-full'} border-r border-gray-200`}>
        {/* Filters and Search */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-400" />
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Contacts</option>
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="subscribed">Subscribed</option>
              </select>
            </div>

            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by contact info or source..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex space-x-4 text-sm">
            <span className="text-gray-600">
              Total: <span className="font-semibold">{contacts.length}</span>
            </span>
            <span className="text-blue-600">
              New: <span className="font-semibold">{contacts.filter(c => c.status === 'new').length}</span>
            </span>
            <span className="text-green-600">
              Read: <span className="font-semibold">{contacts.filter(c => c.status === 'read').length}</span>
            </span>
            <span className="text-purple-600">
              Subscribed: <span className="font-semibold">{contacts.filter(c => c.subscribe).length}</span>
            </span>
          </div>
        </div>

        {/* Contacts List */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          {filteredContacts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FaUser className="mx-auto text-4xl text-gray-300 mb-4" />
              <p>No contacts found</p>
              {searchTerm && (
                <p className="text-sm mt-2">Try adjusting your search terms</p>
              )}
            </div>
          ) : (
            filteredContacts.map((contact) => {
              const contactInfo = parseContactInfo(contact.contact_info);
              return (
                <div
                  key={contact.id}
                  className={`border-b border-gray-100 p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedContact?.id === contact.id ? 'bg-blue-50 border-blue-200' : ''
                  } ${contact.status === 'new' ? 'bg-blue-25 border-l-4 border-l-blue-500' : ''}`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(contact.status)}`}>
                        {contact.status}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getSourceColor(contact.source)}`}>
                        {contact.source}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 text-right">
                      <div>{new Date(contact.created_at).toLocaleDateString()}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 mb-3">
                    {getContactIcon(contactInfo.type)}
                    <div>
                      <div className="font-semibold text-gray-900 capitalize">
                        {contactInfo.type}
                      </div>
                      <div className="text-sm text-gray-600 truncate">
                        {contactInfo.value}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      {contact.subscribe ? (
                        <span className="inline-flex items-center text-xs text-green-600">
                          <FaCheckCircle className="mr-1" />
                          Subscribed
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-xs text-gray-500">
                          <FaTimesCircle className="mr-1" />
                          Not Subscribed
                        </span>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteContact(contact.id);
                      }}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Contact Detail View */}
      {selectedContact && (
        <div className="w-1/2 bg-white">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-bold text-gray-900">Contact Details</h2>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 mb-6">
              {selectedContact.status === 'new' ? (
                <button
                  onClick={() => updateContactStatus(selectedContact.id, 'read')}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FaEnvelopeOpen className="text-sm" />
                  <span>Mark as Read</span>
                </button>
              ) : (
                <button
                  onClick={() => updateContactStatus(selectedContact.id, 'new')}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaEnvelope className="text-sm" />
                  <span>Mark as New</span>
                </button>
              )}

              {selectedContact.contact_info?.includes('@') && (
                <a
                  href={`mailto:${selectedContact.contact_info}`}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <FaReply className="text-sm" />
                  <span>Contact</span>
                </a>
              )}

              <button
                onClick={() => deleteContact(selectedContact.id)}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <FaTrash className="text-sm" />
                <span>Delete</span>
              </button>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <FaUser className="mr-2 text-blue-600" />
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Method</label>
                    <div className="flex items-center space-x-2">
                      {getContactIcon(parseContactInfo(selectedContact.contact_info).type)}
                      <span className="text-gray-900 font-medium capitalize">
                        {parseContactInfo(selectedContact.contact_info).type}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Info</label>
                    <p className="text-gray-900 font-mono bg-white p-2 rounded border">
                      {selectedContact.contact_info}
                    </p>
                  </div>
                </div>
              </div>

              {/* Metadata */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <FaGlobe className="mr-2 text-green-600" />
                  Metadata
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <span className={`px-3 py-1 text-sm rounded-full border ${getStatusColor(selectedContact.status)}`}>
                      {selectedContact.status}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                    <span className={`px-3 py-1 text-sm rounded-full ${getSourceColor(selectedContact.source)}`}>
                      {selectedContact.source}
                    </span>
                  </div>
                </div>
              </div>

              {/* Subscription Status */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Subscription</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-700">Newsletter Subscription</p>
                    <p className="text-xs text-gray-500">User opted in for marketing communications</p>
                  </div>
                  <button
                    onClick={() => toggleSubscription(selectedContact.id, selectedContact.subscribe)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      selectedContact.subscribe
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {selectedContact.subscribe ? (
                      <>
                        <FaTimesCircle />
                        <span>Unsubscribe</span>
                      </>
                    ) : (
                      <>
                        <FaCheckCircle />
                        <span>Subscribe</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Timeline</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created</span>
                    <span className="text-gray-900">
                      {new Date(selectedContact.created_at).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contact ID</span>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {selectedContact.id.substring(0, 8)}...
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}