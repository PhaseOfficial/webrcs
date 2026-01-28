import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { motion } from "framer-motion";
import logo from "/weblogo.png";
import {
  FaCheckCircle,
  FaCode,
  FaLaptopCode,
  FaRocket,
  FaPaintBrush,
  FaBullhorn,
  FaHandshake,
  FaHeart,
} from "react-icons/fa";

const Careers = () => {
  return (
    <div>
      <Navbar />
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-20 mb-20 text-gray-800">
        {/* Page Header */}
        <div className="text-center mt-20 mb-16">
          <img
            src={logo}
            alt="Red Cup Series Logo"
            className="h-40 w-auto center mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Join Our Innovative Team at Red Cup Series
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are a passionate team of developers, designers, and strategists
            building the future of the web. We're looking for talented
            individuals to help us create amazing web experiences for our
            clients.
          </p>
          <Link
            to="/contact"
          >
            <button
              className="
                relative overflow-hidden
                rounded-full border-2 border-red-600 text-red-600
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
                Get In Touch
              </span>
              <span
                className="
                  absolute inset-0 bg-red-600
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

      <section className="bg-gray-100 max-w-7xl mx-auto rounded-[40px] mb-20 py-20 px-6 md:px-12 text-gray-800">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-red-700 mb-4">
              Why Work With Us?
            </h2>
            <p className="text-gray-600 text-lg">
              We're more than just a company, we're a community.
            </p>
          </motion.div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Side - Our Perks */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-10"
            >
              <div>
                <h3 className="text-2xl font-semibold text-red-700 mb-4 flex items-center gap-2">
                  <FaRocket className="text-red-500" /> Our Perks
                </h3>
                <ul className="space-y-2 text-gray-700">
                  {[
                    "Competitive salary",
                    "Flexible work hours",
                    "Remote work options",
                    "Health and wellness benefits",
                    "Professional development opportunities",
                    "Team retreats and events",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <FaCheckCircle className="text-red-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right Side - Our Values */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-md p-8"
            >
              <h3 className="text-2xl font-semibold text-red-700 mb-4 flex items-center gap-2">
                <FaHandshake className="text-red-500" /> Our Values
              </h3>
              <ul className="space-y-3 text-gray-700">
                {[
                  "Innovation and Creativity",
                  "Collaboration and Teamwork",
                  "Customer-Centric Approach",
                  "Integrity and Transparency",
                  "Continuous Learning and Growth",
                  "Work-Life Balance",
                ].map((duty) => (
                  <li key={duty} className="flex items-center gap-2">
                    <FaCheckCircle className="text-red-500" /> {duty}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-20 mb-20 text-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-white rounded-3xl shadow-md p-10 text-center"
        >
          <h3 className="text-3xl font-semibold text-red-700 mb-8">
            Open Positions
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <FaCode className="text-red-500 text-4xl mb-3" />
              <p className="font-medium text-gray-700">
                Frontend Developer (React)
              </p>
            </div>
            <div className="flex flex-col items-center">
              <FaLaptopCode className="text-red-500 text-4xl mb-3" />
              <p className="font-medium text-gray-700">
                Backend Developer (Node.js)
              </p>
            </div>
            <div className="flex flex-col items-center">
              <FaPaintBrush className="text-red-500 text-4xl mb-3" />
              <p className="font-medium text-gray-700">UI/UX Designer</p>
            </div>
            <div className="flex flex-col items-center">
              <FaBullhorn className="text-red-500 text-4xl mb-3" />
              <p className="font-medium text-gray-700">Digital Marketer</p>
            </div>
          </div>
           <div className="text-center mt-16">
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Don't see a role that fits? We are always looking for talented people.
          Send us your resume and we'll be in touch if something comes up.
        </p>
        <Link to="https://docs.google.com/forms/d/e/1FAIpQLSeDoqOjk4H1uYtmegJ4jxPZZTfy5a7ij-jdZF669zfsvX-VqQ/viewform?usp=sf_link" target="_blank"
  rel="noopener noreferrer">
                            <button
                            className="
                              relative overflow-hidden
                              rounded-full border-2 border-red-600 text-red-600
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
                              Apply Now
                            </span>
                            <span
                              className="
                                absolute inset-0 bg-red-600
                                translate-x-[-100%]
                                group-hover:translate-x-0
                                transition-transform duration-300 ease-in-out
                                z-0
                              "
                            ></span>
                          </button>

                          </Link>
                          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;