import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub } from "react-icons/fa";

// Placeholder team data - replace with actual data
const teamMembers = [
  {
    name: "John Doe",
    role: "Founder & CEO",
    image: "https://via.placeholder.com/150",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Jane Smith",
    role: "Lead Developer",
    image: "https://via.placeholder.com/150",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Peter Jones",
    role: "UI/UX Designer",
    image: "https://via.placeholder.com/150",
    linkedin: "#",
    github: "#",
  },
];

const About = () => {
  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-[50vh] bg-black text-white rounded-b-[3rem]">
        <div className="absolute inset-0 bg-red-900 opacity-50"></div>
        <div className="container mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold"
          >
            About Red Cup Series
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mt-4 max-w-2xl mx-auto"
          >
            We are a creative web development agency dedicated to building
            beautiful, functional, and user-friendly websites.
          </motion.p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-red-700 mb-4">Our Story</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Founded in 2024, Red Cup Series started with a simple idea: to
              help businesses of all sizes establish a strong online presence.
              What began as a small project has grown into a full-service
              agency with a talented team of developers, designers, and
              strategists. We are passionate about technology and committed to
              delivering exceptional results for our clients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-red-700 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our mission is to empower our clients with the tools and
              expertise they need to succeed in the digital world. We believe
              in the power of good design and cutting-edge technology to
              transform businesses. We are dedicated to building long-term
              partnerships with our clients, providing them with the support
              they need to grow and thrive.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-bold text-center mb-12 text-red-700">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="mx-auto rounded-full h-40 w-40 object-cover mb-4 shadow-lg"
                />
                <h3 className="text-2xl font-bold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
                <div className="flex justify-center mt-4 space-x-4">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-red-600"
                  >
                    <FaLinkedin size={24} />
                  </a>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-red-600"
                  >
                    <FaGithub size={24} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;