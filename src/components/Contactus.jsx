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

    // Basic validation for email or phone number
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;

    if (!emailRegex.test(contactInfo) && !phoneRegex.test(contactInfo)) {
      setError('Please enter a valid email address or phone number with country code eg. +44 114 551 1332.');
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
      setContactInfo(''); // Clear the input field
    }
  };

  return (
    <div
  className="bg-background text-primary-foreground py-12 px-4 sm:px-6 lg:px-8"
  id="contact"
>
  <div className="max-w-7xl mx-auto flex flex-col items-center">
    {/* Contact Form Section (Centered at Top) */}
    <div className="w-full md:w-2/3 text-center mb-12">
      <h2 className="text-3xl font-bold mb-4 text-gray-700">
        Let us get in Touch with you
      </h2>
      <p className="text-lg mb-6 text-gray-600">
        Stay updated with our latest services and opportunities.
      </p>
      <form onSubmit={handleSubmit} data-track="newsletter_signup_form" className="w-full flex flex-col items-center space-y-4">

  <div className="flex w-full justify-center">
    <input
      type="text"
      placeholder="Phone Number or Email Address"
      value={contactInfo}
      onChange={(e) => setContactInfo(e.target.value)}
      className="w-2/3 bg-input text-primary-foreground placeholder-gray-500 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
      required
    />
    
    <button
      type="submit"
      data-track="newsletter_signup_submit"
      disabled={!contactInfo || !subscribe}
      className={`px-6 py-2 rounded-r-md ml-2 transition font-semibold ${
        (!contactInfo || !subscribe) 
          ? "bg-gray-400 cursor-not-allowed text-white" 
          : "bg-pink-600 hover:bg-pink-700 text-white"
      }`}
    >
      Connect
    </button>
  </div>

  {/* Checkbox */}
  <label className="flex items-start space-x-2 w-2/3 text-left cursor-pointer">
    <input
      type="checkbox"
      checked={subscribe}
      onChange={() => setSubscribe(!subscribe)}
      data-track="newsletter_signup_consent"
      className="mt-1 h-4 w-4 border border-gray-400 rounded-sm focus:ring-pink-500"
    />
    <span className="text-sm text-gray-600 leading-tight">
      Sign up for our email list for updates, promotions, and more. 
      You can unsubscribe at any time.
    </span>
  </label>

  {/* Error */}
  {error && (
    <div className="w-2/3 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm">
      {error}
    </div>
  )}

  {/* Success */}
  {success && (
    <div className="w-2/3 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md text-sm">
      ✅ Thank you! We’ll be in touch soon.
    </div>
  )}
</form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </div>

    {/* Branches Section (Side by Side) */}
    <div className="flex flex-col md:flex-row justify-center gap-12 w-full text-left">
      {/* South Yorkshire Branch */}
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-pink-600 mb-2">
          South Yorkshire Branch
        </h3>
        <p className="text-gray-600">
          Knowle House<br />4 Norfolk Park Road, Sheffield, S2 3QE
        </p>
        <p className="flex items-center mt-2 text-gray-600">
          <FaPhone className="mr-2" />
          <a href="tel:01145511332" data-track="contact_phone_yorkshire_landline" className="hover:underline">
            0114 551 1332
          </a>{" "}
          /{" "}
          <a href="tel:07828402043" data-track="contact_phone_yorkshire_mobile" className="ml-1 hover:underline">
            07828 402 043
          </a>
        </p>
        <p className="flex items-center text-gray-600 mt-1">
          <MdEmail className="mr-2" />
          <a
            href="mailto:info@vybrantcareservices.com"
            data-track="contact_email_yorkshire"
            className="hover:underline"
          >
            info@vybrantcareservices.com
          </a>
        </p>
      </div>

      {/* East Riding Branch */}
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-pink-600 mb-2">
          East Riding Branch
        </h3>
        <p className="text-gray-600">
          One Business Village<br />1 Emily Street, Hull HU9 1ND
        </p>
        <p className="flex items-center mt-2 text-gray-600">
          <FaPhone className="mr-2" />
          <a href="tel:07479251733" data-track="contact_phone_east_riding" className="hover:underline">
            07479 251 733
          </a>
        </p>
        <p className="flex items-center text-gray-600 mt-1">
          <MdEmail className="mr-2" />
          <a
            href="mailto:eastriding@vybrantcareservices.com"
            data-track="contact_email_east_riding"
            className="hover:underline"
          >
            eastriding@vybrantcareservices.com
          </a>
        </p>
      </div>
    </div>
  </div>
</div>

  );
};

export default Contactus;
