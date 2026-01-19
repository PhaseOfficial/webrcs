import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code, TrendingUp, ShoppingCart, Building2 } from 'lucide-react';
import { useThemeClasses } from './ThemeAware';

const portfolioItems = [
  {
    id: 1,
    category: 'startup',
    title: 'TechFlow - SaaS Dashboard',
    subtitle: 'Startup MVP Development',
    description: 'Complete SaaS platform with user authentication, billing integration, and real-time analytics dashboard.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
    results: {
      users: '10K+',
      growth: '300%',
      timeframe: '3 months'
    },
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'blue'
  },
  {
    id: 2,
    category: 'enterprise',
    title: 'DataFlow Enterprise',
    subtitle: 'Corporate Data Management System',
    description: 'Enterprise-grade platform handling millions of records with advanced security, role-based access, and API integrations.',
    techStack: ['Vue.js', 'Python', 'Django', 'Redis', 'Docker', 'Kubernetes'],
    results: {
      efficiency: '85%',
      records: '5M+',
      users: '1K+'
    },
    icon: <Building2 className="w-6 h-6" />,
    color: 'purple'
  },
  {
    id: 3,
    category: 'ecommerce',
    title: 'Luxury Fashion Store',
    subtitle: 'E-commerce Platform',
    description: 'High-converting e-commerce platform with advanced product filtering, inventory management, and mobile optimization.',
    techStack: ['Next.js', 'Shopify', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    results: {
      conversion: '45%',
      revenue: '$2M+',
      traffic: '200%'
    },
    icon: <ShoppingCart className="w-6 h-6" />,
    color: 'green'
  }
];

const categories = [
  { id: 'all', name: 'All Projects', icon: <Code className="w-4 h-4" /> },
  { id: 'startup', name: 'Startups', icon: <TrendingUp className="w-4 h-4" /> },
  { id: 'enterprise', name: 'Enterprise', icon: <Building2 className="w-4 h-4" /> },
  { id: 'ecommerce', name: 'E-commerce', icon: <ShoppingCart className="w-4 h-4" /> }
];

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-600',
    button: 'bg-blue-600 hover:bg-blue-700'
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-600',
    button: 'bg-purple-600 hover:bg-purple-700'
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-600',
    button: 'bg-green-600 hover:bg-green-700'
  }
};

export default function PortfolioShowcase() {
  const [activeCategory, setActiveCategory] = useState('all');
  const themeClasses = useThemeClasses();

  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section className={`py-20 px-6 ${themeClasses.secondary}`}>
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
            Our Portfolio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our recent projects and see how we have helped businesses transform their digital presence 
            across startups, enterprise solutions, and e-commerce platforms.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              {category.icon}
              {category.name}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => {
            const colors = colorClasses[item.color];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${colors.bg} ${colors.border} border-2 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 group`}
              >
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`${colors.text} text-6xl`}>
                      {item.icon}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className={`${colors.bg} ${colors.border} border px-3 py-1 rounded-full text-sm font-medium ${colors.text}`}>
                      {item.subtitle}
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Tech Stack:</h4>
                    <div className="flex flex-wrap gap-1">
                      {item.techStack.map((tech) => (
                        <span 
                          key={tech}
                          className="px-2 py-1 bg-white text-gray-700 text-xs rounded border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Key Results:</h4>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      {Object.entries(item.results).map(([key, value]) => (
                        <div key={key} className="bg-white rounded p-2">
                          <div className={`text-lg font-bold ${colors.text}`}>{value}</div>
                          <div className="text-xs text-gray-500 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className={`w-full ${colors.button} text-white font-semibold py-2 px-4 rounded-xl transition-colors duration-300 flex items-center justify-center group`}>
                    View Case Study
                    <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-600 mb-6">
              Let us discuss how we can bring your vision to life with cutting-edge technology and expert development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-xl hover:bg-blue-700 transition-colors">
                View Full Portfolio
              </button>
              <button className="border-2 border-blue-600 text-blue-600 font-semibold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors">
                Start Your Project
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}