import React from "react";
import { motion } from "framer-motion";
import { FaHospitalUser, FaHeartbeat, FaHome, FaHandshake } from "react-icons/fa";
import recoveryImage from "../assets/reablement.png"; // 🖼️ Replace with your actual image path

const HomeFirstReablement = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.15 },
    }),
  };

  const cards = [
    {
      icon: <FaHospitalUser className="text-3xl text-pink-600" />,
      title: "Hospital to Home Support",
      text: "We help ensure smooth and safe transitions from hospital to home, reducing delays in discharge and promoting faster recovery.",
    },
    {
      icon: <FaHeartbeat className="text-3xl text-pink-600" />,
      title: "Personalised Recovery Plans",
      text: "Each recovery plan is tailored to meet your health, mobility, and personal goals, supporting your independence every step of the way.",
    },
    {
      icon: <FaHome className="text-3xl text-pink-600" />,
      title: "Reablement at Home",
      text: "Our care team provides practical and emotional support to help you regain confidence and independence in your daily activities.",
    },
    {
      icon: <FaHandshake className="text-3xl text-pink-600" />,
      title: "Collaborative Care",
      text: "We work with local health and social care professionals to deliver integrated support and achieve the best possible outcomes.",
    },
  ];

  return (
    <div className="">
    <div className=" max-w-3xl mx-auto text-center border-t border-gray-600 mb-16"><motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-blue-800 mb-6"
          >
          <h2 className="text-3xl font-bold mt-6 text-blue-700 mb-3">
            Home First Recovery & Reablement Service</h2>
          </motion.h2>
<p className="text-lg font-medium text-2xl text-pink-600 mb-6">
        Empowering Home-based Recovery
      </p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-700 leading-relaxed mb-10"
          >
          {/* <p className="text-gray-700 mb-12 leading-relaxed">
            At Vybrant Care Services, our Home First Recovery & Reablement Service is designed to help people regain their independence after a hospital stay. The service focuses on streamlining hospital discharge, reducing delayed discharges, and supporting safe, confident recovery at home.
            <br />
            <br />
            We work in collaboration with health and social care professionals to ensure a single, consistent process supported by integrated data systems providing the best outcomes for every individual.
          </p> */}
          </motion.p>
          </div>
    <section className="bg-pink-50 py-20 mb-20 rounded-3xl px-6 md:px-12 text-gray-800">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl shadow-lg"
        >
          <img
            src={recoveryImage}
            alt="Home First Recovery & Reablement"
            className="w-full h-[420px] object-cover"
          />
        </motion.div>

        {/* Right: Text + Cards */}
        <div>

          {/* Cards Section */}
          <div className="grid sm:grid-cols-2 gap-6">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="mb-4">{card.icon}</div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">{card.title}</h3>
                <p className="text-gray-600">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default HomeFirstReablement;
