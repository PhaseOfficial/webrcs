import React from "react";
import { motion } from "framer-motion";
import {
  FaHandsHelping,
  FaInfoCircle,
  FaHeartbeat,
  FaHome,
  FaLaptop,
  FaComments,
  FaUserShield,
  FaBed,
  FaUmbrellaBeach,
  FaPoundSign,
  FaCogs,
  FaHandshake,
  FaUsers,
  FaPhoneAlt,
} from "react-icons/fa";
import carersImage from "../assets/carer-support.png"; // Replace with your image

const VybrantCarerSupport = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.15 },
    }),
  };

  const supportCards = [
    {
      icon: <FaInfoCircle className="text-pink-600 text-3xl" />,
      title: "Information & Advice",
      text: "Clear, practical guidance to help you navigate care systems, access benefits, and find the right support.",
    },
    {
      icon: <FaComments className="text-pink-600 text-3xl" />,
      title: "Emotional & Practical Support",
      text: "Confidential one-to-one and group sessions offering understanding, coping strategies, and community connection.",
    },
    {
      icon: <FaUmbrellaBeach className="text-pink-600 text-3xl" />,
      title: "Short Breaks",
      text: "Flexible respite options designed to give carers time to rest and recharge, while their loved ones receive continuous, compassionate care.",
    },
  ];

  const respiteOptions = [
    { icon: <FaUserShield />, title: "Emergency Respite" },
    { icon: <FaHome />, title: "In-Home Respite" },
    { icon: <FaUsers />, title: "Sitting Services" },
    { icon: <FaBed />, title: "Night Sitting" },
    { icon: <FaHandsHelping />, title: "Home Care Support" },
    { icon: <FaHeartbeat />, title: "Live-In Care" },
    { icon: <FaUmbrellaBeach />, title: "Supported Holidays" },
  ];

  const accessibilityCards = [
    {
      icon: <FaInfoCircle className="text-pink-600 text-3xl" />,
      title: "Navigating Assessments",
      text: "Guidance and advocacy to help you secure your statutory Carer’s Assessment rights.",
    },
    {
      icon: <FaUserShield className="text-pink-600 text-3xl" />,
      title: "Emergency Support",
      text: "Alternative, short-term care options while a formal plan is being arranged.",
    },
    {
      icon: <FaPoundSign className="text-pink-600 text-3xl" />,
      title: "Financial Accessibility",
      text: "Help in exploring funding routes and grants to reduce the financial strain on carers.",
    },
    {
      icon: <FaHandshake className="text-pink-600 text-3xl" />,
      title: "Collaborative Care Planning",
      text: "Co-produced, personalised plans that keep carers and loved ones in control of their care journey.",
    },
  ];

  return (
    <section className="bg-gray-50 rounded-3xl mt-10 py-20 mb-10 px-6 md:px-12 text-gray-800">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-20">
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl shadow-lg"
        >
          <img
            src={carersImage}
            alt="Carer Support & Respite"
            className="w-full h-[420px] object-cover"
          />
        </motion.div>

        {/* Right: Text */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-blue-800 mb-3"
          >
            Vybrant Carer Support & Respite Services
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg italic text-pink-600 mb-4"
          >
            Caring for the Carers Because You Matter Too
          </motion.p>

          <p className="text-gray-700 leading-relaxed mb-6">
            At Vybrant Care Services, we recognise that being a carer can be both fulfilling and exhausting. Our Carer Support & Respite Services are designed to provide the right balance of practical help, emotional support, and time for rest ensuring that carers remain well, supported, and empowered.
          </p>
        </div>
      </div>

      {/* Our Support Includes */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h3 className="text-3xl font-semibold text-blue-800 mb-8">Our Support Includes</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {supportCards.map((card, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition-all"
            >
              <div className="mb-4">{card.icon}</div>
              <h4 className="text-lg font-semibold text-blue-900 mb-2">{card.title}</h4>
              <p className="text-gray-600">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Flexible & Personalised Respite Care */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto mb-20"
      >
        <h3 className="text-3xl font-semibold text-blue-800 text-center mb-6">
          Flexible & Personalised Respite Care
        </h3>
        <p className="text-gray-700 text-center mb-10 max-w-3xl mx-auto">
          Every carer’s situation is unique. We tailor our respite options to suit both the carer and the individual receiving care at home, in the community, or on a short break.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {respiteOptions.map((opt, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white flex items-center gap-4 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all"
            >
              <div className="text-pink-600 text-2xl">{opt.icon}</div>
              <h4 className="font-semibold text-blue-900">{opt.title}</h4>
            </motion.div>
          ))}
        </div>
      </motion.div> */}

      {/* Making Respite Accessible */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mb-20"
      >
        <h3 className="text-3xl font-semibold text-blue-800 text-center mb-10">
          Making Care Accessible 
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {accessibilityCards.map((card, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition-all"
            >
              <div className="mb-4">{card.icon}</div>
              <h4 className="text-lg font-semibold text-blue-900 mb-2">{card.title}</h4>
              <p className="text-gray-600">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </section>
  );
};

export default VybrantCarerSupport;
