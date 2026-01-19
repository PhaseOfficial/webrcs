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
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="all">All Time</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveView('overview')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeView === 'overview'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FaChartBar className="text-sm" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveView('table')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeView === 'table'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FaTable className="text-sm" />
              <span>Table View</span>
            </button>
          </div>
        </div>
      </div>

      {activeView === 'overview' ? (
        /* VISUALIZATION VIEW */
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FaUsers className="text-blue-600 text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Unique Visitors</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.uniqueVisitors.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <FaChartLine className="text-green-600 text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Visits</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalVisits.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FaMousePointer className="text-purple-600 text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Events</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalEvents.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <FaBullseye className="text-indigo-600 text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Event Targets</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.topEventTargets.length > 0 ? stats.topEventTargets.length : 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts and Breakdowns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Pages */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Pages</h3>
              <div className="space-y-3">
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
              </div>
            </div>

            {/* Top Countries with Flags */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Countries</h3>
              <div className="space-y-3">
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
              </div>
            </div>
          </div>

          {/* Event Types and Targets */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Event Types Breakdown */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Types</h3>
              <div className="space-y-3">
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
              </div>
            </div>

            {/* Top Event Targets */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Event Targets</h3>
              <div className="space-y-3">
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
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Table Type Selector */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-1 p-4">
              {['visits', 'events', 'visitors'].map((type) => (
                <button
                  key={type}
                  onClick={() => handleTableTypeChange(type)}
                  className={`px-4 py-2 text-sm font-medium rounded-md capitalize transition-colors ${
                    tableType === type
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {tableType === 'visits' && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Page URL
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Country
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Visitor ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                    </>
                  )}
                  {tableType === 'events' && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Event Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Target
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Visitor ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                    </>
                  )}
                  {tableType === 'visitors' && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Visitor ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        First Visit
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tableData.slice(0, 100).map((item) => (
                  <tr key={item.id}>
                    {tableType === 'visits' && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate">
                          {item.page_url}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
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
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono text-xs">
                          {item.visitor_id?.substring(0, 8)}...
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(item.created_at).toLocaleString()}
                        </td>
                      </>
                    )}
                    {tableType === 'events' && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                            item.event_type === 'click' ? 'bg-blue-100 text-blue-800' :
                            item.event_type === 'form_submit' ? 'bg-green-100 text-green-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {item.event_type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                            {item.event_target || 'N/A'}
                          </code>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono text-xs">
                          {item.visitor_id?.substring(0, 8)}...
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(item.created_at).toLocaleString()}
                        </td>
                      </>
                    )}
                    {tableType === 'visitors' && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                          {item.visitor_id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(item.created_at).toLocaleString()}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
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
          </div>
        </div>
      )}
    </div>
  );
}