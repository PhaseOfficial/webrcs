import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { FaWhatsapp } from "react-icons/fa";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [postcode, setPostcode] = useState("");
  const [message, setMessage] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { error } = await supabase.from("contact_messages").insert([
      {
        name,
        email,
        phone,
        postcode,
        message,
        subscribe,
      },
    ]);

    if (error) {
      setError("Error submitting form: " + error.message);
    } else {
      setSuccess("Thank you! We’ll get back to you as soon as we can.");
      setName("");
      setEmail("");
      setPhone("");
      setPostcode("");
      setMessage("");
      setSubscribe(false);
    }
    if (!error) {
  await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        postcode,
        message,
        subscribe,
      }),
    }
  );

  setSuccess("Thank you! We’ll get back to you as soon as we can.");
  setName("");
  setEmail("");
  setPhone("");
  setPostcode("");
  setMessage("");
  setSubscribe(false);
}

  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "+447828402043"; // Replace with your WhatsApp number (no "+" sign)
    const text = encodeURIComponent("Hello! I'd like to ask about your services.");
    // Track WhatsApp click before opening
    if (window.trackEvent) {
      window.trackEvent('whatsapp_contact_click');
    }
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10">
      <h2 className="text-2xl font-bold text-center mb-4 text-pink-600">
        Contact Us
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Let us know about your questions or concerns. We’ll get back to you as
        soon as we can.
      </p>

      {error && <p className="text-red-500 text-center mb-2">{error}</p>}
      {success && <p className="text-green-500 text-center mb-2">{success}</p>}

      <form onSubmit={handleSubmit} data-track="contact_form_submit">
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
            className="shadow border rounded w-full py-2 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            className="shadow border rounded w-full py-2 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter Phone Number"
            className="shadow border rounded w-full py-2 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
        </div>

        {/* Post Code */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Post Code
          </label>
          <input
            type="text"
            value={postcode}
            placeholder="Enter Post Code"
            onChange={(e) => setPostcode(e.target.value)}
            className="shadow border rounded w-full py-2 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
        </div>

        {/* Message */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter Your Message"
            rows="4"
            className="shadow border rounded w-full py-2 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          ></textarea>
        </div>

        {/* Subscribe */}
        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            id="subscribe"
            checked={subscribe}
            onChange={(e) => setSubscribe(e.target.checked)}
            className="h-4 w-4 text-pink-500 border-gray-300 rounded focus:ring-pink-400"
          />
          <label htmlFor="subscribe" className="ml-2 text-gray-700 text-sm">
            Sign up for our email list for updates, promotions, and more.
          </label>
        </div>

        {/* Submit + WhatsApp */}
        {/* Submit + WhatsApp */}
<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
  <button
    type="submit"
    className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
  >
    Submit
  </button>

  <button
    type="button"
    onClick={handleWhatsAppClick}
    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
  >
    <FaWhatsapp className="text-xl" /> Message us on WhatsApp
  </button>
</div>

{/* Submission messages */}
<div className="mt-4 text-center">
  {error && <p className="text-red-500">{error}</p>}
  {success && <p className="text-green-500">{success}</p>}
</div>

      </form>
    </div>
  );
};

export default ContactForm;
