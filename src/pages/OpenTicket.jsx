import React, { useState } from 'react';
import ClientAreaNavbar from '../components/ClientAreaNavbar';
import Footer from '../components/footer';
import { useThemeClasses } from '../components/ThemeAware';

const OpenTicket = () => {
  const themeClasses = useThemeClasses();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle ticket submission logic here
    console.log({ subject, message });
  };

  return (
    <div className={themeClasses.background}>
      <ClientAreaNavbar />
      <div className="container mx-auto px-6 py-12">
        <h1 className={`text-3xl font-bold ${themeClasses.text} mb-8`}>Open a New Ticket</h1>
        <div className={`p-8 rounded-lg ${themeClasses.card}`}>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="subject" className={`block text-sm font-medium ${themeClasses.text}`}>Subject</label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className={`mt-1 block w-full p-2 border ${themeClasses.border} rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm ${themeClasses.input}`}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className={`block text-sm font-medium ${themeClasses.text}`}>Message</label>
              <textarea
                id="message"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`mt-1 block w-full p-2 border ${themeClasses.border} rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm ${themeClasses.input}`}
              ></textarea>
            </div>
            <button type="submit" className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors">
              Submit Ticket
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OpenTicket;