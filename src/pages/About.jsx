import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { motion } from 'framer-motion';

import { FaLinkedin, FaGithub } from "react-icons/fa";
import { ArrowRight, Code2, Rocket, Users, Target } from 'lucide-react';
import Logo from "/weblogo.png";
import Contactus from '../components/Contactus';
import { useThemeClasses } from '../components/ThemeAware';

import PAmhonde from '../assets/pamhonde.png';
import Cvutete from '../assets/cvutete.png';
import Cchadiwa from '../assets/cchadiwa.png';
import gowani from '../assets/gowani.jpg';

// Team data
const teamMembers = [
  {
    name: "Arthur Mhonde",
    role: "CEO",
    bio: "A visionary leader with a passion for digital innovation and strategic growth, guiding Red Cup Series to new heights.",
    image: PAmhonde,
    linkedin: "https://www.linkedin.com/in/panashe-arthur-mhonde-2917b6261/",
    github: "#",
  },
  {
    name: "Christopher Vutete",
    role: "Managing Director",
    bio: "With extensive experience in operations and management, Christopher ensures the smooth and efficient running of all projects.",
    image: Cvutete,
    linkedin: "https://www.linkedin.com/in/christopher-vutete-603b8166/",
    github: "#",
  },
  {
    name: "Craig Chadiwa",
    role: "CTO",
    bio: "A brilliant technologist leading our development teams, constantly exploring new frontiers in web technology.",
    image: Cchadiwa,
    linkedin: "https://www.linkedin.com/in/craig-chadiwa-16485724a/",
    github: "#",
  },
  {
    name: "Gamuchirai Gowani",
    role: "Head of Marketing",
    bio: "Driving our brand's voice and outreach, Gamuchirai connects Red Cup Series with clients and communities.",
    image: gowani,
    linkedin: "https://www.linkedin.com/in/", // Placeholder as provided
    github: "#",
  },
];

const stats = [
  { label: "Years Experience", value: "4+" },
  { label: "Projects Shipped", value: "150+" },
  { label: "Happy Clients", value: "30+" },
];

const TeamCard = ({ member, index, themeClasses }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group relative"
  >
    <div className={`relative overflow-hidden rounded-2xl ${themeClasses.background} ${themeClasses.border} shadow-sm hover:shadow-xl transition-all duration-300`}>
      {/* Image Container */}
      <div className="aspect-square overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Social Icons on Hover */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 z-20 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <a href={member.linkedin} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-blue-600 transition-colors"><FaLinkedin /></a>
          <a href={member.github} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-colors"><FaGithub /></a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className={`text-xl font-bold ${themeClasses.text}`}>{member.name}</h3>
        <p className="text-red-600 font-medium text-sm mb-2">{member.role}</p>
        <p className={`${themeClasses.textSecondary} text-sm leading-relaxed`}>
          {member.bio}
        </p>
      </div>
    </div>
  </motion.div>
);

const About = () => {
  const themeClasses = useThemeClasses();
  return (
    <div className={`min-h-screen font-sans ${themeClasses.background}`}>
      <Navbar />

      {/* === HERO SECTION === */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-red-500/10 blur-[120px] rounded-full mix-blend-screen" />
           <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img src={Logo} alt="Red Cup Series Logo" className="h-24 w-auto mx-auto mb-8" />
            <span className={`inline-block py-1 px-3 rounded-full bg-red-50 ${themeClasses.backgroundOpposite} ${themeClasses.textSecondary} text-sm font-semibold mb-6 ${themeClasses.border}`}>
              Who We Are
            </span>
            <h1 className={`text-5xl md:text-7xl font-bold ${themeClasses.text} tracking-tight mb-6`}>
              Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Digital Future.</span>
            </h1>
            <p className={`text-xl ${themeClasses.textSecondary} max-w-2xl mx-auto leading-relaxed`}>
              Red Cup Series is more than a creative agency. We are your strategic partners in navigating the complex digital landscape, crafting experiences that matter.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className={`grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl mx-auto mt-16 ${themeClasses.border} py-8`}
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className={`text-3xl md:text-4xl font-bold ${themeClasses.text} mb-1`}>{stat.value}</div>
                <div className={`text-sm ${themeClasses.textSecondary} font-medium uppercase tracking-wider`}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === STORY & MISSION GRID === */}
      <section className={`py-20 ${themeClasses.backgroundSecondary}`}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left: Our Story */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4 text-red-600 font-bold">
                <Rocket className="w-5 h-5" />
                <span>Our Story</span>
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold ${themeClasses.text} mb-6`}>
                From a simple idea to a <br className="hidden md:block"/> digital powerhouse.
              </h2>
              <p className={`${themeClasses.textSecondary} text-lg leading-relaxed mb-6`}>
                Founded in 2024, Red Cup Series started with a singular vision: to democratize high-quality web development. What began as late-night coding sessions has evolved into a full-service agency driven by passion.
              </p>
              <p className={`${themeClasses.textSecondary} text-lg leading-relaxed`}>
                We bridge the gap between complex technology and intuitive user experiences, ensuring every pixel serves a purpose.
              </p>
            </motion.div>

            {/* Right: Visual/Mission */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-red-600 to-orange-500 rounded-3xl rotate-3 opacity-20 blur-sm"></div>
              <div className={`relative ${themeClasses.background} p-8 md:p-10 rounded-3xl ${themeClasses.border} shadow-xl`}>
                <div className="flex items-center gap-2 mb-6 text-orange-600 font-bold">
                  <Target className="w-5 h-5" />
                  <span>Our Mission</span>
                </div>
                <h3 className={`text-2xl font-bold ${themeClasses.text} mb-4`}>
                  Empowering Growth Through Innovation
                </h3>
                <ul className="space-y-4">
                  {[
                    "Deliver pixel-perfect, high-performance websites.",
                    "Provide accessible AI solutions for local businesses.",
                    "Build long-term partnerships based on trust.",
                    "Push the boundaries of creative design."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className={`mt-1 bg-green-100 ${themeClasses.backgroundOpposite} p-1 rounded-full`}>
                         <div className="w-2 h-2 bg-green-500 rounded-full" />
                      </div>
                      <span className={`${themeClasses.textSecondary}`}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === TEAM SECTION === */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className={`text-3xl md:text-5xl font-bold ${themeClasses.text} mb-4`}>Meet The Minds</h2>
            <p className={`${themeClasses.textSecondary} text-lg`}>
              A diverse team of creators, problem solvers, and tech enthusiasts united by a passion for excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamCard key={index} member={member} index={index} themeClasses={themeClasses} />
            ))}
          </div>
          
          <div className="mt-20 text-center">
             <p className={`${themeClasses.textSecondary} mb-6`}>Want to join our team?</p>
             <a href="/#/Careers" className="inline-flex items-center gap-2 text-red-600 font-bold hover:gap-3 transition-all">
                See Open Positions <ArrowRight className="w-4 h-4" />
             </a>
          </div>
        </div>
      </section>

      <Contactus className="mt-20" />
      <Footer />
    </div>
  );
};

export default About;