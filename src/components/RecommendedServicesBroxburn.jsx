import { motion } from "framer-motion";
import broxburnImage from "../assets/broxburn.png"; // ✅ Replace with your image path
import { FaHandsHelping, FaUserMd, FaBrain, FaHome, FaPeopleArrows, FaLeaf } from "react-icons/fa";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { GiFamilyHouse } from "react-icons/gi";

export default function RecommendedServicesBroxburn() {
  const services = [
    {
      icon: <FaHome className="text-pink-600 text-3xl" />,
      title: "Core Domiciliary (Personal) Care",
      items: [
        "Personal care – washing, dressing, toileting",
        "Medication support and prompting",
        "Meal preparation and hydration monitoring",
        "Companionship and emotional support",
        "Light domestic help to maintain independence",
      ],
    },
    {
      icon: <FaBrain className="text-pink-600 text-3xl" />,
      title: "Elderly & Dementia Support",
      items: [
        "Dementia-friendly home support with structured routines",
        "Night or waking watch care for those with confusion or wandering",
        "Respite care for family carers",
        "All staff trained in dementia awareness and communication",
      ],
    },
    {
      icon: <MdOutlineHealthAndSafety className="text-pink-600 text-3xl" />,
      title: "Reablement and Recovery Support",
      items: [
        "Short-term goal-focused care after hospital discharge",
        "Support for recovery after illness or injury",
        "Work alongside occupational therapists and district nurses",
      ],
    },
    {
      icon: <FaHandsHelping className="text-pink-600 text-3xl" />,
      title: "Family and Carer Relief Services",
      items: [
        "Respite care at home (hourly, overnight, or weekend)",
        "Sitting services for families caring for vulnerable adults",
        "Emergency carer replacement for short notice needs",
      ],
    },
    {
      icon: <FaPeopleArrows className="text-pink-600 text-3xl" />,
      title: "Learning Disabilities & Autism Support",
      items: [
        "Support with daily living and community inclusion",
        "Life skills training – cooking, money management, communication",
        "Structured support plans for independence",
      ],
    },
    {
      icon: <FaLeaf className="text-pink-600 text-3xl" />,
      title: "Mental Health & Wellbeing Support",
      items: [
        "Low-level support for routine building, motivation, companionship",
        "Assistance with medication adherence",
        "Collaboration with community psychiatric nurses (CPNs)",
      ],
    },
    {
      icon: <GiFamilyHouse className="text-pink-600 text-3xl" />,
      title: "Supported Living / 24-Hour Packages",
      items: [
        "Support for people with complex needs in their own homes",
        "Suitable for individuals with learning disabilities or autism",
        "Typically commissioned by local authorities under framework contracts",
      ],
    },
    {
      icon: <FaUserMd className="text-pink-600 text-3xl" />,
      title: "Specialist Services (Phase 2 – Expansion)",
      items: [
        "Palliative and end-of-life care in collaboration with health professionals",
        "Complex care (PEG feeding, catheter, stoma care)",
        "Support for domestic abuse recovery and mental wellbeing",
      ],
    },
  ];

  return (

    <div>
    <div className=" max-w-3xl mx-auto text-center border-t border-gray-600 mb-16">

     <h2 className="text-4xl md:text-5xl font-bold mt-6 text-blue-700 mb-3">
          Recommended Home Care Services for Broxburn, Scotland
        </h2>
         <p className="text-gray-700 text-center mb-10 max-w-3xl mx-auto">
          Vybrant Care Services Scotland focuses on empowering individuals in Broxburn and West Lothian to live
          independently, safely, and with dignity in their own homes.
        </p>
    </div>
    <section className="flex flex-col lg:flex-row items-center mb-20 rounded-3xl bg-gray-50 py-20 px-6 md:px-12 gap-12">
      {/* Left: Image */}
      <motion.div
        className="w-full lg:w-1/2 relative rounded-3xl overflow-hidden shadow-2xl"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={broxburnImage}
          alt="Home Care in Broxburn"
          className="w-full h-[28rem] object-cover rounded-3xl"
        />
        
      </motion.div>

      {/* Right: Content */}
      <motion.div
        className="w-full lg:w-1/2 space-y-8"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
   

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl border border-pink-200 p-5 shadow-sm hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-3">
                {service.icon}
                <h3 className="font-semibold text-gray-800">{service.title}</h3>
              </div>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                {service.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
    </div>
  );
}
