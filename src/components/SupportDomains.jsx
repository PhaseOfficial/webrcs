import React from "react";
import { motion } from "framer-motion";
import {
  FaPiggyBank,
  FaGraduationCap,
  FaTools,
  FaComments,
  FaUsers,
  FaBriefcase,
} from "react-icons/fa";

const supportDomains = [
  {
    title: "Financial Assistance",
    icon: <FaPiggyBank className="text-pink-500 text-4xl mb-4" />,
    description:
      "We help individuals gain the skills, training and confidence to manage their finances responsibly. Everyone deserves to feel empowered with the knowledge, attitudes and behaviours to make the most of their money throughout life.",
  },
  {
    title: "Education",
    icon: <FaGraduationCap className="text-pink-500 text-4xl mb-4" />,
    description:
      "Everyone should have the opportunity to access full-time education, college or training. We liaise with education and training providers to help young and older adults return to learning, fostering social growth and new friendships.",
  },
  {
    title: "Skills Development",
    icon: <FaTools className="text-pink-500 text-4xl mb-4" />,
    description:
      "We provide guidance in essential life skills such as cooking, personal grooming and maintaining good hygiene. Our support encourages healthy routines and environments where individuals can thrive with confidence.",
  },
  {
    title: "Life Coaching",
    icon: <FaComments className="text-pink-500 text-4xl mb-4" />,
    description:
      "Through counselling and coaching, individuals are guided to reach their goals. We support people disengaged from mainstream education to discover their potential and build the confidence to pursue personal success.",
  },
  {
    title: "Social Inclusion",
    icon: <FaUsers className="text-pink-500 text-4xl mb-4" />,
    description:
      "We actively promote inclusion by empowering individuals to participate fully in society, express opinions freely, and engage in cultural and community activities without fear of judgment or retribution.",
  },
  {
    title: "Employment",
    icon: <FaBriefcase className="text-pink-500 text-4xl mb-4" />,
    description:
      "We help individuals navigate challenges in entering or thriving within the workforce. Our workshops and partnerships with employers, Jobcentre Plus, and community organisations create real employment opportunities.",
  },
];

const SupportDomains = () => {
  return (
    <section className="bg-gray-50 py-20 px-6 rounded-[3rem] mb-20 md:px-12 text-gray-800">
      

      {/* Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {supportDomains.map((domain, index) => (
          <motion.div
            key={domain.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-3xl shadow-md p-8 text-center hover:shadow-lg transition-shadow duration-300"
          >
            {domain.icon}
            <h3 className="text-xl font-semibold text-blue-700 mb-3">
              {domain.title}
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {domain.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SupportDomains;
