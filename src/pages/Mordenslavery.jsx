import React from "react";
import { motion } from "framer-motion";
import SlaveryImg from "../assets/cr=w_814,h_407.webp";
import Navbar from "../components/Navbar";
import Footer from "../components/footer"; // 🖼️ Update with your actual path

const ModernSlaveryStatementPage = () => {
  return (
    <div>
          {/* Navbar */}
          
            <Navbar />
          
    <div className="min-h-screen flex items-center justify-center py-20 px-6 md:px-12 text-gray-800">
      <section className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="overflow-hidden rounded-3xl shadow-lg"
        >
          <img
            src={SlaveryImg}
            alt="Modern Slavery Act Statement"
            className="w-full h-[420px] object-cover"
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6">
            Our Modern Slavery Act 2015 Statement
          </h1>

          <p className="text-gray-700 mb-5 leading-relaxed">
            Vybrant Care Services Ltd operates in line with the safeguarding
            duties of local authorities under the{" "}
            <strong>Care Act 2014</strong> to ensure that any vulnerable adult
            is not subject to abuse by being a victim of modern slavery or
            forced labour, nor to any form of human trafficking or coercion such
            as in ‘county line’ drug trafficking.
          </p>

          <p className="text-gray-700 leading-relaxed">
            We fully understand our <strong>responsibilities and duties</strong>{" "}
            to prevent and avoid any dealings with individuals or organisations
            implicated in modern slavery or human trafficking. We also recognise
            the duty to alert the police and other responsible authorities
            immediately if such issues are identified.
          </p>
        </motion.div>
      </section>
    </div>
    <Footer />
    </div>
  );
};

export default ModernSlaveryStatementPage;
