import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import ContactForm from "../components/ContactForm";
import { useThemeClasses } from "../components/ThemeAware";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoMdPin } from "react-icons/io";

const Contact = () => {
  const themeClasses = useThemeClasses();

  return (
    <div className={themeClasses.background}>
      <Navbar />
      <div className="pt-24 pb-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={`text-4xl font-bold ${themeClasses.text}`}>Contact Us</h1>
          <p className={`mt-4 text-lg ${themeClasses.textSecondary}`}>
            We'd love to hear from you.
          </p>
        </motion.div>

        <div className="container mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <ContactForm />

          {/* Contact Information */}
          <div className="w-full max-w-lg mx-auto">
            <h3 className={`text-2xl font-bold mb-6 ${themeClasses.text}`}>
              Our Information
            </h3>
            <div className={`p-8 rounded-xl ${themeClasses.card}`}>
              <div className={`flex items-start mb-5 text-lg ${themeClasses.textSecondary}`}>
                <IoMdPin className={`${themeClasses.text} mr-4 mt-1 flex-shrink-0`} size={24} />
                <p className="leading-relaxed">
                  No. 6791<br />New Ceney Park<br />Harare, Zimbabwe
                </p>
              </div>

              <div className={`flex items-center mb-5 text-lg ${themeClasses.textSecondary}`}>
                <FaPhone className={`${themeClasses.text} mr-4 flex-shrink-0`} size={20} />
                <a href="tel:+263788147289" className="hover:underline hover:text-black dark:hover:text-white font-medium transition-colors">
                  +263 788 147 289
                </a>
              </div>

              <div className={`flex items-center text-lg ${themeClasses.textSecondary}`}>
                <MdEmail className={`${themeClasses.text} mr-4 flex-shrink-0`} size={20} />
                <a href="mailto:redcupseriespvtltd@gmail.com" className="hover:underline hover:text-black dark:hover:text-white break-all transition-colors">
                  redcupseriespvtltd@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;