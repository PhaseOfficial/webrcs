import React from "react";
import { motion } from "framer-motion";
import Contactus from '../components/Contactus';
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import ContactForm from "../components/ContactForm"; // Import the new ContactForm component

const ContactUs = () => {
  return (
    <div className="">
      <Navbar />
      <div className="mt-24 mb-16 w-full  ">
        <motion.div
          className="text-center w-full max-w-lg mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
         
         <ContactForm />  {/* Replace the existing form with the new ContactForm component */}
          
        </motion.div>
        <Contactus id="contact" />
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
