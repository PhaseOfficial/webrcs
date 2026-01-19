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


const TABS = [
  { name: "Website Data", icon: <FaChartBar />, component: WebData },
  { name: "Bookings", icon: <FaCalendarCheck />, component: Bookings },
  { name: "Messages", icon: <FaEnvelope />, component: Messages },
  { name: "Contacts", icon: <FaAddressBook />, component: Contact },
  { name: "Blog Assistant", icon: <FaBlog />, component: BlogApp },
  { name: "Blog Management", icon: <FaFileAlt />, component: BlogPage },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].name);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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