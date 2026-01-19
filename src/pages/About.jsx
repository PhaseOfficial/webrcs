import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { motion } from 'framer-motion';
import Contactus from '../components/Contactus';
import Kabirat from '../assets/Kabirat.png';
import Kudzi from '../assets/Kudzi.png';
import Rasna from '../assets/Rasna.png';
import Shamli from '../assets/Shamli.png'
import Tincy from '../assets/Tincy.jpeg';
import Tsitsi from '../assets/Tsitsi.png';
import { FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router-dom';
import jeanImage from '../assets/jean.webp';
import image1 from "../assets/qt=q_95.webp";
import Given from '../assets/Given.jpg';
import Bright from '../assets/Bright.png';
import Exploreprod from '../components/Exploreprod';


const About = () => {
  return (
<div> <div>
    <Navbar />
    <div>
    <div className="bg-cover bg-center h-screen" >
      {/* Hero Section */}
      <section
  className="relative flex mb-10 items-center p-8 rounded-[3rem] mt-20 flex-col md:pt-20 md:p-12 md:pb-20 sd:p-8 overflow-hidden"
>
  {/* Blurred background layer */}
  <div
    className="absolute inset-0 bg-cover bg-center filter  scale-100"
    style={{
      backgroundImage: `url(https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExenR4emkxZXNhNHFsMGJ2ZG9zMTdiYzFqYTA2a2o2aWJqaGpoamhkbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/zhlIlhaXhO21T6NGzB/giphy.gif)`,
    }}
  ></div>

  {/* Optional dark overlay for contrast */}
  <div className="absolute inset-0 bg-black/30 text-blue-900"></div>

        <div className="container mx-auto text-center mt-20 relative z-10 text-white">
        <img
      src={image1}
      alt="Company Logo"
      className="h-40 w-auto center mx-auto mb-6"
    />
          <h1 className="text-4xl font-bold mb-10">About Us</h1>
          <p className="text-2xl mb-4 ">Vybrant Care Services is a 
          trusted home care provider supporting individuals across South Yorkshire and the 
          East Riding of Yorkshire. We’re passionate about delivering high-quality, personalised
           care that enables people to maintain their independence and
           continue living comfortably in their own homes for as long as possible.</p>
        </div>
        
      </section>
      <Exploreprod />

      {/* Company Description */}
      <section className="py-20 mt-10 mb-20 rounded-[3rem] bg-gray-100">
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="container mx-auto px-6 md:px-12"
  >


    {/* Registered Manager Section */}
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12 text-pink-600">
        About Our Registered Manager
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-10">
        
        {/* Text */}
        <div className="flex-1 text-gray-700 text-lg leading-relaxed">
          <p>
            Jean Sigauke is a committed General Nurse with over two decades of 
            experience at Sheffield Teaching Hospitals NHS Trust and Sheffield 
            Health and Social Care.
          </p>
          <p className="mt-4">
            Known for delivering compassionate and high-quality care, she leads 
            with a person-centred approach, empowering her team to support 
            independence, dignity, and wellbeing.
          </p>
        </div>

        {/* Image */}
        <div className="flex-shrink-0">
          <img
            src={jeanImage}
            alt="Jean Sigauke - Registered Manager"
            className="rounded-2xl shadow-lg w-64 h-64 md:w-80 md:h-80 object-cover"
          />
        </div>

      </div>
    </div>
  </motion.div>
</section>

 
    <section className="max-w-6xl mx-auto mb-20 px-6 md:px-8 text-gray-800">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-gray-900">
          About Our Staff
        </h2>
        <p className="text-xl font-semibold text-blue-700">
          Committed to Making a Difference
        </p>
        <p className="mt-3 text-lg text-gray-600">
          Enjoy life with support from compassionate caregivers in Sheffield
        </p>
      </div>

      {/* Section 1: Compassionate Care */}
      <div className="bg-gray-50 rounded-3xl p-8 shadow-sm mb-10">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          Compassionate and Dedicated Team
        </h3>
        <p className="text-gray-700 leading-relaxed">
          At <span className="font-semibold text-blue-700">Vybrant Care Services</span>,
          our dedicated team is committed to serving with compassion, respect,
          and professionalism. We go beyond providing care  we build trusting
          relationships and treat every individual with the dignity they
          deserve.
        </p>
        <p className="mt-4 text-gray-700 leading-relaxed">
          Our carers are carefully selected and trained to deliver the highest
          standards of support, always putting your needs first and working with
          genuine heart and purpose.
        </p>
      </div>

      {/* Section 2: Quality & Compliance */}
      <div className="bg-gray-50 rounded-3xl p-8 shadow-sm">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          Committed to Quality and Compliance
        </h3>
        <p className="text-gray-700 leading-relaxed">
          Professional caregiving across{" "}
          <span className="font-semibold text-blue-700">
            South Yorkshire
          </span>{" "}
          and{" "}
          <span className="font-semibold text-blue-700">
            East Riding of Yorkshire
          </span>
          .
        </p>
        <p className="mt-4 text-gray-700 leading-relaxed">
          At <span className="font-semibold text-blue-700">Vybrant Care Services</span>,
          we ensure all our staff meet the standards set by the{" "}
          <span className="font-semibold">Care Quality Commission (CQC)</span>.
          From thorough recruitment and ongoing training to regular supervision
          and performance reviews, we are dedicated to maintaining high-quality
          care and upholding the values of safety, compassion, and
          professionalism in everything we do.
        </p>
      </div>

    </section>
      {/* Team Section */}
<section className="py-12 rounded-[3rem] bg-gray-100">
  <div className="container mx-auto px-6 md:px-12">
    <h2 className="text-3xl font-bold text-center mb-8">Meet Some of Our Team</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Team Member 1 */}
      <div className="text-center">
        <img
          src={Kabirat}
          alt="Team Member"
          className="mx-auto rounded-full h-32 mb-4"
        />
        <h3 className="text-xl font-bold">Kabirat Ogunjimi
 </h3>
        
        <a
          href="https://www.linkedin.com/in/kabirat-ogunjimi-13b01b135/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
        >
          <FaLinkedin size={24} />
        </a>
      </div>
      {/* Team Member 2 */}
      <div className="text-center">
        <img
          src={Kudzi}
          alt="Team Member"
          className="mx-auto rounded-full h-32 mb-4"
        />
        <h3 className="text-xl font-bold">Kudzi</h3>
      
        <a
          href="https://www.linkedin.com/in/christopher-vutete-603b8166/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
        >
          <FaLinkedin size={24} />
        </a>
      </div>
      {/* Team Member 3 */}
      <div className="text-center">
        <img
          src={Rasna}
          alt="Team Member"
          className="mx-auto rounded-full h-32 mb-4"
        />
        <h3 className="text-xl font-bold">Rasna</h3>
        
        <a
          href="https://www.linkedin.com/in/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
        >
          <FaLinkedin size={24} />
        </a>
      </div>
       {/* Team Member 3 */}
       <div className="text-center">
        <img
          src={Tincy}
          alt="Team Member"
          className="mx-auto rounded-full h-32 mb-4"
        />
        <h3 className="text-xl font-bold">Tincy Brijin Freeda</h3>
       
        <a
          href="https://www.linkedin.com/in/tincybf15122001/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
        >
          <FaLinkedin size={24} />
        </a>
      </div>

      <div className="text-center">
        <img
          src={Shamli}
          alt="Team Member"
          className="mx-auto rounded-full h-32 mb-4"
        />
        <h3 className="text-xl font-bold">Shamli</h3>
        
        <a
          href="https://www.linkedin.com/in/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
        >
          <FaLinkedin size={24} />
        </a>
      </div>

      <div className="text-center">
        <img
          src={Tsitsi}
          alt="Team Member"
          className="mx-auto rounded-full h-32 mb-4"
        />
        <h3 className="text-xl font-bold">Tsitsi Svosve</h3>
        
        <a
          href="https://www.linkedin.com/in/tsitsi-svosve-5a3835108/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
        >
          <FaLinkedin size={24} />
        </a>
      </div>

<div className="text-center">
        <img
          src={jeanImage}
          alt="Team Member"
          className="mx-auto rounded-full h-32 mb-4"
        />
        <h3 className="text-xl font-bold">Jean Sigauke</h3>
        
        <a
          href="https://www.linkedin.com/in/gincigaz/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
        >
          <FaLinkedin size={24} />
        </a>
      </div>


      <div className="text-center">
        <img
          src={Given}
          alt="Team Member"
          className="mx-auto rounded-full h-32 mb-4"
        />
        <h3 className="text-xl font-bold">Given Sigauke</h3>
      
        <a
          href="https://www.linkedin.com/in/given-sigauke-0abab023b/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
        >
          <FaLinkedin size={24} />
        </a>
      </div>


      <div className="text-center">
        <img
          src={Bright}
          alt="Team Member"
          className="mx-auto rounded-full h-32 mb-4"
        />
        <h3 className="text-xl font-bold">Bright Murewa</h3>
        
        <a
          href="https://www.linkedin.com/in/bright-murewa-fcca-3116a474/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
        >
          <FaLinkedin size={24} />
        </a>
      </div>


    </div>
  </div>
</section>
      <Contactus className="mt-20"/>
   <Footer className="mb-10"/>
    </div>
    </div>
    
    </div>

    </div>
   
    
  )
}
export default About;