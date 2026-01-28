import React from "react";
import { FaBars, FaChartBar, FaCalendarCheck, FaEnvelope } from "react-icons/fa";
import Logo from "/weblogo.png"; // Import your logo here
import { supabase } from "../lib/supabaseClient";
import { FaAddressBook } from 'react-icons/fa';
import { FaBlog } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

const logout = async () => {
  await supabase.auth.signOut();
  window.location.href = "/";
};


const Sidebar = ({
  activeTab,
  onTabChange,
  sidebarOpen,
  onToggleSidebar,
  mobileSidebarOpen,
  onToggleMobileSidebar,
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
      {/* Desktop Sidebar */}
      <div
        className={`bg-gradient-to-b from-gray-900 to-gray-800 text-white flex-col transition-all duration-300 hidden md:flex
          ${sidebarOpen ? "w-60" : "w-16"} sticky top-0 shadow-lg h-screen`}
      >
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {sidebarOpen && (
            <img src={Logo} alt="Logo" className="h-10 w-auto" />
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="text-white"
          >
            <FaBars size={22} />
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 mt-6">
          <nav className="px-2">
            {tabs.map((tab) => (
              <Button
                key={tab.name}
                variant={activeTab === tab.name ? "secondary" : "ghost"}
                className={`w-full justify-start mb-2 ${!sidebarOpen ? "px-0 justify-center" : ""}`}
                onClick={() => onTabChange(tab.name)}
              >
                <span className={`${!sidebarOpen ? "mr-0" : "mr-4"} text-xl flex-shrink-0`}>{tab.icon}</span>
                <span className={`${!sidebarOpen && "hidden"} font-medium truncate`}>
                  {tab.name}
                </span>
              </Button>
            ))}
          </nav>
        </ScrollArea>
        

        {/* Optional Footer */}
        {sidebarOpen && (
          <div className="mt-auto p-4 text-gray-400 text-xs text-center border-t border-gray-700">
           <Button onClick={logout} className="w-full" variant="destructive">
            Logout
          </Button> 
          </div>
        )}
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={mobileSidebarOpen} onOpenChange={onToggleMobileSidebar}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-40">
            <FaBars size={22} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-60 p-0 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <img src={Logo} alt="Logo" className="h-10 w-auto" />
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleMobileSidebar}
                className="text-white"
              >
                <FaBars size={22} />
              </Button>
            </div>

            {/* Navigation */}
            <ScrollArea className="flex-1 mt-6">
              <nav className="px-2">
                {tabs.map((tab) => (
                  <Button
                    key={tab.name}
                    variant={activeTab === tab.name ? "secondary" : "ghost"}
                    className="w-full justify-start mb-2"
                    onClick={() => {
                      onTabChange(tab.name);
                      onToggleMobileSidebar();
                    }}
                  >
                    <span className="mr-4 text-xl flex-shrink-0">{tab.icon}</span>
                    <span className="font-medium truncate">
                      {tab.name}
                    </span>
                  </Button>
                ))}
              </nav>
            </ScrollArea>

            {/* Optional Footer */}
            <div className="mt-auto p-4 text-gray-400 text-xs text-center border-t border-gray-700">
              <Button onClick={logout} className="w-full" variant="destructive">
                Logout
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidebar;
