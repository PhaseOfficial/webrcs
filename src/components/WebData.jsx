import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import ReactCountryFlag from "react-country-flag";
import {
  FaChartLine,
  FaUsers,
  FaMousePointer,
  FaGlobeAmericas,
  FaCalendar,
  FaTable,
  FaChartBar,
  FaFilter,
  FaBullseye
} from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function WebsiteAnalytics() {
  const [activeView, setActiveView] = useState('overview');
  const [timeRange, setTimeRange] = useState('7d');
  const [data, setData] = useState({
    visits: [],
    events: [],
    visitors: []
  });
  const [stats, setStats] = useState({
    totalVisits: 0,
    totalEvents: 0,
    uniqueVisitors: 0,
    avgVisitsPerDay: 0,
    topPages: [],
    topCountries: [],
    eventTypes: [],
    topEventTargets: []
  });
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [tableType, setTableType] = useState('visits');

  useEffect(() => {
    fetchData();
  }, [timeRange]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [visitsData, eventsData, visitorsData] = await Promise.all([
        fetchWebsiteVisits(),
        fetchWebsiteEvents(),
        fetchVisitors()
      ]);

      setData({
        visits: visitsData,
        events: eventsData,
        visitors: visitorsData
      });

      calculateStats(visitsData, eventsData, visitorsData);
      setTableData(visitsData);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWebsiteVisits = async () => {
    let query = supabase
      .from('website_visits')
      .select('*')
      .order('created_at', { ascending: false });

    if (timeRange !== 'all') {
      const date = new Date();
      switch (timeRange) {
        case '24h':
          date.setDate(date.getDate() - 1);
          break;
        case '7d':
          date.setDate(date.getDate() - 7);
          break;
        case '30d':
          date.setDate(date.getDate() - 30);
          break;
      }
      query = query.gte('created_at', date.toISOString());
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  };

  const fetchWebsiteEvents = async () => {
    let query = supabase
      .from('website_events')
      .select('*')
      .order('created_at', { ascending: false });

    if (timeRange !== 'all') {
      const date = new Date();
      switch (timeRange) {
        case '24h':
          date.setDate(date.getDate() - 1);
          break;
        case '7d':
          date.setDate(date.getDate() - 7);
          break;
        case '30d':
          date.setDate(date.getDate() - 30);
          break;
      }
      query = query.gte('created_at', date.toISOString());
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  };

  const fetchVisitors = async () => {
    let query = supabase
      .from('visitors')
      .select('*')
      .order('created_at', { ascending: false });

    if (timeRange !== 'all') {
      const date = new Date();
      switch (timeRange) {
        case '24h':
          date.setDate(date.getDate() - 1);
          break;
        case '7d':
          date.setDate(date.getDate() - 7);
          break;
        case '30d':
          date.setDate(date.getDate() - 30);
          break;
      }
      query = query.gte('created_at', date.toISOString());
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  };

  const calculateStats = (visits, events, visitors) => {
    // Calculate total stats
    const totalVisits = visits.length;
    const totalEvents = events.length;
    const uniqueVisitors = visitors.length;

    // Calculate average visits per day
    const days = timeRange === '24h' ? 1 : timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 1;
    const avgVisitsPerDay = totalVisits / days;

    // Top pages
    const pageCounts = visits.reduce((acc, visit) => {
      acc[visit.page_url] = (acc[visit.page_url] || 0) + 1;
      return acc;
    }, {});
    const topPages = Object.entries(pageCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([url, count]) => ({ url, count }));

    // Top countries
    const countryCounts = visits.reduce((acc, visit) => {
      if (visit.country) {
        acc[visit.country] = (acc[visit.country] || 0) + 1;
      }
      return acc;
    }, {});
    const topCountries = Object.entries(countryCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([country, count]) => ({ country, count }));

    // Event types breakdown
    const eventTypeCounts = events.reduce((acc, event) => {
      acc[event.event_type] = (acc[event.event_type] || 0) + 1;
      return acc;
    }, {});
    const eventTypes = Object.entries(eventTypeCounts).map(([type, count]) => ({ type, count }));

    // Event targets breakdown
    const eventTargetCounts = events.reduce((acc, event) => {
      if (event.event_target) {
        acc[event.event_target] = (acc[event.event_target] || 0) + 1;
      }
      return acc;
    }, {});
    const topEventTargets = Object.entries(eventTargetCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([target, count]) => ({ target, count }));

    setStats({
      totalVisits,
      totalEvents,
      uniqueVisitors,
      avgVisitsPerDay,
      topPages,
      topCountries,
      eventTypes,
      topEventTargets
    });
  };

  const handleTableTypeChange = (type) => {
    setTableType(type);
    setTableData(data[type === 'visits' ? 'visits' : type === 'events' ? 'events' : 'visitors']);
  };

  const getTimeRangeLabel = () => {
    switch (timeRange) {
      case '24h': return 'Last 24 Hours';
      case '7d': return 'Last 7 Days';
      case '30d': return 'Last 30 Days';
      case 'all': return 'All Time';
      default: return '';
    }
  };

  // Function to get country code from country name
  const getCountryCode = (countryName) => {
    const countryMap = {
      'United States': 'US',
      'United Kingdom': 'GB',
      'Canada': 'CA',
      'Australia': 'AU',
      'Germany': 'DE',
      'France': 'FR',
      'Japan': 'JP',
      'Brazil': 'BR',
      'India': 'IN',
      'China': 'CN',
      'Netherlands': 'NL',
      'Spain': 'ES',
      'Italy': 'IT',
      'South Korea': 'KR',
      'Mexico': 'MX',
      'Russia': 'RU',
      'Sweden': 'SE',
      'Norway': 'NO',
      'Denmark': 'DK',
      'Finland': 'FI',
      'Switzerland': 'CH',
      'Austria': 'AT',
      'Belgium': 'BE',
      'Ireland': 'IE',
      'Portugal': 'PT',
      'Poland': 'PL',
      'Turkey': 'TR',
      'Singapore': 'SG',
      'New Zealand': 'NZ',
      'South Africa': 'ZA',
      // Add more mappings as needed
    };
    
    return countryMap[countryName] || countryName;
  };

  if (loading) return (
    <div className="flex items-center justify-center p-12">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading analytics data...</p>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {/* Header with Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Website Analytics</h1>
          <p className="text-gray-600">{getTimeRangeLabel()}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Time Range Filter */}
          <div className="flex items-center space-x-2">
            <FaFilter className="text-gray-400" />
            <Select onValueChange={setTimeRange} defaultValue="7d">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* View Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button variant={activeView === 'overview' ? 'secondary' : 'ghost'} onClick={() => setActiveView('overview')}>
              <FaChartBar className="mr-2" />
              Overview
            </Button>
            <Button variant={activeView === 'table' ? 'secondary' : 'ghost'} onClick={() => setActiveView('table')}>
              <FaTable className="mr-2" />
              Table View
            </Button>
          </div>
        </div>
      </div>

      {activeView === 'overview' ? (
        /* VISUALIZATION VIEW */
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                <FaUsers className="text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.uniqueVisitors.toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
                <FaChartLine className="text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalVisits.toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                <FaMousePointer className="text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalEvents.toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Event Targets</CardTitle>
                <FaBullseye className="text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.topEventTargets.length > 0 ? stats.topEventTargets.length : 0}</div>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Breakdowns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Pages */}
            <Card>
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.topPages.map((page, index) => (
                  <div key={page.url} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-500 w-6">{index + 1}.</span>
                      <div className="text-sm text-gray-900 truncate flex-1" title={page.url}>
                        {page.url.length > 50 ? page.url.substring(0, 50) + '...' : page.url}
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded">
                      {page.count}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Countries with Flags */}
            <Card>
              <CardHeader>
                <CardTitle>Top Countries</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.topCountries.map((country, index) => (
                  <div key={country.country} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <ReactCountryFlag
                        countryCode={getCountryCode(country.country)}
                        svg
                        style={{
                          width: '1.5em',
                          height: '1.5em',
                          borderRadius: '2px',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                        }}
                        title={country.country}
                      />
                      <span className="text-sm text-gray-900">{country.country}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded">
                      {country.count}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Event Types and Targets */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Event Types Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Event Types</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.eventTypes.map((eventType) => (
                  <div key={eventType.type} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FaMousePointer className="text-gray-400" />
                      <span className="text-sm text-gray-900 capitalize">{eventType.type}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded">
                      {eventType.count}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Event Targets */}
            <Card>
              <CardHeader>
                <CardTitle>Top Event Targets</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.topEventTargets.map((target, index) => (
                  <div key={target.target} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-500 w-6">{index + 1}.</span>
                      <div className="text-sm text-gray-900 truncate flex-1" title={target.target}>
                        {target.target.length > 40 ? target.target.substring(0, 40) + '...' : target.target}
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded">
                      {target.count}
                    </span>
                  </div>
                ))}
                {stats.topEventTargets.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">No event targets recorded</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        /* TABLE VIEW */
        <Card>
          <CardHeader>
            <div className="flex space-x-1 p-4">
              {['visits', 'events', 'visitors'].map((type) => (
                <Button key={type} variant={tableType === type ? 'secondary' : 'ghost'} onClick={() => handleTableTypeChange(type)}>
                  {type}
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  {tableType === 'visits' && (
                    <>
                      <TableHead>Page URL</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Visitor ID</TableHead>
                      <TableHead>Date & Time</TableHead>
                    </>
                  )}
                  {tableType === 'events' && (
                    <>
                      <TableHead>Event Type</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>Visitor ID</TableHead>
                      <TableHead>Date & Time</TableHead>
                    </>
                  )}
                  {tableType === 'visitors' && (
                    <>
                      <TableHead>Visitor ID</TableHead>
                      <TableHead>First Visit</TableHead>
                    </>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.slice(0, 100).map((item) => (
                  <TableRow key={item.id}>
                    {tableType === 'visits' && (
                      <>
                        <TableCell className="max-w-xs truncate">{item.page_url}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {item.country && item.country !== 'Unknown' ? (
                              <>
                                <ReactCountryFlag
                                  countryCode={getCountryCode(item.country)}
                                  svg
                                  style={{
                                    width: '1.2em',
                                    height: '1.2em',
                                    borderRadius: '2px'
                                  }}
                                  title={item.country}
                                />
                                <span>{item.country}</span>
                              </>
                            ) : (
                              <span className="text-gray-400">Unknown</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-xs">{item.visitor_id?.substring(0, 8)}...</TableCell>
                        <TableCell>{new Date(item.created_at).toLocaleString()}</TableCell>
                      </>
                    )}
                    {tableType === 'events' && (
                      <>
                        <TableCell>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                            item.event_type === 'click' ? 'bg-blue-100 text-blue-800' :
                            item.event_type === 'form_submit' ? 'bg-green-100 text-green-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {item.event_type}
                          </span>
                        </TableCell>
                        <TableCell>
                          <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                            {item.event_target || 'N/A'}
                          </code>
                        </TableCell>
                        <TableCell className="font-mono text-xs">{item.visitor_id?.substring(0, 8)}...</TableCell>
                        <TableCell>{new Date(item.created_at).toLocaleString()}</TableCell>
                      </>
                    )}
                    {tableType === 'visitors' && (
                      <>
                        <TableCell className="font-mono">{item.visitor_id}</TableCell>
                        <TableCell>{new Date(item.created_at).toLocaleString()}</TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {tableData.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <FaTable className="mx-auto text-4xl text-gray-300 mb-4" />
                <p>No {tableType} data found</p>
              </div>
            )}
            {tableData.length > 100 && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <p className="text-sm text-gray-600 text-center">
                  Showing first 100 records out of {tableData.length}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}