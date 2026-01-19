import React from "react";
import { motion } from "framer-motion";
import { FaBed, FaUserShield, FaUtensils, FaLeaf, FaShower, FaPhoneAlt } from "react-icons/fa";
import logo from "../assets/qt=q_95.webp"; // 🔹 your logo
import facilityImage from "../assets/rs=w_1240,h_620,cg_true.webp"; // 🔹 your top image
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import FacilitiesBenefits from "../components/FacilitiesBenefits";

const features = [
  { icon: <FaPhoneAlt className="text-pink-500 text-2xl" />, text: "24/7 'on-call' emergency response services" },
  { icon: <FaUserShield className="text-pink-500 text-2xl" />, text: "Staff skilled and experienced in smooth transitioning" },
  { icon: <FaBed className="text-pink-500 text-2xl" />, text: "Ensuite bedrooms with ample storage" },
  { icon: <FaLeaf className="text-pink-500 text-2xl" />, text: "Supervised communal areas & garden" },
  { icon: <FaUtensils className="text-pink-500 text-2xl" />, text: "Kitchen facilities with meal preparation support" },
  { icon: <FaShower className="text-pink-500 text-2xl" />, text: "Laundry and personal care facilities" },
];

const FacilitiesPage = () => {
  return (
  <div>
      {/* Navbar */}
      
        <Navbar />
      

    <div className="text-gray-800 mt-20">
      {/* 🔹 Hero Section with Image + Logo Overlay */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={facilityImage}
          alt="Our Facilities"
          className="object-cover w-full h-full brightness-75"
        />
        {/* Logo */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <img src={logo} alt="Vybrant Logo" className="mb-4" />
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-4xl md:text-5xl font-bold drop-shadow-lg"
          >
            Our Facilities
          </motion.h1>
        </div>
      </div>

      {/* 🔹 Main Content Section */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-blue-700 mb-6 text-center"
        >
          Group Living with Support
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-gray-700 text-lg leading-relaxed mb-10 text-center"
        >
          Our group living accommodation provides a welcoming, nurturing environment
          with privacy, space, and staffing levels that are tailored around supporting
          you to live independently.
        </motion.p>

        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-700"
          >
            <strong className="text-blue-700">Our Aim</strong> is to empower and equip
            you during your transition into independent living.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-700"
          >
            <strong className="text-blue-700">Our Mission</strong> is to provide you
            with appropriate accommodation and support that maximises your potential,
            despite any challenges.
          </motion.p>
        </div>
      </section>

      {/* 🔹 Features Grid Section */}
      <section className="bg-gray-50 rounded-[3rem] mb-20 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-semibold text-blue-700 mb-10"
          >
            What Our Facilities Offer
          </motion.h3>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <p className="text-gray-700 text-sm">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <div className="max-w-6xl mx-auto text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold text-blue-700 mb-4"
              >
                Facilities Benefits
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-600 max-w-2xl mx-auto"
              >
                Our facilities are designed to nurture independence, safety, and
                emotional wellbeing — providing both professional and peer-led support
                in a comfortable, familiar setting.
              </motion.p>
            </div>
      <FacilitiesBenefits />
    </div>
    <Footer />
    </div>
  );
};

export default FacilitiesPage;
