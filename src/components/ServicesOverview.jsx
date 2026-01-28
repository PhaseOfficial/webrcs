import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, ShoppingCart, Building2, Check, Mail, Loader2, Plus, Minus } from 'lucide-react'; 
import ZimraLogo from '../assets/Zimra-logo.webp';
import { useThemeClasses } from './ThemeAware';
import { Button } from './button'; 
import { supabase } from '../lib/supabaseClient'; 
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from './ui/card';
import { cn } from '../lib/utils'; 

const ICON_MAP = {
  'Code': Code,
  'ShoppingCart': ShoppingCart,
  'Building2': Building2,
  'Mail': Mail
};

const ServiceCard = ({ service, index, themeClasses }) => {
  // Default to closed unless recommended
  const [isOpen, setIsOpen] = useState(service.recommended);

  const renderIcon = () => {
    if (service.icon_name === 'ZimraLogo') {
      return <img src={ZimraLogo} alt="ZIMRA Logo" className="w-10 h-auto" />;
    }
    const IconComponent = ICON_MAP[service.icon_name] || Code;
    return <IconComponent className={cn("w-6 h-6", service.recommended ? "text-gray-500" : "light:text-gray-300 dark:text-gray-300")} />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="h-full pt-4" /* Added pt-4 to give space for the badge */
    >
      <Card
        className={cn(
          "relative flex flex-col transition-all duration-300 rounded-xl",
          // REMOVED overflow-hidden from here so badge isn't clipped
          themeClasses.primary, 
          "border-gray-200 shadow-sm hover:shadow-lg",
          "dark:border-zinc-800",
          service.recommended 
            ? "border-primary ring-2 ring-primary/20 shadow-xl z-10" 
            : ""
        )}
      >
        {/* FIXED BADGE */}
        {service.recommended && (
          <div className="absolute -top-4 left-0 right-0 mx-auto w-fit z-20">
             <span className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full shadow-md flex items-center gap-1">
               Most Popular
             </span>
          </div>
        )}

        {/* === HEADER === */}
        <CardHeader className="text-center pt-8 pb-4 relative">
            {/* Toggle Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors z-10"
            >
                {isOpen ? (
                    <Minus className="w-5 h-5 text-gray-500" />
                ) : (
                    <Plus className="w-5 h-5 text-gray-500" />
                )}
            </button>

          <div className="flex justify-center mb-4">
            <div className={cn(
              "p-3 rounded-full transition-colors",
              service.recommended ? "bg-primary/20" : "bg-gray-100 dark:bg-zinc-800"
            )}>
               {renderIcon()}
            </div>
          </div>
          <CardTitle className={cn("text-xl font-bold", themeClasses.text)}>
            {service.title}
          </CardTitle>
          <CardDescription className="font-medium text-primary/90 dark:text-primary/80 mt-1">
            {service.subtitle}
          </CardDescription>
          
          {/* Price Preview (Visible when collapsed) */}
          {!isOpen && (
             <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className={cn("mt-2 font-bold text-lg", themeClasses.text)}
             >
                {service.price}
             </motion.div>
          )}
        </CardHeader>

        {/* === COLLAPSIBLE CONTENT === */}
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden" // Moved overflow-hidden here
                >
                    <CardContent className="flex-grow flex flex-col text-center px-6 pb-8">
                    <div className={cn("text-3xl font-bold mb-1", themeClasses.text)}>
                        {service.price}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                        {service.billing_cycle}
                    </p>
                    
                    <p className={cn("mb-6 text-sm leading-relaxed opacity-80", themeClasses.text)}>
                        {service.description}
                    </p>

                    <Button
                        className={cn(
                        "w-full mb-8 font-semibold transition-all duration-200",
                        service.recommended
                            ? "bg-gray-400 text-gray-900 shadow-md hover:bg-gray-600/90 hover:shadow-lg hover:-translate-y-0.5"
                            : [
                                "bg-white text-gray-900 border border-gray-200",
                                "hover:bg-primary hover:text-white hover:border-primary",
                                "dark:bg-white dark:text-black dark:border-zinc-700",
                                "dark:hover:bg-primary dark:hover:text-white dark:hover:border-primary"
                            ]
                        )}
                    >
                        Choose Plan
                    </Button>

                    <div className="text-left text-sm mt-auto border-t border-gray-100 dark:border-zinc-800 pt-6">
                        <h4 className={cn("font-semibold mb-3", themeClasses.text)}>Highlights</h4>
                        <ul className="space-y-3">
                        {service.highlights && service.highlights.map((highlight, i) => (
                            <li key={`hl-${i}`} className={cn("flex items-center gap-2 font-medium", themeClasses.text)}>
                                <Check className="w-4 h-4 dark:text-black light:text-white flex-shrink-0" />
                                <span>{highlight}</span>
                            </li>
                        ))}
                        
                        <div className="my-4" /> 
                        
                        {service.features && service.features.map((feature, i) => (
                            <li key={`ft-${i}`} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-gray-400 dark:text-gray-500 light:text-gray-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-500 dark:text-gray-400">{feature}</span>
                            </li>
                        ))}
                        </ul>
                    </div>
                    </CardContent>
                </motion.div>
            )}
        </AnimatePresence>
        
        {/* Footer Toggle */}
        {!isOpen && (
             <div 
                onClick={() => setIsOpen(true)}
                className="py-4 text-center text-sm text-gray-500 dark:text-gray-400 cursor-pointer hover:text-primary transition-colors border-t border-gray-100 dark:border-zinc-800/50"
             >
                Show Details
             </div>
        )}
      </Card>
    </motion.div>
  );
};

export default function ServicesOverview() {
  const themeClasses = useThemeClasses();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('sort_order', { ascending: true });

        if (error) throw error;
        setServices(data || []);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const developmentServices = services.filter(s => s.category === 'development');
  const hostingServices = services.filter(s => s.category === 'hosting');
  const emailServices = services.filter(s => s.category === 'email');

  if (loading) {
    return (
      <section className={`py-40 px-4 flex justify-center items-center ${themeClasses.secondary}`}>
        <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
      </section>
    );
  }

  return (
    <section className={`py-20 px-4 md:px-8 ${themeClasses.secondary}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={cn("text-4xl md:text-5xl font-bold mb-6 tracking-tight", themeClasses.text)}>
            Our Web Development Services
          </h2>
          <p className={cn("text-xl max-w-3xl mx-auto leading-relaxed opacity-80", themeClasses.text)}>
            From startup MVPs to enterprise solutions and stunning e-commerce platforms - 
            we deliver cutting-edge web development tailored to your business needs.
          </p>
        </motion.div>

        {/* Development Services */}
        {developmentServices.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center justify-center gap-4 mb-8">
              <h3 className={cn("text-2xl font-bold text-center", themeClasses.text)}>Web Development Packages</h3>
              <span className="px-3 py-1 bg-white-100/30 dark:bg-white-400/30 text-red-700 dark:text-red-300 text-xs font-semibold rounded-full border border-red-200 dark:border-red-800">One-time payment</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 items-start">
              {developmentServices.map((service, index) => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  index={index} 
                  themeClasses={themeClasses} 
                />
              ))}
            </div>
          </div>
        )}

        {/* Hosting Services */}
        {hostingServices.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-center gap-4 mb-8">
              <h3 className={cn("text-2xl font-bold text-center", themeClasses.text)}>Hosting Solutions</h3>
               <span className="px-3 py-1 bg-white-100/30 dark:bg-white-400/30 text-red-700 dark:text-red-300 text-xs font-semibold rounded-full border border-red-200 dark:border-red-800">Monthly Subscription</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:max-w-4xl mx-auto gap-6 xl:gap-8 items-start">
              {hostingServices.map((service, index) => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  index={index} 
                  themeClasses={themeClasses} 
                />
              ))}
            </div>
          </div>
        )}

        {/* Email Hosting Packages */}
        {emailServices.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-center gap-4 mb-8">
              <h3 className={cn("text-2xl font-bold text-center", themeClasses.text)}>Email Hosting Packages</h3>
              <span className="px-3 py-1 bg-white-100/30 dark:bg-white-400/30 text-red-700 dark:text-red-300 text-xs font-semibold rounded-full border border-red-200 dark:border-red-800">Annual Subscription</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:max-w-7xl mx-auto gap-6 xl:gap-8 items-start">
              {emailServices.map((service, index) => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  index={index} 
                  themeClasses={themeClasses} 
                />
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className={cn(
            "text-center mt-16 max-w-2xl mx-auto p-8 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm",
            themeClasses.primary
          )}
        >
          <h4 className={cn("text-xl font-bold mb-3", themeClasses.text)}>Need something custom?</h4>
          <p className={cn("mb-6 opacity-80", themeClasses.text)}>
            Not sure which service is right for you? Let's discuss your specific project requirements.
          </p>
          
          <Button 
            size="lg" 
            className="w-full sm:w-auto font-semibold bg-gray-500 text-primary-foreground shadow-md hover:bg-gray-600/90 hover:shadow-lg transition-all"
          >
            Book Free Consultation
          </Button>
        </motion.div>
      </div>
    </section>
  );
}