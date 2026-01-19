import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaHandsHelping, FaHome } from "react-icons/fa";

const benefits = [
  {
    title: "Peer Support",
    icon: <FaUsers className="text-pink-500 text-4xl mb-4" />,
    description:
      "Our peer support brings individuals together through shared experiences, providing a space where everyone feels accepted, understood, and supported.",
  },
  {
    title: "Staff Support",
    icon: <FaHandsHelping className="text-pink-500 text-4xl mb-4" />,
    description:
      "Our staff provide advice, assistance, and emotional support tailored to your practical, physical, and mental wellbeing — helping you overcome daily challenges.",
  },
  {
    title: "Familiar Environment",
    icon: <FaHome className="text-pink-500 text-4xl mb-4" />,
    description:
      "Our facilities offer a healthy, familiar environment that’s free from hazards, adaptable to change, and designed to meet your personal and social needs.",
  },
];

const FacilitiesBenefits = () => {
  return (
    <section className="bg-gray-50 py-20 px-6 md:px-12 mb-20 rounded-[3rem] text-gray-800">
      

      {/* Benefits Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="bg-white p-8 rounded-3xl shadow-md text-center hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-center">{benefit.icon}</div>
            <h3 className="text-2xl font-semibold text-blue-700 mb-3">
              {benefit.title}
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {benefit.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FacilitiesBenefits;
