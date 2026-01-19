import React from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaClipboardList, FaHandshake } from "react-icons/fa";
import { Link } from "react-router-dom";

const steps = [
  {
    title: "Enquire",
    icon: <FaPhoneAlt className="text-pink-500 text-4xl mb-4" />,
    description:
      "Call us and give us a briefing on your requirements. We will share more information about our service and how we can best support you.",
    buttonText: "Contact Us",
    buttonLink: "/contact", // replace with your route or external link
  },
  {
    title: "Assessment",
    icon: <FaClipboardList className="text-pink-500 text-4xl mb-4" />,
    description:
      "We will carry out a needs assessment to discuss your goals and requirements. This helps us create an individualised support plan tailored just for you.",
    buttonText: "Needs Assessment",
    buttonLink: "https://docs.google.com/forms/d/e/1FAIpQLScS8ZMBXnrgRAK63k_FQ_X2rZ6bwERDdiZFOEYyOsnBuZ7B_A/viewform", // replace with your route or external link
  },
  {
    title: "Onboarding",
    icon: <FaHandshake className="text-pink-500 text-4xl mb-4" />,
    description:
      "We’ll sign agreements, set up payment plans, and settle you in with ongoing support and regular reviews to ensure you receive consistent, quality care.",
    buttonText: "Service Feedback",
    buttonLink: "https://docs.google.com/forms/d/e/1FAIpQLSc6p9Is6pwZmRXn37MKxT8jE2iW62vEhOM2gd-l5fnOTyAUkQ/viewform", // replace with your route or external link
  },
];

const OnboardingProcess = () => {
  return (
    <section className="bg-white rounded-[3rem] mb-20 py-20 px-6 md:px-12 text-gray-800">
      

      {/* Steps Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="bg-gray-50 p-8 rounded-3xl shadow-md text-center hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-center">{step.icon}</div>
            <h3 className="text-2xl font-semibold text-blue-700 mb-3">
              {step.title}
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed text-sm">
              {step.description}
            </p>

            {/* Button (supports internal routes or external URLs) */}
            {step.buttonLink.startsWith("http") ? (
              <a
                href={step.buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                {step.buttonText}
              </a>
            ) : (
              <Link
                to={step.buttonLink}
                target="_blank"
                className="inline-block bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                {step.buttonText}
              </Link>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OnboardingProcess;
