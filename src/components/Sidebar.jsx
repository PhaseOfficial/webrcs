import React from "react";
import { FaBars, FaChartBar, FaCalendarCheck, FaEnvelope } from "react-icons/fa";
import Logo from "../assets/qt=q_95.webp"; // Import your logo here
import { supabase } from "../lib/supabaseClient";
import { FaAddressBook } from 'react-icons/fa';
import { FaBlog } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";

const logout = async () => {
  await supabase.auth.signOut();
  window.location.href = "/";
};


const Sidebar = ({
  activeTab,
  onTabChange,
  sidebarOpen,
  onToggleSidebar,
  tabs = [
    { name: "Website Data", icon: <FaChartBar /> },
    { name: "Bookings", icon: <FaCalendarCheck /> },
    { name: "Messages", icon: <FaEnvelope /> },
    { name: "Contacts", icon: <FaAddressBook />}, 
    { name: "Blog Assistant", icon: <FaBlog /> },
    { name: "Blog Management", icon: <FaFileAlt /> }, 

  ],
}) => {
  return (
    <>
      <div
  className={`bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col transition-all duration-300
    ${sidebarOpen ? "w-60" : "w-16"} absolute md:sticky top-0 shadow-lg`}
  style={{ minHeight: "100vh" }}
>

        {/* Logo & Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {sidebarOpen && (
            <img src={Logo} alt="Logo" className="h-10 w-auto" />
          )}
          <button
            onClick={onToggleSidebar}
            className="text-white p-2 rounded-md hover:bg-gray-700 transition-colors focus:outline-none"
          >
            <FaBars size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-6">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => onTabChange(tab.name)}
              className={`flex items-center gap-4 p-3 w-full text-left rounded-lg mb-2 mx-2 transition-all duration-300
                ${activeTab === tab.name
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
            >
              <span className="text-xl flex-shrink-0">{tab.icon}</span>
              <span
                className={`${
                  !sidebarOpen && "hidden"
                } font-medium truncate text-sm`}
              >
                {tab.name}
              </span>
            </button>
          ))}
        </nav>
        


        {/* Optional Footer */}
        {sidebarOpen && (
          <div className="mt-auto p-4 text-gray-400 text-xs text-center border-t border-gray-700">
           <button onClick={logout} className="bg-red-500 px-4 py-2 w-24 center text-white rounded">
  Logout
</button> 
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
