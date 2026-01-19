import React from "react";
import { motion } from "framer-motion";

// 🖼️ Replace these with your actual images
import SupportedImg from "../assets/living.png";
import CommunityImg from "../assets/broxburn.png";
import SpecialistImg from "../assets/emergency.png";

const serviceCards = [
  {
    title: "Support at Home / 24-Hour Packages",
    image: SupportedImg,
    text: "We provide 24-hour support for individuals with complex needs in their own homes. This includes people with learning disabilities, autism, or those requiring structured support under local authority frameworks.",
  },
  {
    title: "Community Connection & Outreach",
    image: CommunityImg,
    text: "We actively promote social inclusion by offering check-in visits, help with errands, and companionship services. Our outreach fosters independence and connection within the community.",
  },
  // {
  //   title: "Specialist Services (Phase 2 – Expansion)",
  //   image: SpecialistImg,
  //   text: "Planned future services include palliative care, complex medical support (PEG feeding, catheter, stoma care), and recovery programs for domestic abuse survivors.",
  // },
];

export default function ScotlandExtraServices() {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-12 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-center text-blue-700 mb-12"
      >
        Additional Support Services
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-10">
        {serviceCards.map(({ title, image, text }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
          >
            {/* Image */}
            <div className="h-60 w-full overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Text */}
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">
                {title}
              </h3>
              <p className="text-gray-700 leading-relaxed">{text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
