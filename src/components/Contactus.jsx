import React, { useState } from 'react';
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoMdPin } from "react-icons/io";
import { supabase } from '../lib/supabaseClient';

const Contactus = () => {
  const [subscribe, setSubscribe] = useState(false);
  const [contactInfo, setContactInfo] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!subscribe) {
      setError("Please confirm you want to receive updates.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;

    if (!emailRegex.test(contactInfo) && !phoneRegex.test(contactInfo)) {
      setError('Please enter a valid email address or phone number.');
      return;
    }

    const { data, error } = await supabase
      .from('contact')
      .insert([{ contact_info: contactInfo, subscribe }])

    if (error) {
      console.error('Error submitting form:', error.message);
      setError('Error submitting form: ' + error.message);
    } else {
      console.log('Form submitted successfully:', data);
      setSuccess('Form submitted successfully!');
      setContactInfo('');
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300" id="contact">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* --- Contact Form Section --- */}
        <div className="w-full md:w-2/3 text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 tracking-tight">
            Let us get in Touch with you
          </h2>
          <p className="text-lg mb-8 text-zinc-600 dark:text-zinc-400">
            Stay updated with our latest services and opportunities.
          </p>
          
          <form onSubmit={handleSubmit} data-track="newsletter_signup_form" className="w-full flex flex-col items-center space-y-4">
            <div className="flex w-full max-w-md justify-center shadow-sm">
              <input
                type="text"
                placeholder="Phone Number or Email Address"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                className="w-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 border border-zinc-300 dark:border-zinc-700 rounded-l-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-colors"
                required
              />
              
              <button
                type="submit"
                data-track="newsletter_signup_submit"
                disabled={!contactInfo || !subscribe}
                className={`px-6 py-3 rounded-r-md transition font-semibold whitespace-nowrap ${
                  (!contactInfo || !subscribe) 
                    ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed" 
                    : "bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900"
                }`}
              >
                Connect
              </button>
            </div>

            {/* Checkbox */}
            <label className="flex items-start space-x-3 w-full max-w-md text-left cursor-pointer select-none">
              <input
                type="checkbox"
                checked={subscribe}
                onChange={() => setSubscribe(!subscribe)}
                data-track="newsletter_signup_consent"
                className="mt-1 h-4 w-4 border-zinc-400 rounded-sm text-zinc-900 focus:ring-zinc-500 accent-zinc-900 dark:accent-white"
              />
              <span className="text-sm text-zinc-600 dark:text-zinc-400 leading-tight">
                Sign up for our email list for updates. You can unsubscribe at any time.
              </span>
            </label>

            {/* Notifications */}
            {error && (
              <div className="w-full max-w-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 px-4 py-2 rounded-md text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="w-full max-w-md bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-300 px-4 py-2 rounded-md text-sm">
                ✅ Thank you! We’ll be in touch soon.
              </div>
            )}
          </form>
        </div>

        {/* --- Location Section (Centered Harare Branch) --- */}
        <div className="flex justify-center w-full">
          
          <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 w-full max-w-md text-center md:text-left transition-colors duration-300">
            <h3 className="text-2xl font-bold mb-6 border-b border-zinc-200 dark:border-zinc-700 pb-4 text-zinc-900 dark:text-white">
              Harare Branch
            </h3>
            
            <div className="flex items-start mb-5 text-lg text-zinc-700 dark:text-zinc-300">
              <IoMdPin className="mr-4 mt-1 flex-shrink-0 text-zinc-900 dark:text-white" size={24} />
              <p className="leading-relaxed">
                No. 6791<br />New Ceney Park<br />Harare, Zimbabwe
              </p>
            </div>

            <div className="flex items-center mb-5 text-lg text-zinc-700 dark:text-zinc-300">
              <FaPhone className="mr-4 flex-shrink-0 text-zinc-900 dark:text-white" size={20} />
              <a href="tel:+263788147289" className="hover:underline hover:text-black dark:hover:text-white font-medium transition-colors">
                +263 788 1472 89
              </a>
            </div>

            <div className="flex items-center text-lg text-zinc-700 dark:text-zinc-300">
              <MdEmail className="mr-4 flex-shrink-0 text-zinc-900 dark:text-white" size={20} />
              <a href="mailto:redcupseriespvtltd@gmail.com" className="hover:underline hover:text-black dark:hover:text-white break-all transition-colors">
                redcupseriespvtltd@gmail.com
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contactus;