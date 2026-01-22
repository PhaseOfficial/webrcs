import { motion } from 'framer-motion';
import { Code, ShoppingCart, Building2, Check, Mail } from 'lucide-react'; 
import ZimraLogo from '../assets/Zimra-logo.webp';
import { useThemeClasses } from './ThemeAware';
import { Button } from './button'; 
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from './ui/card';
import { cn } from '../lib/utils'; 

const developmentServices = [
  {
    icon: Code,
    title: "Web Dev Startup Package",
    subtitle: "Ideal for new ventures",
    description: "Get your online presence started with a professional 3-page website.",
    price: "$60",
    billingCycle: "one-time",
    features: ["3 custom designed pages", "Responsive design", "Basic SEO setup", "Optional: AI Chatbot integration ($10 extra)"],
    highlights: ["Quick launch", "Affordable", "Essential features"]
  },
  {
    icon: Code,
    title: "Small Business Website",
    subtitle: "Expand your digital footprint",
    description: "A comprehensive 5-page website to showcase your business.",
    price: "$100",
    billingCycle: "one-time",
    features: ["5 custom designed pages", "Content management system", "Advanced SEO", "Optional: AI Chatbot integration ($100 extra)"],
    highlights: ["Growth-focused", "Professional", "Easy to manage"]
  },
  {
    icon: Code,
    title: "Medium Business Website",
    subtitle: "Robust online presence",
    description: "A feature-rich 15-page website for growing businesses.",
    price: "$250",
    billingCycle: "one-time",
    recommended: true, 
    features: ["15 custom designed pages", "Blog functionality", "CRM integration", "Advanced analytics", "Optional: Dashboard integration ($30 extra)", "Optional: AI Chatbot integration ($100 extra)"],
    highlights: ["Scalable", "Feature-packed", "Data-driven"]
  },
  {
    icon: Building2,
    title: "Corporate Website Package",
    subtitle: "Enterprise-grade solutions",
    description: "A powerful 30-page corporate website designed for large organizations.",
    price: "$500",
    billingCycle: "one-time",
    features: [
      "30 custom designed pages",
      "Custom application architecture",
      "Advanced security features",
      "API development & integration",
      "User authentication & authorization",
      "Performance monitoring",
      "6 months enterprise support",
      "Optional: Dashboard integration ($30 extra)",
      "Optional: AI Chatbot integration ($100 extra)"
    ],
    highlights: ["Enterprise-grade", "Highly scalable", "Custom integrations"]
  },
  {
    icon: ShoppingCart,
    title: "E-commerce & Creative",
    subtitle: "For Agencies & Creative Businesses",
    description: "Create stunning, conversion-optimized e-commerce platforms. Pricing is customizable based on your specific needs.",
    price: "From $300",
    billingCycle: "customizable",
    features: [
      "Custom e-commerce platform",
      "Payment gateway integration",
      "Inventory management system",
      "Advanced design & UX/UI",
      "Conversion optimization",
      "Marketing tool integration",
      "4 months support included",
      "Zimra fiscalisation integration",
      "Optional: AI Chatbot integration ($100 extra)"
    ],
    highlights: ["Conversion-focused", "Modern design", "Sales optimization"]
  },
  {
    icon: () => <img src={ZimraLogo} alt="ZIMRA Logo" className="w-6 h-6" />,
    title: "ZIMRA Fiscalisation & Integration",
    subtitle: "For seamless compliance and workflow",
    description: "Server-to-server fiscalisation setup for ZIMRA, including Excel, POS systems customization, Microsoft 365 integration with webhooks, and other similar platforms.",
    price: "Custom",
    billingCycle: "per-project",
    features: [
      "ZIMRA server-to-server fiscalisation",
      "Excel & POS systems integration",
      "Microsoft 365 webhook setup",
      "Custom workflow automation",
      "Compliance consulting"
    ],
    highlights: ["Tax compliance", "Process automation", "System integration"]
  }
];

const hostingServices = [
  {
    icon: Building2,
    title: "Website Hosting",
    subtitle: "No Email",
    description: "Secure and fast hosting for your website without email services.",
    price: "$5",
    billingCycle: "/month",
    features: ["Reliable uptime", "Daily backups", "Basic security"],
    highlights: ["Cost-effective", "Essential hosting"]
  },
  {
    icon: Building2,
    title: "Website Hosting",
    subtitle: "With Email",
    description: "Secure and fast hosting for your website including professional email services.",
    price: "$7",
    billingCycle: "/month",
    recommended: true,
    features: ["Reliable uptime", "Daily backups", "Basic security", "Professional email accounts"],
    highlights: ["All-in-one", "Business ready"]
  }
];

// === NEW EMAIL SERVICES (Replaces the Import) ===
const emailServices = [
  {
    icon: Mail,
    title: "Email Hosting Package",
    subtitle: "Starter",
    description: "Essential email features for small teams.",
    price: "US$36.00",
    billingCycle: "Annually",
    features: [
      "10 Email Accounts",
      "500 MB Disk Space",
      "Email from anywhere",
      "Access via Computer",
      "Access via Phone",
      "Free .co.zw Domain",
      "Email Forwarding",
      "Email Autoresponders"
    ],
    highlights: ["Entry Level", "Cost Effective"]
  },
  {
    icon: Mail,
    title: "Email Hosting Package",
    subtitle: "Standard",
    description: "Perfect for growing businesses needing more space.",
    price: "US$48.00",
    billingCycle: "Annually",
    recommended: true, // This triggers the correct button style
    features: [
      "25 Email Accounts",
      "1 Gig Disk Space",
      "Email from anywhere",
      "Access via Computer",
      "Access via Phone",
      "Free .co.zw Domain",
      "Email Forwarding",
      "Email Autoresponders"
    ],
    highlights: ["Most Popular", "Best Value"]
  },
  {
    icon: Mail,
    title: "Email Hosting Package",
    subtitle: "Pro",
    description: "Maximum capacity for larger organizations.",
    price: "US$84.00",
    billingCycle: "Annually",
    features: [
      "100 Email Accounts",
      "2 Gig Disk Space",
      "Email from anywhere",
      "Access via Computer",
      "Access via Phone",
      "Free .co.zw Domain",
      "Email Forwarding",
      "Email Autoresponders"
    ],
    highlights: ["Maximum Storage", "Enterprise Ready"]
  }
];

const ServiceCard = ({ service, index, themeClasses }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="h-full border"
    >
      <Card
        className={cn(
          "relative h-full flex flex-col transition-all duration-300 rounded-xl",
          themeClasses.primary, 
          "border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1",
          "dark:border-zinc-800",
          service.recommended 
            ? "border-primary ring-2 ring-primary/20 shadow-xl scale-[1.02] z-10" 
            : ""
        )}
      >
        {service.recommended && (
          <div className="absolute -top-3 left-0 right-0 mx-auto w-fit bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full z-10 shadow-sm">
            Most Popular
          </div>
        )}

        <CardHeader className="text-center pt-8 pb-4">
          <div className="flex justify-center mb-4">
            <div className={cn(
              "p-3 rounded-full transition-colors",
              service.recommended ? "bg-primary/20" : "bg-gray-100 dark:bg-zinc-800"
            )}>
               <service.icon className={cn("w-6 h-6", service.recommended ? "text-primary" : "text-gray-600 dark:text-gray-300")} />
            </div>
          </div>
          <CardTitle className={cn("text-xl font-bold", themeClasses.text)}>
            {service.title}
          </CardTitle>
          <CardDescription className="font-medium text-primary/90 dark:text-primary/80 mt-1">
            {service.subtitle}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-grow flex flex-col text-center px-6 pb-8">
          <div className={cn("text-3xl font-bold mb-1", themeClasses.text)}>
            {service.price}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            {service.billingCycle}
          </p>
          
          <p className={cn("mb-6 text-sm leading-relaxed opacity-80", themeClasses.text)}>
            {service.description}
          </p>

          <Button
            variant={service.recommended ? "default" : "outline"}
            className={cn(
              "w-full mb-8 font-semibold transition-all duration-200",
              service.recommended 
                ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5" 
                : [
                  themeClasses.text, 
                  "border border-gray-200", 
                  "dark:border-zinc-700",
                  "hover:bg-primary/5 hover:border-primary hover:text-primary"
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
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{highlight}</span>
                  </li>
              ))}
               <div className="my-4" /> 
              {service.features.map((feature, i) => (
                <li key={`ft-${i}`} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-gray-400 dark:text-zinc-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-500 dark:text-gray-400">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function ServicesOverview() {
  const themeClasses = useThemeClasses();

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
        <div className="mb-20">
          <div className="flex items-center justify-center gap-4 mb-8">
            <h3 className={cn("text-2xl font-bold text-center", themeClasses.text)}>Web Development Packages</h3>
            <span className="px-3 py-1 bg-white-100/30 dark:bg-white-400/30 text-gray-700 dark:text-red-300 text-xs font-semibold rounded-full border border-red-200 dark:border-red-800">One-time payment</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {developmentServices.map((service, index) => (
              <ServiceCard 
                key={index} 
                service={service} 
                index={index} 
                themeClasses={themeClasses} 
              />
            ))}
          </div>
        </div>

        {/* Hosting Services */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-4 mb-8">
            <h3 className={cn("text-2xl font-bold text-center", themeClasses.text)}>Hosting Solutions</h3>
             <span className="px-3 py-1 bg-white-100/30 dark:bg-white-400/30 text-gray-700 dark:text-red-300 text-xs font-semibold rounded-full border border-red-200 dark:border-red-800">Monthly Subscription</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:max-w-4xl mx-auto gap-6 xl:gap-8">
            {hostingServices.map((service, index) => (
              <ServiceCard 
                key={index} 
                service={service} 
                index={index} 
                themeClasses={themeClasses} 
              />
            ))}
          </div>
        </div>

        {/* Email Hosting Packages - UPDATED */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-4 mb-8">
            <h3 className={cn("text-2xl font-bold text-center", themeClasses.text)}>Email Hosting Packages</h3>
            <span className="px-3 py-1 bg-white-100/30 dark:bg-white-400/30 text-gray-700 dark:text-red-300 text-xs font-semibold rounded-full border border-red-200 dark:border-red-800">Annual Subscription</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:max-w-7xl mx-auto gap-6 xl:gap-8">
            {emailServices.map((service, index) => (
              <ServiceCard 
                key={index} 
                service={service} 
                index={index} 
                themeClasses={themeClasses} 
              />
            ))}
          </div>
        </div>

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
            className="w-full sm:w-auto font-semibold bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg transition-all"
          >
            Book Free Consultation
          </Button>
        </motion.div>
      </div>
    </section>
  );
}