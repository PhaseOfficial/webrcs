import React, { useState } from "react";
import { motion } from "framer-motion";
import image3 from "../assets/booking.png"; // Replace with your actual image path
import { addDays, format, isBefore, startOfDay } from "date-fns";
import { supabase } from "../lib/supabaseClient";


const OnlineAssessmentBooking = () => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [form, setForm] = useState({
    address1: "",
    address2: "",
    city: "",
    postal: "",
  });

  const today = startOfDay(new Date());
  const minDate = addDays(today, 2); // only allow 2 days from today

  const times = {
    Morning: ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
    Afternoon: [
      "12:00 PM",
      "12:30 PM",
      "1:00 PM",
      "1:30 PM",
      "2:00 PM",
      "2:30 PM",
      "3:00 PM",
      "3:30 PM",
      "4:00 PM",
    ],
  };

const handleBook = async (e) => {
  e.preventDefault();

  if (!selectedDate || !selectedTime) {
    alert("Please select a date and time.");
    return;
  }
  
  // Track booking attempt
  if (window.trackEvent) {
    window.trackEvent('assessment_booking_submit', {
      date: format(selectedDate, "yyyy-MM-dd"),
      time: selectedTime
    });
  }

const { full_name, email, phone, address1, address2, city, postal } = form;

const { error } = await supabase
  .from("online_assessments")
  .insert([
    {
      full_name,
      email,
      phone,
      address1,
      address2,
      city,
      postal,
      date: format(selectedDate, "yyyy-MM-dd"),
      time: selectedTime,
    },
  ]);

if (error) {
  if (error.message.includes("unique_booking_slot")) {
    alert("❗ This time slot is already booked. Please choose another.");
  } else {
    alert("Something went wrong. Try again.");
  }
  return;
}


  alert("Booking confirmed! We'll contact you soon ✅");

  // Reset form + go back to first step
  setStep(1);
  setSelectedDate(null);
  setSelectedTime("");
  setForm({ address1: "", address2: "", city: "", postal: "" });
};


  return (
    <div className="border-t border-b border-gray-400">
    <section className="max-w-3xl  mx-auto mt-20 mb-20 px-6 text-gray-800" data-track="assessment_booking_section">
      {/* STEP 1: Intro Card */}
      {step === 1 && (
        <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="flex flex-col md:flex-row items-center bg-gray-50 p-8 rounded-3xl shadow-md text-center md:text-left"
>
  {/* LEFT SIDE — TEXT CONTENT */}
  <div className="flex-1 md:pr-8">
    <h2 className="text-3xl font-semibold text-pink-500 mb-3">
      Home Assessment
    </h2>
    <p className="text-gray-600 mb-1">1 hr | Free</p>
    <p className="text-gray-700 leading-relaxed mb-8">
      Our team of highly skilled and compassionate professionals are committed
      to delivering personalised care plans ensuring utmost wellbeing and
      independence. The information you provide will help us tailor a care
      experience of the highest standard.
    </p>
    <button
      onClick={() => setStep(2)}
      className="bg-pink-500 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold"
    >
      Book Now
    </button>
  </div>

  {/* RIGHT SIDE — IMAGE */}
  <div className="flex-1 mt-8 md:mt-0">
    <img
      src={image3} // 🖼️ Replace with your actual image path
      alt="Home assessment"
      className="w-full h-auto rounded-2xl object-cover shadow-md"
    />
  </div>
</motion.div>

      )}

      {/* STEP 2: Date Selector */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-8 rounded-3xl shadow-md text-center"
        >
          <h3 className="text-2xl font-semibold text-pink-600 mb-4">
            Select a Date
          </h3>
          <input
            type="date"
            className="border border-gray-300 text-gray-300 rounded-lg px-4 py-2 mb-6"
            onChange={(e) => {
              const chosen = new Date(e.target.value);
              if (isBefore(chosen, minDate)) {
                alert("Please select a date at least 2 days from today.");
                e.target.value = "";
              } else {
                setSelectedDate(chosen);
              }
            }}
          />
          {selectedDate && (
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setStep(1)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-lg font-semibold"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Continue
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* STEP 3: Time Selector */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-8 rounded-3xl shadow-md text-center"
        >
          <h3 className="text-2xl font-semibold text-pink-600 mb-4">
            Select a Time (GMT+01:00 Edinburgh, London)
          </h3>

          {Object.entries(times).map(([period, slots]) => (
            <div key={period} className="mb-6">
              <h4 className="font-semibold mb-3">{period}</h4>
              <div className="flex flex-wrap justify-center gap-3">
                {slots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`px-4 py-2 rounded-lg border ${
                      selectedTime === time
                        ? "bg-pink-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => setStep(2)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-lg font-semibold"
            >
              Back
            </button>

            {selectedTime && (
              <button
                onClick={() => setStep(4)}
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Continue
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* STEP 4: Confirmation / Address Form */}
      {step === 4 && (
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleBook}
          className="bg-gray-50 p-8 rounded-3xl shadow-md"
        >
          <h3 className="text-2xl font-semibold text-pink-600 mb-2">
            Home Assessment
          </h3>
          <p className="text-gray-300 mb-6">
            {format(selectedDate, "dd MMMM yyyy")}, {selectedTime} — 1 hr | Free
          </p>

          <p className="text-gray-700 mb-4">
            <strong>Staff Member:</strong> Care Coordinator
          </p>

          <p className="text-gray-700 font-medium mb-2">
            Service will be provided at your location:
          </p>

          <div className="space-y-4 mb-6">
          
            <input
              type="text"
              placeholder="Full Name"
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            <input
              type="text"
              placeholder="Address 1"
              value={form.address1}
              onChange={(e) => setForm({ ...form, address1: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            <input
              type="text"
              placeholder="Address 2 (optional)"
              value={form.address2}
              onChange={(e) => setForm({ ...form, address2: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            <input
              type="text"
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            <input
              type="text"
              placeholder="Postal / Zip"
              value={form.postal}
              onChange={(e) => setForm({ ...form, postal: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg font-semibold"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Book
            </button>
          </div>
        </motion.form>
      )}
    </section>
    </div>
  );
};

export default OnlineAssessmentBooking;
