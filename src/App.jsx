import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import PricingPage from "./pages/PricingPage"; // New import
import ComingSoon from "./pages/comingsoon";
import "./App.css";
import ContactUs from "./pages/Contact";
import Careers from "./pages/Careers";
import TagManager from "react-gtm-module";
import Supportedliving from "./pages/Supportedliving";
import RedCupChatBot from "./components/AIChatWidget";
import CookieConsent from "./components/Cookies";
import OurFacilities from "./pages/our-facilities";
import Mordenslavery from "./pages/Mordenslavery";
import React, { useEffect, useState } from "react";
import { trackVisit } from "./utils/trackVisit";
import { setupAnalyticsListeners } from "./utils/analyticsListener";
import { registerVisitor } from "./utils/registerVisitor";
import { supabase } from "./lib/supabaseClient";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ReaderBlog from "./pages/ReaderBlog";
import { ThemeProvider } from "./contexts/ThemeContext";
import ThemeIndicator from "./components/ThemeIndicator";
import { ThemeWrapper } from "./components/ThemeAware";
import ClientArea from "./pages/ClientArea";
import Domains from "./pages/Domains";
import Billing from "./pages/Billing";
import Support from "./pages/Support";
import OpenTicket from "./pages/OpenTicket";

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
    return children;
  };

  // 🧠 Hide widgets on admin routes
  const hideWidgets = location.pathname.startsWith("/admin");

  return (
    <ThemeProvider>
      <ThemeWrapper>
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/pricing" element={<PricingPage />} /> {/* New route */}
            <Route path="/Comingsoon" element={<ComingSoon />} />
            <Route path="/Contact" element={<ContactUs />} />
            <Route path="/Careers" element={<Careers />} />
            <Route path="/Supportedliving" element={<Supportedliving />} />
            <Route path="/Our-Facilities" element={<OurFacilities />} />
            <Route path="/Mordenslavery" element={<Mordenslavery />} />
            <Route path="/blog" element={<ReaderBlog />} />
            <Route path="/admin" element={<AdminDashboard />} />
<Route path="/client-area" element={<ClientArea />} />
            <Route path="/domains" element={<Domains />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/support" element={<Support />} />
            <Route path="/open-ticket" element={<OpenTicket />} />
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
          
          {/* 🎨 Theme Indicator */}
          {/* <ThemeIndicator /> */}
        </div>
      </ThemeWrapper>
    </ThemeProvider>
  );
};

export default App;
