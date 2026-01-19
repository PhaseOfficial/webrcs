import React from "react";
import VisionImage from "../assets/vision.png";
import MissionImage from "../assets/mission.png";
import { motion } from "framer-motion";
import {
  Heart,
  Star,
  Shield,
  CheckCircle,
  Sparkles,
} from "lucide-react"; // Icons

const values = [
  {
    title: "Compassion",
    text: "We approach every interaction with genuine care and empathy.",
    icon: Heart,
    gradient: "from-pink-500 to-red-500",
  },
  {
    title: "Excellence",
    text: "We consistently strive for the highest standards in everything we do.",
    icon: Star,
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    title: "Quality & Excellence",
    text: "We are committed to delivering safe, exceptional and personalised care, continuously improving our standards.",
    icon: Star,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "Dignity",
    text: "We respect and protect the individual worth of every person we serve.",
    icon: Shield,
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    title: "Reliability",
    text: "We deliver consistent, dependable care that people can count on.",
    icon: CheckCircle,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Empowerment",
    text: "We enable and encourage independence in every individual we serve.",
    icon: Sparkles,
    gradient: "from-purple-500 to-pink-500",
  },
];

const Exploreprod = () => {
  return (
    <section className="relative rounded-[3rem] bg-gray-100 text-gray-900 overflow-hidden py-20">

      {/* MAIN TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center text-4xl md:text-5xl font-bold text-blue-300 mb-12"
      >
        About Vybrant Care Services
      </motion.h2>

      {/* Vision + Mission */}
      <div className="space-y-16 max-w-5xl mx-auto px-6">

        {/* VISION */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-white text-black rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row"
        >
          <img src={VisionImage} className="w-full md:w-1/2 h-64 object-cover" />
          <div className="p-8 md:w-1/2">
            <h2 className="text-3xl font-bold text-pink-500 mb-3">Our Vision</h2>
            <p className="text-gray-700">
              To become the UK’s leading home care provider, expanding our trusted
              services nationwide while setting new standards in personalised care.
            </p>
          </div>
        </motion.div>

        {/* MISSION */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-white text-black rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row"
        >
          <img src={MissionImage} className="w-full md:w-1/2 h-64 object-cover" />
          <div className="p-8 md:w-1/2">
            <h2 className="text-3xl font-bold text-pink-500 mb-3">Our Mission</h2>
            <p className="text-gray-700">
              To provide outstanding home care services and person-centred support
              that empowers individuals to live fulfilling, independent lives.
            </p>
          </div>
        </motion.div>
      </div>

      {/* DIVIDER LINE WITH GRADIENT */}
      <div className="w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mt-20 mb-16 opacity-40"></div>

      {/* BRAND VALUES TITLE */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center text-4xl md:text-5xl font-bold text-blue-300 mb-6"
      >
        Our Values
      </motion.h2>

      <p className="text-center max-w-3xl mx-auto text-gray-900 text-lg mb-12 px-6 leading-relaxed">
        Our core principles guide our behaviour, shaping how we care for our service users,
        support our employees, and interact with our communities.
      </p>

      {/* GRID OF VALUES */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-10">

        {values.map((v, i) => {
          const Icon = v.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative p-[2px] rounded-3xl bg-gradient-to-br shadow-xl"
              style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
            >
              <div className={`rounded-3xl bg-gray-100 p-8`}>
                
                {/* Icon circle */}
                <div
                  className={`w-14 h-14 mb-4 mx-auto rounded-full flex items-center justify-center bg-gradient-to-br ${v.gradient}`}
                >
                  <Icon className="text-gray-900 w-7 h-7" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">{v.title}</h3>
                <p className="text-gray-700 leading-relaxed">{v.text}</p>

                {/* Bottom divider */}
                <div className={`mt-6 h-1 w-full rounded-full bg-gradient-to-r ${v.gradient}`}></div>
              </div>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
};

export default Exploreprod;
