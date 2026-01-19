import React from "react";
import image4 from "../assets/living.png";
import { FaHome, FaHandsHelping, FaUsers, FaStar } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import livingImage from "../assets/qt=q_31.webp";
import { motion } from "framer-motion";
import image1 from "../assets/qt=q_95.webp";
import stopoverImage from "../assets/qt=q_67.webp";
import SupportDomains from "../components/SupportDomains";
import OnboardingProcess from "../components/OnboardingProcess";
export default function VybrantIndependentLiving() {
  return (
    <div>
      {/* Navbar */}
      
        <Navbar />
      

      <div className="text-center mt-20 mb-16">
             <img
            src={image1}
            alt="Company Logo"
            className="h-40 w-auto center mx-auto mb-6"
          />
          
          </div>

      {/* Main Section */}
      <section className="flex flex-col md:flex-row mt-20 mb-20 rounded-[3rem] items-center justify-between gap-8 py-16 px-6 md:px-20 bg-gradient-to-br from-gray-50 to-white">
        {/* Image Section */}
        <div className="w-full md:w-1/2 relative">
          <img
            src={image4}
            alt="Young adults and caregivers in supported living environment"
            className="rounded-2xl shadow-2xl object-cover w-full h-[500px] hover:scale-[1.02] transition-all duration-300"
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-4xl font-extrabold text-pink-600 tracking-tight">
            Vybrant Independent Living
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our supported housing provides safe and supportive environments for
            young adults aged 18 to 25 and older adults transitioning to
            independent living. With structured protocols and compassionate
            programmes, we empower individuals to thrive.
          </p>

          <Link to="https://docs.google.com/forms/d/e/1FAIpQLScS8ZMBXnrgRAK63k_FQ_X2rZ6bwERDdiZFOEYyOsnBuZ7B_A/viewform" target="_blank"
            rel="noopener noreferrer">
                                      <button
                                      className="
                                        relative overflow-hidden
                                        rounded-full border-2 border-pink-600 text-white-500 
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
                                        <span className="text-2xl font-semibold  flex items-center gap-2">
              <FaHome className="" /> Needs Assessment
            </span>
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

          {/* Needs Assessment */}
          <div className="space-y-6 mt-10">
            {/* Mission Card */}
            <div className="bg-white shadow-md p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300">
              <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaHandsHelping className="text-pink-600" /> Our Living Mission
              </h4>
              <p className="text-gray-700 leading-relaxed mt-2">
                To provide a safe and nurturing environment for vulnerable young
                and older adults that unlocks their hidden potential through
                mentorship, coaching, and empowerment.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white shadow-md p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300">
              <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaUsers className="text-pink-600" /> Our Living Vision
              </h4>
              <p className="text-gray-700 leading-relaxed mt-2">
                Vybrant Independent Living bridges the gap between social care,
                health, and housing for emerging adults, creating a secure,
                family-like environment that fosters growth and belonging.
              </p>
            </div>

            {/* Values Card */}
            <div className="bg-white shadow-md p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300">
              <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaStar className="text-pink-600" /> Our Living Values
              </h4>
              <p className="text-gray-700 leading-relaxed mt-2 font-medium">
                <span className="text-pink-600 font-semibold">Aspiration</span>{" "}
                |{" "}
                <span className="text-pink-600 font-semibold">
                  Responsibility
                </span>{" "}
                |{" "}
                <span className="text-pink-600 font-semibold">Respect</span> |{" "}
                <span className="text-pink-600 font-semibold">Care</span>
              </p>
            </div>
          </div>
        </div>
      </section>

        {/* Independent Living Spaces Section */}
      <section className="bg-gray-50 py-20 px-6 rounded-[3rem] mb-20 md:py-32 md:px-12 text-gray-800">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT: Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-bold text-pink-600">
            Our Independent Living Spaces
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our living spaces are tailored to enhance independence in young and
            older adults. Spaces are welcoming and nurturing, offering the
            privacy individuals need to achieve their potential despite
            challenges. Our homes are well maintained, quality assured, and
            fully equipped for comfort and accessibility. Every individual has a
            key to their front door and a lockable, double bedroom for
            independence and security.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Out of hours, we provide a local, 24/7 on-call emergency response
            service staffed by experienced managers. Our teams respond quickly
            to service needs and work closely with Emergency Duty Teams to
            ensure every resident receives safe, responsive, and compassionate
            care at all times.
          </p>
        </motion.div>

        {/* RIGHT: Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <img
            src={livingImage}
            alt="Independent Living Space"
            className="rounded-3xl shadow-lg w-full max-w-md object-cover"
          />
        </motion.div>
        <Link to="/Our-Facilities">
                                      <button
                                      className="
                                        relative overflow-hidden
                                        rounded-full border-2 border-pink-600 text-white-500 
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
                                        <span className="text-2xl font-semibold  flex items-center gap-2">
              <FaHome className="" /> Our Facilities
            </span>
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
    </section>
        {/* Stop Over Bed Section */}
    <section className="bg-blue-300 rounded-[3rem] mb-20 py-20 px-6 md:px-12 text-gray-800">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT: Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center order-1 md:order-none"
        >
          <img
            src={stopoverImage}
            alt="Stop Over Bed"
            className="rounded-3xl shadow-lg w-full max-w-md object-cover"
          />
        </motion.div>

        {/* RIGHT: Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-bold text-gray-800">Stop Over Bed</h2>
          <p className="text-gray-800 leading-relaxed">
            Our Stop Over Bed hosts young and older adults for a maximum of
            three nights, giving the referring agency the opportunity to find
            suitable long-term accommodation. It can also provide time and space
            for families to resolve difficulties if that is the reason a young
            person left home.
          </p>
          <p className="text-gray-800 leading-relaxed">
            This service offers a safe and supportive environment a place of
            safety where individuals can rest, recover, and plan their next
            steps. We strongly believe that no one should have to sleep in an
            unsafe place.
          </p>
          <Link to="/Contact">
                                      <button
                                      className="
                                        relative overflow-hidden
                                        rounded-full border-2 border-blue-800 text-white-500 
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
                                        <span className="text-2xl font-semibold  flex items-center gap-2">
              <FaHome className="" /> Check Availability
            </span>
                                      </span>
                                      <span
                                        className="
                                          absolute inset-0 bg-blue-800 
                                          translate-x-[-100%] 
                                          group-hover:translate-x-0
                                          transition-transform duration-300 ease-in-out
                                          z-0
                                        "
                                      ></span>
                                    </button>
                                    
                                    </Link>
        </motion.div>
      </div>
    </section>
    <div className="max-w-6xl mx-auto text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-blue-700 mb-4"
            >
              Vybrant Support Domains
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 max-w-3xl mx-auto"
            >
              Empowering individuals across key areas of personal growth and
              wellbeing.
            </motion.p>
          </div>
    <SupportDomains />
    <div className="max-w-6xl border-t border-gray-400 mx-auto text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold  mt-10 text-blue-700 mb-4"
            >
              Our Onboarding Process
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Simple steps to get started with Vybrant Care Services from your
              first enquiry to settling in with ongoing support.
            </motion.p>
          </div>
    <OnboardingProcess />
      {/* Footer */}
      <Footer />
    </div>
  );
}
