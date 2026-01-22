import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import WebData from "../components/WebData";
import Bookings from "../components/Bookings";
import Messages from "../components/Messages";
import Contact from "../components/Contact";
import { FaAddressBook } from 'react-icons/fa';
import { FaEnvelope } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { FaBlog } from "react-icons/fa";
import BlogApp from "./BlogApp";
import { FaFileAlt } from "react-icons/fa";
import BlogPage from "./BlogPage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { addDays, format } from 'date-fns';


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const TABS = [
    { name: "Dashboard", icon: <FaChartBar />, component: Dashboard },
    { name: "Website Data", icon: <FaChartBar />, component: WebData },
    { name: "Bookings", icon: <FaCalendarCheck />, component: Bookings },
    { name: "Messages", icon: <FaEnvelope />, component: Messages },
    { name: "Contacts", icon: <FaAddressBook />, component: Contact },
    { name: "Blog Assistant", icon: <FaBlog />, component: BlogApp },
    { name: "Blog Management", icon: <FaFileAlt />, component: BlogPage },
  ];

  function Dashboard() {
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

    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="col-span-4">
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
      </div>
    )
  }

  const ActiveComponent = TABS.find((tab) => tab.name === activeTab)?.component;

  return (
    <div className="flex bg-gray-100 z-30">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
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

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black  bg-opacity-50 z-0 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;