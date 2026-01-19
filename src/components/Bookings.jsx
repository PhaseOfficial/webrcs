import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { 
  FaCalendar, 
  FaClock, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaFilter,
  FaEye,
  FaTrash,
  FaCalendarCheck,
  FaSort,
  FaSearch
} from 'react-icons/fa';

export default function OnlineAssessments() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'past'
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    fetchAssessments();
  }, [filter, sortField, sortOrder]);

  const fetchAssessments = async () => {
    try {
      let query = supabase
        .from('online_assessments')
        .select('*')
        .order(sortField, { ascending: sortOrder === 'asc' });

      // Apply date filters
      const today = new Date().toISOString().split('T')[0];
      if (filter === 'upcoming') {
        query = query.gte('date', today);
      } else if (filter === 'past') {
        query = query.lt('date', today);
      }

      const { data, error } = await query;

      if (error) throw error;
      setAssessments(data || []);
    } catch (error) {
      console.error('Error fetching assessments:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAssessment = async (assessmentId) => {
    if (!confirm('Are you sure you want to delete this assessment booking?')) return;

    try {
      const { error } = await supabase
        .from('online_assessments')
        .delete()
        .eq('id', assessmentId);

      if (error) throw error;
      
      setAssessments(assessments.filter(assessment => assessment.id !== assessmentId));
      
      if (selectedAssessment?.id === assessmentId) {
        setSelectedAssessment(null);
      }
    } catch (error) {
      console.error('Error deleting assessment:', error);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const getStatus = (date) => {
    const today = new Date();
    const assessmentDate = new Date(date);
    today.setHours(0, 0, 0, 0);
    assessmentDate.setHours(0, 0, 0, 0);

    if (assessmentDate < today) return 'past';
    if (assessmentDate.getTime() === today.getTime()) return 'today';
    return 'upcoming';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'today': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'upcoming': return 'bg-green-100 text-green-800 border-green-200';
      case 'past': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Filter assessments based on search term
  const filteredAssessments = assessments.filter(assessment =>
    assessment.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assessment.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assessment.phone?.includes(searchTerm) ||
    assessment.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isUpcoming = (dateString) => {
    const today = new Date();
    const assessmentDate = new Date(dateString);
    return assessmentDate >= today;
  };

  if (loading) return (
    <div className="flex items-center justify-center p-12">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading assessments...</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-full">
      {/* Assessments List */}
      <div className={`${selectedAssessment ? 'w-1/2' : 'w-full'} border-r border-gray-200`}>
        {/* Header with Filters and Search */}
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
                <option value="all">All Assessments</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </div>

            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, phone, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex space-x-4 text-sm">
            <span className="text-gray-600">
              Total: <span className="font-semibold">{assessments.length}</span>
            </span>
            <span className="text-green-600">
              Upcoming: <span className="font-semibold">{assessments.filter(a => isUpcoming(a.date)).length}</span>
            </span>
            <span className="text-gray-600">
              Past: <span className="font-semibold">{assessments.filter(a => !isUpcoming(a.date)).length}</span>
            </span>
          </div>
        </div>

        {/* Assessments List */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          {filteredAssessments.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FaCalendarCheck className="mx-auto text-4xl text-gray-300 mb-4" />
              <p>No assessments found</p>
              {searchTerm && (
                <p className="text-sm mt-2">Try adjusting your search terms</p>
              )}
            </div>
          ) : (
            filteredAssessments.map((assessment) => {
              const status = getStatus(assessment.date);
              return (
                <div
                  key={assessment.id}
                  className={`border-b border-gray-100 p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedAssessment?.id === assessment.id ? 'bg-blue-50 border-blue-200' : ''
                  } ${status === 'today' ? 'bg-orange-25 border-l-4 border-l-orange-500' : ''}`}
                  onClick={() => setSelectedAssessment(assessment)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(status)}`}>
                        {status === 'today' ? 'Today' : status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 text-right">
                      <div>{formatDate(assessment.date)}</div>
                      <div className="font-semibold">{assessment.time}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 mb-2">
                    <FaUser className="text-gray-400 flex-shrink-0" />
                    <span className="font-semibold text-gray-900">{assessment.full_name}</span>
                  </div>

                  <div className="flex items-center space-x-3 mb-1">
                    <FaEnvelope className="text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-600 truncate">{assessment.email}</span>
                  </div>

                  <div className="flex items-center space-x-3 mb-1">
                    <FaPhone className="text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{assessment.phone}</span>
                  </div>

                  <div className="flex items-center space-x-3 mb-2">
                    <FaMapMarkerAlt className="text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-600">
                      {assessment.city}, {assessment.postal}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <div className="text-xs text-gray-500">
                      Booked: {new Date(assessment.created_at).toLocaleDateString()}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteAssessment(assessment.id);
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

      {/* Assessment Detail View */}
      {selectedAssessment && (
        <div className="w-1/2 bg-white">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-bold text-gray-900">Assessment Details</h2>
              <button
                onClick={() => setSelectedAssessment(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 mb-6">
              <a
                href={`mailto:${selectedAssessment.email}?subject=Assessment Confirmation - ${formatDate(selectedAssessment.date)} at ${selectedAssessment.time}&body=Hi ${selectedAssessment.full_name},%0D%0A%0D%0AThis is a confirmation for your assessment scheduled on ${formatDate(selectedAssessment.date)} at ${selectedAssessment.time}.`}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaEnvelope className="text-sm" />
                <span>Send Confirmation</span>
              </a>

              <button
                onClick={() => deleteAssessment(selectedAssessment.id)}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <FaTrash className="text-sm" />
                <span>Delete</span>
              </button>
            </div>

            {/* Assessment Details */}
            <div className="space-y-6">
              {/* Schedule Section */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <FaCalendarCheck className="mr-2 text-blue-600" />
                  Schedule
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <div className="flex items-center space-x-2">
                      <FaCalendar className="text-gray-400" />
                      <span className="text-gray-900 font-medium">
                        {formatDate(selectedAssessment.date)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <div className="flex items-center space-x-2">
                      <FaClock className="text-gray-400" />
                      <span className="text-gray-900 font-medium">{selectedAssessment.time}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <span className={`px-3 py-1 text-sm rounded-full border ${getStatusColor(getStatus(selectedAssessment.date))}`}>
                    {getStatus(selectedAssessment.date) === 'today' ? 'Scheduled for Today' : getStatus(selectedAssessment.date)}
                  </span>
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Personal Information</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <p className="text-gray-900">{selectedAssessment.full_name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <p className="text-gray-900">{selectedAssessment.email}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <p className="text-gray-900">{selectedAssessment.phone}</p>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Address Information</h3>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                    <p className="text-gray-900">{selectedAssessment.address1}</p>
                  </div>
                  
                  {selectedAssessment.address2 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                      <p className="text-gray-900">{selectedAssessment.address2}</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <p className="text-gray-900">{selectedAssessment.city}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                      <p className="text-gray-900">{selectedAssessment.postal}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Information */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Booking Information</h3>
                <div className="text-sm text-gray-600">
                  <p>Booked on: {new Date(selectedAssessment.created_at).toLocaleString()}</p>
                  <p className="mt-1">Assessment ID: <code className="bg-gray-100 px-1 rounded">{selectedAssessment.id}</code></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}