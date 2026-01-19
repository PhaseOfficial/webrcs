import { useEffect, useRef } from 'react';
import { useThemeClasses } from './ThemeAware';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { 
  Code2, 
  Database, 
  Cloud, 
  ShoppingCart, 
  CreditCard, 
  Award, 
  Clock, 
  Users, 
  CheckCircle2
} from 'lucide-react';
import { cn } from '../lib/utils'; 

// === COUNTER COMPONENT ===
function Counter({ value, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Parse the number and the suffix (e.g., "150+" -> 150 and "+")
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, ''); // Extracts +, %, <, etc.
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
    duration: 2 // Slower, smoother Apple-like ease
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(numericValue);
    }
  }, [isInView, numericValue, motionValue]);

  // Update text content directly for performance
  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        // Check if original value started with special char (like <24h)
        const prefix = value.startsWith('<') ? '<' : '';
        // Remove prefix from suffix to avoid duplication if regex caught it
        const cleanSuffix = suffix.replace('<', ''); 
        
        ref.current.textContent = `${prefix}${Math.round(latest)}${cleanSuffix}`;
      }
    });
    return () => unsubscribe();
  }, [springValue, suffix, value]);

  return <span ref={ref} className={className}>{0}{suffix}</span>;
}

const techCategories = [
  {
    title: "Frontend & Experience",
    icon: Code2,
    skills: ['React', 'Vue.js', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion']
  },
  {
    title: "Backend & Data",
    icon: Database,
    skills: ['Node.js', 'Python', 'Laravel', 'PostgreSQL', 'MongoDB', 'Redis']
  },
  {
    title: "Cloud Infrastructure",
    icon: Cloud,
    skills: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'CI/CD', 'Vercel']
  },
  {
    title: "E-commerce Platforms",
    icon: ShoppingCart,
    skills: ['Shopify', 'WooCommerce', 'Magento', 'Shopify Plus']
  },
  {
    title: "Payments & Local Integrations",
    icon: CreditCard,
    isHighlight: true,
    skills: ['Paynow', 'Clicknpay', 'ZIMRA Fiscalisation', 'PayPal', 'Stripe', 'EcoCash API']
  }
];

const stats = [
  { label: "Projects Shipped", value: "150+", icon: CheckCircle2 },
  { label: "Client Satisfaction", value: "98%", icon: Users },
  { label: "Response Time", value: "<24h", icon: Clock },
];

const companyLogos = ["RG", "FS", "AT", "EC", "LG", "HP"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", mass: 0.8, stiffness: 75, damping: 15 }
  }
};

export default function TechCredentials() {
  const themeClasses = useThemeClasses();

  return (
    <section className={cn("py-24 px-4 md:px-8 transition-colors duration-300", themeClasses.secondary)}>
      <div className="max-w-[1100px] mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 className={cn("text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight", themeClasses.text)}>
            Engineering excellence.
          </h2>
          <p className={cn("text-xl max-w-2xl mx-auto font-medium leading-relaxed opacity-70", themeClasses.text)}>
            Global standards met with deep local expertise. We build robust, scalable solutions designed for the Zimbabwean market and beyond.
          </p>
        </motion.div>

        {/* Stats Section with Counting Numbers */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 pb-12 border-b border-gray-200 dark:border-zinc-800"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="text-center flex flex-col items-center"
            >
              <stat.icon strokeWidth={1.5} size={32} className="opacity-40 mb-4" />
              
              <div className={cn("text-5xl md:text-6xl font-extrabold mb-2 tracking-tighter tabular-nums", themeClasses.text)}>
                {/* Replaced static text with Counter component */}
                <Counter value={stat.value} />
              </div>
              
              <div className={cn("text-sm font-semibold uppercase tracking-widest opacity-60", themeClasses.text)}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Tech Card */}
        <motion.div 
          initial={{ opacity: 0, y: 60, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "rounded-[2.5rem] p-8 md:p-16 backdrop-blur-xl border shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]",
            themeClasses.primary, 
            "border-gray-100/50 dark:border-zinc-800/50" 
          )}
        >
          <div className="text-center mb-16">
             <p className="text-sm font-bold opacity-40 uppercase tracking-[0.2em] mb-4">Trusted by Leaders</p>
             <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {companyLogos.map((initials, idx) => (
                 <div key={idx} className={cn("text-2xl font-bold", themeClasses.text)}>{initials}</div>
              ))}
             </div>
          </div>

          <h3 className={cn("text-3xl font-bold text-center mb-12 tracking-tight", themeClasses.text)}>
            Our Technology Stack
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {techCategories.map((cat, idx) => (
              <div key={idx} className="space-y-5">
                <div className="flex items-center gap-3 mb-4">
                  <cat.icon strokeWidth={1.75} className={`w-6 h-6 ${cat.isHighlight ? 'text-blue-600 dark:text-blue-400' : 'opacity-70'}`} />
                  <h4 className={cn("text-xl font-bold tracking-tight", cat.isHighlight ? 'text-blue-600 dark:text-blue-400' : themeClasses.text)}>
                    {cat.title}
                  </h4>
                </div>
                
                <div className="flex flex-wrap gap-2.5">
                  {cat.skills.map((tech) => (
                    <motion.span 
                      key={tech}
                      whileHover={{ scale: 1.03 }}
                      className={cn(
                        "px-4 py-2 rounded-xl text-[13px] font-semibold transition-all cursor-default border backdrop-blur-md",
                        cat.isHighlight
                          ? "bg-blue-100 border-blue-200 text-blue-900 dark:bg-blue-900/40 dark:border-blue-800/50 dark:text-blue-200"
                          : "bg-gray-100/80 border-gray-200/60 text-gray-800 dark:bg-zinc-800/50 dark:border-zinc-700/30 dark:text-zinc-300"
                      )}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-10 border-t border-gray-100 dark:border-zinc-800 flex flex-wrap justify-center gap-6 text-center">
            {[
              "AWS Certified",
              "Google Cloud Pro",
              "Shopify Experts",
              "ZIMRA Integrated"
            ].map((cert, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-medium opacity-60 hover:opacity-100 transition-opacity">
                <Award strokeWidth={2} className="w-4 h-4" />
                {cert}
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}