import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import TagManager from "react-gtm-module";
import ProfileUpdate from "./pages/ProfileUpdate";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import PricingPage from "./pages/PricingPage";
import ComingSoon from "./pages/comingsoon";
import ContactUs from "./pages/Contact";
import Careers from "./pages/Careers";
import Supportedliving from "./pages/Supportedliving";
import OurFacilities from "./pages/our-facilities";
import Mordenslavery from "./pages/Mordenslavery";
import ReaderBlog from "./pages/ReaderBlog";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ClientArea from "./pages/ClientArea";
import Domains from "./pages/Domains";
import Billing from "./pages/Billing";
import Support from "./pages/Support";
import OpenTicket from "./pages/OpenTicket";
import Login from "./pages/Login"; // ✅ New Import
import Signup from "./pages/Signup";
import MyServices from "./pages/MyServices";

// Components & Utils
import RedCupChatBot from "./components/AIChatWidget";
import CookieConsent from "./components/Cookies";
import { trackVisit } from "./utils/trackVisit";
import { setupAnalyticsListeners } from "./utils/analyticsListener";
import { registerVisitor } from "./utils/registerVisitor";
import { supabase } from "./lib/supabaseClient";
import "./App.css";

// Contexts
import { ThemeProvider } from "./contexts/ThemeContext";
import { ThemeWrapper } from "./components/ThemeAware";
import { AuthProvider } from "./contexts/AuthContext.jsx"; // ✅ New Import

const tagManagerArgs = {
  gtmId: "GTM-PKXK7LPV",
};

TagManager.initialize(tagManagerArgs);

const App = () => {
  const location = useLocation();

  useEffect(() => {
    trackVisit();
    registerVisitor();
    setupAnalyticsListeners();
  }, []);

  const ProtectedRoute = ({ children }) => {
    // Temporarily bypass authentication for debugging
    // You can later use { user } from useAuth() here to actually protect routes
    return children;
  };

  // 🧠 Hide widgets on admin routes
  const hideWidgets = location.pathname.startsWith("/admin");

  return (
    <AuthProvider> {/* ✅ 1. Wrap App in AuthProvider */}
      <ThemeProvider>
        <ThemeWrapper>
          <div className="p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/About" element={<About />} />
              <Route path="/Services" element={<Services />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/Comingsoon" element={<ComingSoon />} />
              <Route path="/Contact" element={<ContactUs />} />
              <Route path="/Careers" element={<Careers />} />
              <Route path="/blog" element={<ReaderBlog />} />
              
              
              {/* ✅ 2. Add Login Route */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Client Routes */}
              <Route path="/client-area" element={<ClientArea />} />
              <Route path="/domains" element={<Domains />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/support" element={<Support />} />
              <Route path="/open-ticket" element={<OpenTicket />} />
              <Route path="/client-area/profile" element={<ProfileUpdate />} />
              <Route path="/client-area/services" element={<MyServices />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              
              <Route
                path="*"
                element={
                  <div className="text-center mt-20 text-2xl">
                    404 - Page Not Found
                  </div>
                }
              />
            </Routes>

            {/* ✅ Only show widgets when not on admin routes */}
            {!hideWidgets && (
              <>
                <RedCupChatBot />
                <CookieConsent />
              </>
            )}
            
            {/* 🎨 Theme Indicator (Optional) */}
            {/* <ThemeIndicator /> */}
          </div>
        </ThemeWrapper>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;