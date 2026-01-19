import { useThemeClasses } from './ThemeAware';

export default function TechCredentials() {
  const themeClasses = useThemeClasses();
  
  return (
    <section className={`bg-gradient-to-r from-blue-600 to-purple-600 mt-20 rounded-[3rem] py-16 px-6`}>
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 relative inline-block">
          <span className="border-b border-white pb-2">Our Technical Expertise</span>
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* Years of Experience */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-white mb-2">8+</div>
            <div className="text-white opacity-90">Years Experience</div>
          </div>
          
          {/* Projects Completed */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-white mb-2">150+</div>
            <div className="text-white opacity-90">Projects Delivered</div>
          </div>
          
          {/* Client Satisfaction */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-white mb-2">98%</div>
            <div className="text-white opacity-90">Client Satisfaction</div>
          </div>
          
          {/* Response Time */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-white mb-2">24h</div>
            <div className="text-white opacity-90">Avg Response</div>
          </div>
        </div>

        {/* Technologies */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-left">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Technologies We Master</h3>
          
          {/* Frontend Technologies */}
          <div className="mb-6">
            <h4 className="font-semibold text-lg text-gray-800 mb-3">Frontend Development</h4>
            <div className="flex flex-wrap gap-2">
              {['React', 'Vue.js', 'Angular', 'TypeScript', 'Next.js', 'Nuxt.js', 'Tailwind CSS', 'SASS/SCSS'].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {/* Backend Technologies */}
          <div className="mb-6">
            <h4 className="font-semibold text-lg text-gray-800 mb-3">Backend Development</h4>
            <div className="flex flex-wrap gap-2">
              {['Node.js', 'Python', 'PHP', 'Laravel', 'Django', 'Express.js', 'PostgreSQL', 'MongoDB', 'MySQL'].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {/* Cloud & DevOps */}
          <div className="mb-6">
            <h4 className="font-semibold text-lg text-gray-800 mb-3">Cloud & DevOps</h4>
            <div className="flex flex-wrap gap-2">
              {['AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions', 'Vercel', 'Netlify'].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {/* E-commerce Platforms */}
          <div>
            <h4 className="font-semibold text-lg text-gray-800 mb-3">E-commerce & CMS</h4>
            <div className="flex flex-wrap gap-2">
              {['Shopify', 'WooCommerce', 'Magento', 'WordPress', 'Strapi', 'Contentful', 'Shopify Plus', 'BigCommerce'].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Certifications */}
        <div className="mt-8">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Professional Certifications</h3>
            <div className="flex flex-wrap justify-center gap-4 text-white opacity-90">
              <span>AWS Certified Developer</span>
              <span>•</span>
              <span>Google Cloud Professional</span>
              <span>•</span>
              <span>React Certified Developer</span>
              <span>•</span>
              <span>Shopify Partner</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
