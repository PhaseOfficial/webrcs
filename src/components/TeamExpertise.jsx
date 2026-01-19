import { motion } from 'framer-motion';
import { Code, Database, Palette, Cloud, Shield, Zap, Users, Award } from 'lucide-react';
import { useThemeClasses } from './ThemeAware';

const teamMembers = [
  {
    name: 'Alex Johnson',
    role: 'Full Stack Developer',
    specialty: 'React & Node.js',
    experience: '6 years',
    image: '👨‍💻',
    skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL'],
    description: 'Expert in building scalable web applications with modern JavaScript frameworks and cloud deployment.'
  },
  {
    name: 'Sarah Chen',
    role: 'Frontend Architect',
    specialty: 'UI/UX & Performance',
    experience: '5 years',
    image: '👩‍💻',
    skills: ['Vue.js', 'Angular', 'CSS3', 'Tailwind', 'Figma'],
    description: 'Specializes in creating beautiful, responsive user interfaces with focus on performance optimization.'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Backend Specialist',
    specialty: 'Enterprise Solutions',
    experience: '8 years',
    image: '👨‍💼',
    skills: ['Python', 'Django', 'AWS', 'Docker', 'MongoDB'],
    description: 'Builds robust backend systems and enterprise-grade applications with security and scalability in mind.'
  },
  {
    name: 'Emily Thompson',
    role: 'DevOps Engineer',
    specialty: 'Cloud & Infrastructure',
    experience: '7 years',
    image: '👩‍🔧',
    skills: ['AWS', 'Kubernetes', 'CI/CD', 'Terraform', 'Monitoring'],
    description: 'Ensures reliable deployment and infrastructure management for projects of all scales.'
  }
];

const expertiseAreas = [
  {
    icon: <Code className="w-8 h-8" />,
    title: 'Frontend Development',
    description: 'Modern, responsive web applications using React, Vue.js, Angular, and TypeScript.',
    technologies: ['React', 'Vue.js', 'Angular', 'TypeScript', 'Tailwind CSS'],
    color: 'blue'
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: 'Backend Development',
    description: 'Scalable APIs and server-side applications with modern frameworks and databases.',
    technologies: ['Node.js', 'Python', 'PHP', 'PostgreSQL', 'MongoDB'],
    color: 'green'
  },
  {
    icon: <Cloud className="w-8 h-8" />,
    title: 'Cloud & DevOps',
    description: 'Cloud infrastructure setup, deployment automation, and performance optimization.',
    technologies: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'CI/CD'],
    color: 'purple'
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: 'UI/UX Design',
    description: 'User-centered design solutions that enhance user experience and drive conversions.',
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
    color: 'orange'
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Security & Performance',
    description: 'Enterprise-grade security implementation and performance optimization strategies.',
    technologies: ['OAuth', 'SSL/TLS', 'Performance Monitoring', 'Security Audits'],
    color: 'red'
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'E-commerce Solutions',
    description: 'Complete e-commerce platforms with payment integration and inventory management.',
    technologies: ['Shopify', 'WooCommerce', 'Stripe', 'Payment APIs', 'Analytics'],
    color: 'indigo'
  }
];

const stats = [
  { label: 'Team Members', value: '12+', icon: <Users className="w-6 h-6" /> },
  { label: 'Years Combined', value: '50+', icon: <Award className="w-6 h-6" /> },
  { label: 'Technologies', value: '25+', icon: <Code className="w-6 h-6" /> },
  { label: 'Certifications', value: '15+', icon: <Shield className="w-6 h-6" /> }
];

const colorClasses = {
  blue: 'bg-blue-50 border-blue-200 text-blue-600',
  green: 'bg-green-50 border-green-200 text-green-600',
  purple: 'bg-purple-50 border-purple-200 text-purple-600',
  orange: 'bg-orange-50 border-orange-200 text-orange-600',
  red: 'bg-red-50 border-red-200 text-red-600',
  indigo: 'bg-indigo-50 border-indigo-200 text-indigo-600'
};

export default function TeamExpertise() {
  const themeClasses = useThemeClasses();
  
  return (
    <section className={`py-20 px-6 ${themeClasses.primary}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet Our Expert Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our talented team of developers, designers, and engineers brings together diverse expertise 
            to deliver exceptional web development solutions.
          </p>
        </motion.div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl"
            >
              <div className="text-blue-600 mb-3 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Team Members */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">Core Team Members</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border"
              >
                <div className="text-center mb-4">
                  <div className="text-6xl mb-3">{member.image}</div>
                  <h4 className="text-xl font-bold text-gray-900">{member.name}</h4>
                  <p className="text-blue-600 font-medium">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.specialty}</p>
                  <p className="text-gray-500 text-xs">{member.experience} experience</p>
                </div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {member.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {member.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Expertise Areas */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">Our Expertise</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertiseAreas.map((area, index) => {
              const colorClass = colorClasses[area.color];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`p-6 rounded-2xl border-2 ${colorClass}`}
                >
                  <div className="mb-4">
                    {area.icon}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {area.title}
                  </h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {area.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {area.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-white bg-opacity-80 text-gray-700 text-sm rounded-full border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Work with Our Expert Team?
            </h3>
            <p className="mb-6 opacity-90">
              Let's discuss your project and see how our diverse expertise can bring your vision to life.
            </p>
            <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors">
              Meet the Team
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}