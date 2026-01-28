import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LayoutDashboard, LineChart as LucideLineChart, CalendarCheck, Mail, Contact as ContactIcon, Book, Files } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import WebData from "../components/WebData";
import Bookings from "../components/Bookings";
import Messages from "../components/Messages";
import Contact from "../components/Contact";
import BlogApp from "./BlogApp";
import BlogPage from "./BlogPage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { addDays, format } from 'date-fns';

function Dashboard() {
  const [stats, setStats] = useState({
    totalVisits: 0,
    totalBookings: 0,
    newMessages: 0,
    newContacts: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Fetch total visits
        const { count: visitsCount, error: visitsError } = await supabase
          .from('website_visits')
          .select('*', { count: 'exact', head: true });

        // Fetch total bookings
        const { count: bookingsCount, error: bookingsError } = await supabase
          .from('online_assessments')
          .select('*', { count: 'exact', head: true });

        // Fetch new messages
        const { count: messagesCount, error: messagesError } = await supabase
          .from('contact_messages')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'new');

        // Fetch new contacts
        const { count: contactsCount, error: contactsError } = await supabase
          .from('contact')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'new');

        // Fetch recent bookings
        const { data: bookingsData, error: recentBookingsError } = await supabase
          .from('online_assessments')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        // Fetch recent messages
        const { data: messagesData, error: recentMessagesError } = await supabase
          .from('contact_messages')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        if (visitsError || bookingsError || messagesError || contactsError || recentBookingsError || recentMessagesError) {
          console.error('Error fetching dashboard data:', { visitsError, bookingsError, messagesError, contactsError, recentBookingsError, recentMessagesError });
        } else {
          setStats({
            totalVisits: visitsCount,
            totalBookings: bookingsCount,
            newMessages: messagesCount,
            newContacts: contactsCount,
          });
          setRecentBookings(bookingsData);
          setRecentMessages(messagesData);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const data = [
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
  ];

  const [range, setRange] = React.useState({ from: new Date(), to: addDays(new Date(), 4) });

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
                  <LucideLineChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalVisits}</div>
                  <p className="text-xs text-muted-foreground">+5.2% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                  <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalBookings}</div>
                  <p className="text-xs text-muted-foreground">+10% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">New Messages</CardTitle>
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.newMessages}</div>
                  <p className="text-xs text-muted-foreground">3 unread</p>
                </CardContent>
              </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">New Contacts</CardTitle>
                          <ContactIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{stats.newContacts}</div>
                          <p className="text-xs text-muted-foreground">+15.3% from last month</p>
                        </CardContent>
                      </Card>      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Website Traffic</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="flex justify-end mb-4">
            <DayPicker
              mode="range"
              selected={range}
              onSelect={setRange}
              footer={
                <p>
                  Selected range: {format(range.from, 'PPP')} - {format(range.to, 'PPP')}
                </p>
              }
            />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Recent Bookings</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentBookings.map(booking => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>{booking.full_name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-semibold">{booking.full_name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Recent Messages</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentMessages.map(message => (
                    <TableRow key={message.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>{message.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-semibold">{message.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="truncate">{message.message}</TableCell>
                      <TableCell><Badge>{message.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const TABS = [
    { name: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" />, component: Dashboard },
    { name: "Website Data", icon: <LucideLineChart className="h-4 w-4" />, component: WebData },
    { name: "Bookings", icon: <CalendarCheck className="h-4 w-4" />, component: Bookings },
    { name: "Messages", icon: <Mail className="h-4 w-4" />, component: Messages },
    { name: "Contacts", icon: <ContactIcon className="h-4 w-4" />, component: Contact },
    { name: "Blog Assistant", icon: <Book className="h-4 w-4" />, component: BlogApp },
    { name: "Blog Management", icon: <Files className="h-4 w-4" />, component: BlogPage },
  ];

  const ActiveComponent = TABS.find((tab) => tab.name === activeTab)?.component;

  return (
    <div className="flex bg-gray-100 z-30">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        mobileSidebarOpen={mobileSidebarOpen}
        onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        tabs={TABS}
      />

      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "md:ml-0" : "md:ml-16"}`}>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">{activeTab}</h1>
          <div className="bg-white rounded-lg shadow">
            {ActiveComponent && <ActiveComponent />}
          </div>
        </div>
      </div>


    </div>
  );
};

export default AdminDashboard;