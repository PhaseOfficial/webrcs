// Technology and platform partner logos (using text representations since we don't have actual logos)
import { useThemeClasses } from './ThemeAware';
const techPartners = [
  { name: "AWS", category: "Cloud Platform" },
  { name: "Google Cloud", category: "Cloud Platform" },
  { name: "Microsoft Azure", category: "Cloud Platform" },
  { name: "Vercel", category: "Deployment" },
  { name: "Netlify", category: "Deployment" }
];

const platformPartners = [
  { name: "Shopify", category: "E-commerce" },
  { name: "WordPress", category: "CMS" },
  { name: "Strapi", category: "Headless CMS" },
  { name: "Contentful", category: "Content Platform" },
  { name: "Stripe", category: "Payments" }
];

const clientIndustries = [
  { name: "Healthcare", icon: "🏥" },
  { name: "Fintech", icon: "💳" },
  { name: "E-commerce", icon: "🛒" },
  { name: "Education", icon: "🎓" },
  { name: "Real Estate", icon: "🏠" },
  { name: "Manufacturing", icon: "🏭" },
  { name: "Food & Beverage", icon: "🍔" },
  { name: "Travel & Hospitality", icon: "✈️" }
];

const PartnersSection = () => {
  const themeClasses = useThemeClasses();
  
  return (
    <section className={`rounded-[3rem] mb-10 mt-20 py-12 ${themeClasses.primary}`}>
      <div className="max-w-6xl mx-auto text-center px-4">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-10">
          Technology Partners <span className="text-blue-600">|</span> Platforms <span className="text-blue-600">|</span> Industries
        </h2>

        {/* Technology Partners */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-700 mb-6">Cloud & Development Platforms</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-items-center">
            {techPartners.map((partner, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 w-full text-center hover:bg-blue-50 transition-colors">
                <div className="text-2xl font-bold text-gray-800 mb-1">{partner.name}</div>
                <div className="text-sm text-gray-500">{partner.category}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Partners */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-700 mb-6">E-commerce & CMS Platforms</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-items-center">
            {platformPartners.map((partner, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 w-full text-center hover:bg-green-50 transition-colors">
                <div className="text-2xl font-bold text-gray-800 mb-1">{partner.name}</div>
                <div className="text-sm text-gray-500">{partner.category}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Industries */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-6">Industries We Serve</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {clientIndustries.map((industry, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                <div className="text-3xl mb-2">{industry.icon}</div>
                <div className="font-semibold text-gray-800">{industry.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
          <p className="text-gray-700 mb-4">
            <strong>Trusted by businesses worldwide</strong> - From startups to enterprise clients across diverse industries
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <span>✓ 150+ Projects Delivered</span>
            <span>✓ 50+ Happy Clients</span>
            <span>✓ 98% Success Rate</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
