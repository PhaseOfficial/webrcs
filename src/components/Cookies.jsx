import React, { useState, useEffect } from "react";
import { FaCookieBite } from "react-icons/fa";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent === null) {
      setVisible(true);
    } else {
      setShowIcon(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
    setShowIcon(true);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setVisible(false);
    setShowIcon(true);
  };

  const reopenMessage = () => setVisible(true);

  return (
    <>
      {/* Floating Cookie Icon */}
      {showIcon && !visible && (
        <div
          onClick={reopenMessage}
          className="fixed bottom-6 left-4 bg-pink-600 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-pink-700 z-50 transition-all animate-bounce"
          title="Manage Cookie Settings"
        >
          <FaCookieBite size={22} />
        </div>
      )}

      {/* Consent Box */}
      {visible && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white p-4 rounded-lg shadow-lg w-[95%] max-w-md z-50 animate-fadeIn">
          <p className="text-sm mb-3 text-center">
            We use cookies to improve your browsing experience. Choose whether to allow cookies.
          </p>

          <div className="flex justify-center gap-3">
            <button
              onClick={handleDecline}
              className="border border-gray-400 text-gray-300 px-4 py-2 rounded-md text-sm hover:bg-gray-700 transition"
            >
              Decline
            </button>

            <button
              onClick={handleAccept}
              className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md text-sm transition"
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
