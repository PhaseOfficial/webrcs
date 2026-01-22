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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

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
      <Card className={`${selectedAssessment ? 'w-1/2' : 'w-full'} border-r`}>
        <CardHeader>
          <CardTitle>Online Assessments</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-400" />
              <Select onValueChange={setFilter} defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Assessments</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="past">Past</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name, email, phone, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex space-x-4 text-sm mt-4">
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
        </CardHeader>
        <CardContent className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
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
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteAssessment(assessment.id);
                      }}
                    >
                      <FaTrash className="mr-2" /> Delete
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>

      {/* Assessment Detail View */}
      {selectedAssessment && (
        <Dialog open={!!selectedAssessment} onOpenChange={() => setSelectedAssessment(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Assessment Details</DialogTitle>
              <DialogDescription>
                Details of the selected online assessment.
              </DialogDescription>
            </DialogHeader>
            <div className="p-6">
            

            {/* Action Buttons */}
            <div className="flex space-x-2 mb-6">
              <Button asChild>
                <a
                  href={`mailto:${selectedAssessment.email}?subject=Assessment Confirmation - ${formatDate(selectedAssessment.date)} at ${selectedAssessment.time}&body=Hi ${selectedAssessment.full_name},%0D%0A%0D%0AThis is a confirmation for your assessment scheduled on ${formatDate(selectedAssessment.date)} at ${selectedAssessment.time}.`}
                  className="flex items-center space-x-2"
                >
                  <FaEnvelope className="text-sm" />
                  <span>Send Confirmation</span>
                </a>
              </Button>

              <Button
                variant="destructive"
                onClick={() => deleteAssessment(selectedAssessment.id)}
              >
                <FaTrash className="mr-2" />
                <span>Delete</span>
              </Button>
            </div>

            {/* Assessment Details */}
            <div className="space-y-6">
              {/* Schedule Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FaCalendarCheck className="mr-2 text-blue-600" />
                    Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Date</p>
                      <div className="flex items-center space-x-2">
                        <FaCalendar className="text-gray-400" />
                        <span className="text-gray-900 font-medium">
                          {formatDate(selectedAssessment.date)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Time</p>
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
                </CardContent>
              </Card>

              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Full Name</p>
                        <p className="text-gray-900">{selectedAssessment.full_name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Email</p>
                        <p className="text-gray-900">{selectedAssessment.email}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Phone</p>
                      <p className="text-gray-900">{selectedAssessment.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Address Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Address Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Address Line 1</p>
                      <p className="text-gray-900">{selectedAssessment.address1}</p>
                    </div>
                    
                    {selectedAssessment.address2 && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Address Line 2</p>
                        <p className="text-gray-900">{selectedAssessment.address2}</p>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">City</p>
                        <p className="text-gray-900">{selectedAssessment.city}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Postal Code</p>
                        <p className="text-gray-900">{selectedAssessment.postal}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Booking Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Booking Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600">
                    <p>Booked on: {new Date(selectedAssessment.created_at).toLocaleString()}</p>
                    <p className="mt-1">Assessment ID: <code className="bg-gray-100 px-1 rounded">{selectedAssessment.id}</code></p>
                  </div>
                </CardContent>
              </Card>
            </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}