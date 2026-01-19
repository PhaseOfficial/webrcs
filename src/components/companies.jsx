import React from "react";
import { motion } from "framer-motion";
import {
  FaHandsHelping,
  FaShieldAlt,
  FaUserFriends,
  FaClock,
  FaHome,
  FaStar,
} from "react-icons/fa";


export default function WhyChooseUs() {
  const features = [
    {
      icon: <FaHandsHelping className="w-10 h-10 text-pink-500 mb-4" />,
      title: "Person-Centred Care",
      desc: "Every individual is unique — so is our care. We design support plans that revolve around your preferences, goals, and lifestyle.",
    },
    {
      icon: <FaShieldAlt className="w-10 h-10 text-pink-500 mb-4" />,
      title: "CQC-Regulated Standards",
      desc: "As a fully regulated provider, we uphold the highest standards in safety, quality, and accountability across all our services.",
    },
    {
      icon: <FaUserFriends className="w-10 h-10 text-pink-500 mb-4" />,
      title: "Compassionate Professionals",
      desc: "Our dedicated carers and nurses are trained to deliver not only skilled assistance but genuine kindness and empathy every day.",
    },
  ];

  const benefits = [
    {
      icon: <FaClock className="w-10 h-10 text-blue-600 mb-4" />,
      title: "Flexible 24/7 Support",
      desc: "Round-the-clock availability, designed around your schedule and needs for complete peace of mind.",
    },
    {
      icon: <FaHome className="w-10 h-10 text-blue-600 mb-4" />,
      title: "Comfort of Home",
      desc: "Receive exceptional care without leaving your familiar surroundings, preserving your independence and comfort.",
    },
    {
      icon: <FaStar className="w-10 h-10 text-blue-600 mb-4" />,
      title: "Reliable & Consistent Service",
      desc: "We believe in continuity — your preferred carers, your preferred routines, every time.",
    },
  ];

  return (
    <section className="py-20 px-6 mt-10  relative overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-pink-500 mb-8"
        >
          Why Choose Us?
        </motion.h2>

        {/* Intro */}
        {/* <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-gray-700 text-lg md:text-xl leading-relaxed mb-16 max-w-4xl mx-auto"
        >
          At Vybrant Care Services, we’re more than caregivers — we’re partners in your wellbeing.
          Using a compassionate, person-centred approach, we ensure you always feel valued,
          respected, and empowered to live your best life. As a CQC-regulated provider,
          we’re committed to exceptional quality and professional excellence.
        </motion.p> */}

        {/* What You Can Expect */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-blue-900 mb-10"
        >
          What You Can Expect
        </motion.h3>

        {/* Expectation Cards */}
        <div className="grid md:grid-cols-3 gap-10 mb-16">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-transform hover:scale-105 duration-300 text-left"
            >
              {item.icon}
              <h4 className="text-xl font-semibold text-blue-800 mb-3">
                {item.title}
              </h4>
              <p className="text-gray-700 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-blue-900 mb-10"
        >
          What Are The Benefits?
        </motion.h3>

        {/* Benefit Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {benefits.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-transform hover:scale-105 duration-300 text-left"
            >
              {item.icon}
              <h4 className="text-xl font-semibold text-blue-800 mb-3">
                {item.title}
              </h4>
              <p className="text-gray-700 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Closing Line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-800 font-semibold text-xl mt-16"
        >
          Live life on your own terms —{" "}
          <span className="text-pink-500">in your home, with Vybrant Care Services.</span>
        </motion.p>
      </div>

      
    </section>
  );
}
