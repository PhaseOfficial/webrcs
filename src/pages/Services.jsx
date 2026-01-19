import React from "react";
import { FaHeart, FaUsers, FaComments, FaShieldAlt } from "react-icons/fa";
// Replace this with your image import
import MentalHealthImg from "../assets/mental-health.png"; 
import image6 from "../assets/services.png";
import { FaPlus, FaTimes } from "react-icons/fa";
import SupportedLivingCard from "../components/SupportedLivingCard";
import Companies from "../components/companies";

import {
  FaHome,
  FaHospitalUser,
  FaHeartbeat,
  FaHandsHelping,
  FaSmile,
  FaUserFriends,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import image1 from "../assets/qt=q_95.webp";
import emergencyImage from "../assets/emergency.png";
import { Link } from "react-router-dom";
import Contactus from "../components/Contactus";
import OnlineAssessmentBooking from "../components/OnlineAssessmentBooking";
import HomeFirstReablement from "../components/HomeFirstReablement";
import VybrantCarerSupport from "../components/VybrantCarerSupport";
import ServicesSection from "../components/ServicesSection";



const Services = () => {
  return (
    
    <div>
    
        <Navbar />
        
    <section className="max-w-7xl mx-auto px-6 md:px-12 mt-20 mb-20 text-gray-800">
    
      {/* Page Header */}
      <div className="text-center mt-20 mb-16">
       <img
      src={image1}
      alt="Company Logo"
      className="h-40 w-auto center mx-auto mb-6"
    />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Your Trusted Home Care Provider
        </h1>
        {/* <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Vybrant Care Services is dedicated to enhancing the quality of life
          for our clients. Learn more about our skilled home care solutions
          designed for your comfort.
        </p> */}
      </div>
      <div className="mb-10 relative">
                <img
                  src={image6}
                  alt="Young adults and caregivers in supported living environment"
                  className="
  rounded-2xl shadow-2xl
  object-contain
  w-full 
  h-auto
  max-h-[500px]
  hover:scale-[1.02]
  transition-all duration-300
"

                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
<div className="border-b border-gray-800 mb-10 mt-10 "></div>
              <ServicesSection />

<div className="max-w-3xl mx-auto text-center border-t border-gray-600 mb-16">
<h2 className="text-3xl  font-bold mt-6 text-blue-700 mb-3">
      Mental Health Support Services
      </h2>
      <p className="text-lg font-medium text-2xl text-pink-600 mb-6">
        Empowering Home-based Recovery
      </p>

      <div className="border-t-2 border-gray-300 w-20 mb-6"></div>

      {/* <p className="text-gray-700 italic mb-8 text-lg">
        Because everyone is different and every journey is unique.
      </p> */}
      {/* <p className="text-gray-700 mb-12 leading-relaxed">
        At Vybrant Care Services, we understand that no two people experience mental health
        the same way. That’s why our support is person-centred, tailored to your individual
        needs, and designed to help you live a happy, fulfilling, and independent life.
      </p> */}

</div>

<section className="bg-green-100 rounded-[3rem] mb-20 text-gray-800 py-20 px-6 md:px-12">
  <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

    {/* Left: Image */}
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="rounded-3xl shadow-lg overflow-hidden order-2 lg:order-1"
    >
      <img
        src={MentalHealthImg}
        alt="Mental Health Support"
        className="w-full h-[600px] object-cover"
      />

     
    </motion.div>

    {/* Right: Text & Cards */}
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="order-1 lg:order-2"
    >
      

      {/* Mental Health Service Cards */}
      <div className="grid sm:grid-cols-2 gap-6">
        {[
          {
            icon: <FaHandsHelping className="text-blue-600 w-8 h-8" />,
            title: "Personalised Support",
            desc: "We assess your needs and tailor our services to suit you, ensuring your care feels right for you.",
          },
          {
            icon: <FaComments className="text-blue-600 w-8 h-8" />,
            title: "Counselling & Peer Support",
            desc: "Access counselling and peer support in a safe, welcoming environment no referral needed.",
          },
          {
            icon: <FaHome className="text-blue-600 w-8 h-8" />,
            title: "Independent Living Support",
            desc: "Build skills, confidence, and independence to enjoy a better quality of life.",
          },
          {
            icon: <FaUsers className="text-blue-600 w-8 h-8" />,
            title: "Collaborative Care Planning",
            desc: "We work with Community Mental Health Teams to help you set and achieve personal goals.",
          },
          {
            icon: <FaHeart className="text-blue-600 w-8 h-8" />,
            title: "Crisis Support & Accommodation",
            desc: "Calm, practical support during crises with a personalised Safety Plan for your wellbeing.",
          },
          {
            icon: <FaShieldAlt className="text-blue-600 w-8 h-8" />,
            title: "Safeguarding & Wellbeing",
            desc: "We protect your dignity and human rights, ensuring empowerment through compassionate care.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
            data-track={`mental_health_service_card_${item.title.toLowerCase().replace(/\s+/g, '_')}`}
          >
            <div className="flex items-center gap-4 mb-3">
              {item.icon}
              <h4 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h4>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Mission */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12 bg-blue-50 p-6 rounded-3xl border border-blue-100 shadow-sm"
      >
        <h3 className="text-2xl font-semibold text-blue-700 mb-3 flex items-center gap-2">
        Our Mission
        </h3>
        <p className="text-gray-700 leading-relaxed">
          Our Mental Health Support Service aims to improve the mental, social, and physical
          wellbeing of people in our communities. We believe in care that empowers, restores
          hope, and builds resilience one person at a time.
        </p>
      </motion.div>
    </motion.div>
  </div>
</section>

<div className="text-center mb-20">
  <SupportedLivingCard />
</div>

<HomeFirstReablement />
<OnlineAssessmentBooking />
<VybrantCarerSupport />

    <section className="mx-auto mt-20 mb-20 bg-red-200 text-gray-800 py-16 px-6 md:px-12" data-track="emergency_care_section">
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Left: Image */}
        <div className="flex-1">

        
          <img
            src={emergencyImage}
            alt="Emergency Care"
            className="w-full h-80 md:h-[28rem] object-cover rounded-3xl shadow-lg"
          />
        </div>

        {/* Right: Content */}
        <div className="flex-1">
          <h2 className="text-3xl font-semibold text-center md:text-left mb-6 text-white-700">
            Emergency Care
          </h2>
          <p className="text-center md::text-left text-white-600 leading-relaxed text-lg">
            Our emergency care service is designed to respond quickly to urgent
            needs, supporting daily living tasks and helping individuals remain
            as independent as possible at home. Whether for older adults or
            those with complex health needs, this service provides fast access
            to experienced carers when immediate support is required.
          </p>
        </div>
        <div>
        <Link to="tel:+447828402043">
                    <button
                    className="
                      relative overflow-hidden
                      rounded-full border-2 border-gray-600 text-white-500 
                      px-6 py-3 mt-8 font-semibold
                      transition-all duration-300 ease-in-out
                      group
                    "
                  >
                    <span
                      className="
                        relative z-10 transition-colors duration-300 ease-in-out
                        group-hover:text-white
                      "
                    >
                      Contact us
                    </span>
                    <span
                      className="
                        absolute inset-0 bg-pink-500 
                        translate-x-[-100%] 
                        group-hover:translate-x-0
                        transition-transform duration-300 ease-in-out
                        z-0
                      "
                    ></span>
                  </button>
                  
                  </Link>
                  </div>
      </div>
    </section>


<div className="border-b border-gray-800 "></div>


     
    </section>

    <Companies className=""/>
    <Contactus />
<Footer/>
    </div>
  );
};

export default Services;