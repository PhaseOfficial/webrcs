import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { 
  ExternalLink, 
  Code2, 
  Building2, 
  ArrowRight,
  Layout,
  Globe,
  CreditCard,
  Cloud,
  Banknote,
  Loader2 
} from 'lucide-react';
import { useThemeClasses } from './ThemeAware';
import { cn } from '../lib/utils'; 
import { supabase } from '../lib/supabaseClient'; // Ensure path is correct

// === 1. HELPER COMPONENT FOR LOGOS ===
const TechLogo = ({ name, className }) => {
  const slugMap = {
    'React': 'react',
    'Node.js': 'nodedotjs',
    'PostgreSQL': 'postgresql',
    'Docker': 'docker',
    'Next.js': 'nextdotjs',
    'Shopify': 'shopify',
    'Tailwind': 'tailwindcss',
    'Redis': 'redis',
    'TypeScript': 'typescript',
    'React Native': 'react',
    'NPM': 'npm',
    'Jest': 'jest',
    'Vue.js': 'vuedotjs',
    'Firebase': 'firebase',
    'Chart.js': 'chartdotjs',
    'WordPress': 'wordpress',
    'WooCommerce': 'woocommerce',
    'Python': 'python',
    'Django': 'django',
    'OpenAI': 'openai',
    'Vercel': 'vercel',
    'Framer Motion': 'framer',
    'MySQL': 'mysql',
    'PyTorch': 'pytorch'
  };

  // === CUSTOM ICONS FOR LOCAL TECH ===
  if (name === 'Paynow') return <CreditCard className={cn("w-4 h-4 text-blue-500", className)} />;
  if (name === 'Clicknpay') return <Banknote className={cn("w-4 h-4 text-emerald-500", className)} />;
  if (name === 'Chatbot') return <Cloud className={cn("w-4 h-4 text-sky-500", className)} />;
  if (name === 'AI Models') return <Code2 className={cn("w-4 h-4 text-purple-500", className)} />;

  const slug = slugMap[name];
  if (!slug) return null; 

  return (
    <img 
      src={`https://cdn.simpleicons.org/${slug}`} 
      alt={`${name} icon`}
      className={cn("w-4 h-4 object-contain dark:invert opacity-80 group-hover/pill:opacity-100 transition-opacity", className)} 
      loading="lazy"
    />
  );
};

const categories = [
  { id: 'all', name: 'All Work', icon: <Layout className="w-4 h-4" /> },
  { id: 'professional', name: 'Web & E-comm', icon: <Globe className="w-4 h-4" /> },
  { id: 'enterprise', name: 'Enterprise (ERP)', icon: <Building2 className="w-4 h-4" /> },
  { id: 'ai', name: 'AI & EdTech', icon: <Code2 className="w-4 h-4" /> }
];

const colorClasses = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-700 dark:text-blue-400',
    btn: 'bg-blue-600 hover:bg-blue-700'
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    text: 'text-purple-700 dark:text-purple-400',
    btn: 'bg-purple-600 hover:bg-purple-700'
  },
  green: {
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    text: 'text-emerald-700 dark:text-emerald-400',
    btn: 'bg-emerald-600 hover:bg-emerald-700'
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    text: 'text-orange-700 dark:text-orange-400',
    btn: 'bg-orange-600 hover:bg-orange-700'
  }
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15 
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };


export default function PortfolioShowcase() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const themeClasses = useThemeClasses();

  // === FETCH DATA FROM SUPABASE ===
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolio_items')
          .select('*')
          .order('sort_order', { ascending: true });

        if (error) throw error;

        // Transform snake_case DB fields to camelCase for component
        const formattedData = data.map(item => ({
            ...item,
            techStack: item.tech_stack // Map tech_stack (DB) to techStack (Component)
        }));

        setPortfolioItems(formattedData || []);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  if (loading) {
    return (
      <section className={cn("py-40 px-4 flex justify-center items-center", themeClasses.secondary)}>
        <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
      </section>
    );
  }

  return (
    <section className={cn("py-24 px-4 md:px-8 transition-colors duration-300", themeClasses.secondary)}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className={cn("text-4xl md:text-5xl font-extrabold mb-6 tracking-tight", themeClasses.text)}>
            Selected Works
          </h2>
          <p className={cn("text-xl max-w-2xl mx-auto leading-relaxed opacity-80", themeClasses.text)}>
            From AI-powered platforms and Enterprise ERPs to high-performance e-commerce solutions.
          </p>
        </motion.div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border backdrop-blur-md",
                activeCategory === cat.id
                  ? "bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-black dark:border-white shadow-xl"
                  : "bg-white/50 text-gray-600 border-gray-200 hover:border-gray-400 dark:border-zinc-800 dark:text-gray-400 dark:hover:border-zinc-600 dark:bg-zinc-900/50"
              )}
            >
              {cat.icon}
              {cat.name}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredItems.map((item) => {
              const style = colorClasses[item.color] || colorClasses.blue;
              
              return (
                <motion.div
                  key={item.id}
                  layout
                  variants={itemVariants} 
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  className={cn(
                    "group relative flex flex-col justify-between rounded-[2rem] p-8 border backdrop-blur-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2",
                    themeClasses.primary, 
                    "border-gray-100/50 dark:border-zinc-800/50 shadow-sm"
                  )}
                >
                  {/* Card Content Top */}
                  <div>
                    {/* Header Row */}
                    <div className="flex justify-between items-start mb-8">
                      <div className={cn(
                        "p-3.5 rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
                        style.bg
                      )}>
                        {/* Dynamic Icons based on Category */}
                        {item.category === 'ai' 
                          ? <Code2 className={cn("w-7 h-7", style.text)} />
                          : item.category === 'enterprise' 
                            ? <Building2 className={cn("w-7 h-7", style.text)} />
                            : <Globe className={cn("w-7 h-7", style.text)} />
                        }
                      </div>
                      <span className={cn(
                        "text-[11px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-md",
                        style.bg, style.text
                      )}>
                        {item.subtitle}
                      </span>
                    </div>

                    <h3 className={cn("text-2xl font-bold mb-4 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors", themeClasses.text)}>
                      {item.title}
                    </h3>
                    <p className={cn("text-base leading-relaxed mb-8 opacity-80 font-medium", themeClasses.text)}>
                      {item.description}
                    </p>

                    {/* Stats Row */}
                    <div className="flex gap-6 mb-8 pt-6 border-t border-gray-100/50 dark:border-zinc-800/50">
                      {item.results && Object.entries(item.results).map(([key, value]) => (
                        <div key={key}>
                          <div className={cn("text-xl font-extrabold tabular-nums", style.text)}>{value}</div>
                          <div className={cn("text-[10px] uppercase font-bold opacity-60 tracking-wider", themeClasses.text)}>{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Content Bottom */}
                  <div>
                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {item.techStack && item.techStack.map((tech, i) => (
                        <motion.span 
                          key={tech} 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + (i * 0.05) }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className={cn(
                            "group/pill flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-semibold rounded-xl border transition-all cursor-default",
                            "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50",
                            "dark:bg-zinc-800/50 dark:border-zinc-700/50 dark:text-gray-300 dark:hover:bg-zinc-800 dark:hover:border-zinc-600"
                          )}
                        >
                          <TechLogo name={tech} />
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Link Button */}
                    <motion.a 
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "flex items-center justify-center w-full py-3.5 rounded-xl text-white font-bold transition-all shadow-md hover:shadow-xl relative overflow-hidden",
                        style.btn,
                        item.link === '#' && "opacity-70 cursor-not-allowed" // Dim internal tools
                      )}
                      onClick={e => item.link === '#' && e.preventDefault()}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                      {item.link === '#' ? "Internal Tool" : "View Live Project"}
                      {item.link !== '#' && <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                      </span>
                    </motion.a>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* View More Link */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <motion.a 
            href="https://github.com/phaseofficial" 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "group inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1",
              themeClasses.button, 
              "bg-gradient-to-r from-gray-700 to-gray-900 text-white" 
            )}
          >
            <FaGithub className="w-6 h-6 mr-3" />
            See more on GitHub <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-2" />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}