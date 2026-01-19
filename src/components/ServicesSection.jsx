import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaHome,
  FaHospitalUser,
  FaHeartbeat,
  FaHandsHelping,
  FaUserFriends,
  FaSmile,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

const ServicesSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const services = [
    {
      title: "Home Care Service",
      icon: <FaHome className="text-blue-600 w-10 h-10" />,
      description:
        "Our Home Care Services offer a range of in-home care and support tailored to your daily needs.",
      listTitle: "Support will include:",
      items: [
        "Personal care support",
        "Medication administration",
        "Meal preparation",
        "Light housework",
        "Support with transfers",
      ],
    },
    {
      title: "After Hospital Care",
      icon: <FaHospitalUser className="text-blue-600 w-10 h-10" />,
      description:
        "Support offered on a short-term basis to help you manage at home after being in hospital.",
      listTitle: "When to consider it:",
      items: [
        "After having surgery",
        "Lost mobility / stroke",
        "When prescribed bed rest",
        "Increased falls risk",
        "When feeling weak",
      ],
    },
    {
      title: "Specialist Care",
      icon: <FaHeartbeat className="text-blue-600 w-10 h-10" />,
      description:
        "Helping people with physical, mental, or chronic illnesses live independently and with dignity.",
      listTitle: "Our areas of speciality:",
      items: [
        "Diabetes management",
        "Multiple sclerosis (MS)",
        "Dementia & Alzheimer’s",
        "Parkinson’s",
        "End-of-Life care",
      ],
    },
    {
      title: "Respite Care",
      icon: <FaHandsHelping className="text-blue-600 w-10 h-10" />,
      description:
        "Temporary relief for a primary caregiver, allowing them to rest while we provide quality care.",
      listTitle: "Where this can happen:",
      items: [
        "In the individual's home",
        "In a care/residential home",
        "In temporary accommodation",
        "In our respite living facility",
        "On vacation",
      ],
    },
    {
      title: "Companionship Service",
      icon: <FaUserFriends className="text-blue-600 w-10 h-10" />,
      description:
        "Reducing loneliness and promoting social connection. We keep you company and support your wellbeing.",
      listTitle: "Things we can do:",
      items: [
        "Doing activities/going out",
        "Escorting to coffee groups",
        "Assisting with routines",
        "Visiting friends or family",
        "Befriending",
      ],
    },
    {
      title: "Live-in Care",
      icon: <FaSmile className="text-blue-600 w-10 h-10" />,
      description:
        "Round-the-clock care from a dedicated live-in carer, ensuring safety, comfort, and companionship.",
      listTitle: "What is included:",
      items: [
        "Support with personal care",
        "Household chores",
        "Meal preparation",
        "Companionship",
        "Support with safe living",
      ],
    },
  ];

  const toggleService = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-6 bg-gray-100 rounded-2xl mb-10" id="services">
      <h2 className="text-3xl font-semibold text-center mb-10 text-blue-700">
        Our Services
      </h2>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-gray-50 p-8 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.15,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Title and Toggle Button */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {service.icon}
                <h3 className="text-xl font-semibold text-gray-900">
                  {service.title}
                </h3>
              </div>
              <button
                onClick={() => toggleService(index)}
                data-track={`service_details_${openIndex === index ? 'close' : 'open'}`}
                data-service={service.title.toLowerCase().replace(/\s+/g, '_')}
                className="text-pink-500 hover:text-pink-600 text-xl p-2 rounded-full transition-all duration-200"
                aria-label={openIndex === index ? "Close" : "Expand"}
              >
                {openIndex === index ? <FaTimes /> : <FaPlus />}
              </button>
            </div>

            {/* Hidden Content (Animated Expand/Collapse) */}
            {openIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {service.description}
                </p>
                <h4 className="text-blue-700 font-semibold mb-2">
                  {service.listTitle}
                </h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {service.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
