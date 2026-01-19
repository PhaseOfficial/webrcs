import image1 from "../assets/qt=q_95.webp";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
  import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaUserTie,
  FaHandsHelping,
  FaHeart,
  FaUserNurse,
  FaHome,
  FaBroom,
} from "react-icons/fa";
  
const Careers = () => {
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
          Join Our Caring Community
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We're always on the lookout for passionate and dedicated individuals to
          become part of our exceptional team. Whether you're seeking
          full-time, part-time, or flexible working opportunities, we have roles to suit your lifestyle. If 
          you're ready to make a real difference, we’d love to welcome you on board!
        </p>
        <Link to="https://docs.google.com/forms/d/e/1FAIpQLSeDoqOjk4H1uYtmegJ4jxPZZTfy5a7ij-jdZF669zfsvX-VqQ/viewform?usp=sf_link" target="_blank"
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
                              Apply Now
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

    <section className="bg-gray-100 max-w-7xl mx-auto rounded-[40px] mb-20 py-20 px-6 md:px-12 text-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-blue-700 mb-4">
            Staffing Solutions
          </h2>
          <p className="text-gray-600 text-lg">
            We offer excellent opportunities for compassionate and motivated individuals to join our care team.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Side - Offer & Qualities */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            {/* We Offer */}
            <div>
              <h3 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
                <FaHandsHelping className="text-pink-500" /> We Offer...
              </h3>
              <ul className="space-y-2 text-gray-700">
                {[
                  "Training and induction",
                  "Competitive pay rates",
                  "Flexible working patterns",
                  "Career development",
                  "Work pension",
                  "Personal coaching & mentorship",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <FaCheckCircle className="text-pink-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Desired Qualities */}
            <div>
              <h3 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
                <FaUserTie className="text-pink-500" /> Our Desired Qualities
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We are seeking like-minded people to become part of our team. If
                you share our passion for making a difference, we can promise
                you a career environment that offers you fantastic benefits,
                recognition, training, and career prospects.
              </p>
            </div>
          </motion.div>

          {/* Right Side - Duties */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-md p-8"
          >
            <h3 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
              <FaHeart className="text-pink-500" /> Duties Involved
            </h3>
            <ul className="space-y-3 text-gray-700">
              {[
                "Preparing meals",
                "Medication administration",
                "Providing personal care",
                "Light housework",
                "Continence management",
                "Support with mobilising",
                "Companionship",
              ].map((duty) => (
                <li key={duty} className="flex items-center gap-2">
                  <FaCheckCircle className="text-pink-500" /> {duty}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Available Staff Include */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-white rounded-3xl shadow-md p-10 text-center"
        >
          <h3 className="text-3xl font-semibold text-blue-700 mb-8">
            Available Staff Include
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <FaUserNurse className="text-pink-500 text-4xl mb-3" />
              <p className="font-medium text-gray-700">
                Trained Health Care Assistants
              </p>
            </div>
            <div className="flex flex-col items-center">
              <FaUserTie className="text-pink-500 text-4xl mb-3" />
              <p className="font-medium text-gray-700">
                Nurses & Nursing Assistants
              </p>
            </div>
            <div className="flex flex-col items-center">
              <FaHome className="text-pink-500 text-4xl mb-3" />
              <p className="font-medium text-gray-700">Live-In Carers</p>
            </div>
            <div className="flex flex-col items-center">
              <FaBroom className="text-pink-500 text-4xl mb-3" />
              <p className="font-medium text-gray-700">Cleaners</p>
            </div>
          </div>
        </motion.div>
        <div className="text-center mt-16">
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our staffing solutions support care homes and home care agencies with workforce in situations 
          involving employee absences and temporary skill shortages.
        </p>
        <Link to="/Contact" target="_blank"
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
                              Enquire Now
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
  
<Footer/>
    </div>
  );
};

export default Careers;