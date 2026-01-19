import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { FaEnvelope, FaEnvelopeOpen, FaPhone, FaMapMarkerAlt, FaUser, FaReply, FaTrash, FaFilter } from 'react-icons/fa';

export default function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'new', 'read'
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMessages();
  }, [filter]);

  const fetchMessages = async () => {
    try {
      let query = supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply status filter
      if (filter === 'new') {
        query = query.eq('status', 'new');
      } else if (filter === 'read') {
        query = query.eq('status', 'read');
      }

      const { data, error } = await query;

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateMessageStatus = async (messageId, newStatus) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status: newStatus })
        .eq('id', messageId);

      if (error) throw error;
      
      // Update local state
      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, status: newStatus } : msg
      ));
      
      // Update selected message if open
      if (selectedMessage?.id === messageId) {
        setSelectedMessage({ ...selectedMessage, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating message status:', error);
    }
  };

  const deleteMessage = async (messageId) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', messageId);

      if (error) throw error;
      
      // Remove from local state
      setMessages(messages.filter(msg => msg.id !== messageId));
      
      // Close detail view if open
      if (selectedMessage?.id === messageId) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  // Filter messages based on search term
  const filteredMessages = messages.filter(message =>
    message.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.message?.toLowerCase().includes(searchTerm.toLowerCase())
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
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center p-12">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading messages...</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-full">
      {/* Messages List */}
      <div className={`${selectedMessage ? 'w-1/2' : 'w-full'} border-r border-gray-200`}>
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
                <option value="all">All Messages</option>
                <option value="new">New</option>
                <option value="read">Read</option>
              </select>
            </div>

            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name, email, or message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex space-x-4 text-sm">
            <span className="text-gray-600">
              Total: <span className="font-semibold">{messages.length}</span>
            </span>
            <span className="text-blue-600">
              New: <span className="font-semibold">{messages.filter(m => m.status === 'new').length}</span>
            </span>
            <span className="text-green-600">
              Read: <span className="font-semibold">{messages.filter(m => m.status === 'read').length}</span>
            </span>
          </div>
        </div>

        {/* Messages List */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          {filteredMessages.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FaEnvelope className="mx-auto text-4xl text-gray-300 mb-4" />
              <p>No messages found</p>
            </div>
          ) : (
            filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`border-b border-gray-100 p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedMessage?.id === message.id ? 'bg-blue-50 border-blue-200' : ''
                } ${message.status === 'new' ? 'bg-blue-25 border-l-4 border-l-blue-500' : ''}`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(message.status)}`}>
                      {message.status}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getSourceColor(message.source)}`}>
                      {message.source}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(message.created_at).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-center space-x-3 mb-2">
                  <FaUser className="text-gray-400 flex-shrink-0" />
                  <span className="font-semibold text-gray-900 truncate">{message.name}</span>
                </div>

                <div className="flex items-center space-x-3 mb-1">
                  <FaEnvelope className="text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-600 truncate">{message.email}</span>
                </div>

                {message.phone && (
                  <div className="flex items-center space-x-3 mb-1">
                    <FaPhone className="text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{message.phone}</span>
                  </div>
                )}

                {message.postcode && (
                  <div className="flex items-center space-x-3 mb-2">
                    <FaMapMarkerAlt className="text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{message.postcode}</span>
                  </div>
                )}

                <p className="text-sm text-gray-700 line-clamp-2 mt-2">
                  {message.message}
                </p>

                {message.subscribe && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Subscribed to newsletter
                    </span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Message Detail View */}
      {selectedMessage && (
        <div className="w-1/2 bg-white">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-900">Message Details</h2>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 mb-6">
              {selectedMessage.status === 'new' ? (
                <button
                  onClick={() => updateMessageStatus(selectedMessage.id, 'read')}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FaEnvelopeOpen className="text-sm" />
                  <span>Mark as Read</span>
                </button>
              ) : (
                <button
                  onClick={() => updateMessageStatus(selectedMessage.id, 'new')}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaEnvelope className="text-sm" />
                  <span>Mark as New</span>
                </button>
              )}

              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'Your message'}&body=Hi ${selectedMessage.name},%0D%0A%0D%0A`}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <FaReply className="text-sm" />
                <span>Reply</span>
              </a>

              <button
                onClick={() => deleteMessage(selectedMessage.id)}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <FaTrash className="text-sm" />
                <span>Delete</span>
              </button>
            </div>

            {/* Message Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <p className="text-gray-900">{selectedMessage.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-gray-900">{selectedMessage.email}</p>
                </div>
              </div>

              {selectedMessage.phone && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <p className="text-gray-900">{selectedMessage.phone}</p>
                </div>
              )}

              {selectedMessage.postcode && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postcode</label>
                  <p className="text-gray-900">{selectedMessage.postcode}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedMessage.status)}`}>
                    {selectedMessage.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                  <span className={`px-2 py-1 text-xs rounded-full ${getSourceColor(selectedMessage.source)}`}>
                    {selectedMessage.source}
                  </span>
                </div>
              </div>

              {selectedMessage.subscribe && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Newsletter</label>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    Subscribed
                  </span>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Received</label>
                <p className="text-gray-600">
                  {new Date(selectedMessage.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}