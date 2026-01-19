import { useEffect, useState } from "react";
import { Code2 } from "lucide-react";
import { useThemeClasses } from "./ThemeAware"; // Code icon from lucide-react

const reviews = [
  { 
    name: "Sarah Chen", 
    company: "TechFlow Solutions", 
    role: "CEO & Founder",
    text: "Exceptional development work! They turned our startup vision into a fully functional SaaS platform in just 3 months. The code quality and attention to detail is outstanding.", 
    time: "2 months ago",
    category: "startup"
  },
  { 
    name: "Marcus Johnson", 
    company: "Enterprise Data Corp", 
    role: "CTO",
    text: "Outstanding enterprise solution delivery. Their technical expertise and project management skills ensured our complex data platform went live on schedule and within budget.", 
    time: "1 month ago",
    category: "enterprise"
  },
  { 
    name: "Elena Rodriguez", 
    company: "Fashion Forward", 
    role: "Owner",
    text: "Our e-commerce sales increased by 300% after the redesign! The team understood our brand perfectly and created a stunning, conversion-optimized platform.", 
    time: "3 months ago",
    category: "ecommerce"
  },
  { 
    name: "David Kim", 
    company: "InnovateLab", 
    role: "Product Manager",
    text: "Fast, reliable, and highly skilled team. They built our MVP with cutting-edge technology and it exceeded all our expectations. Highly recommend for any web project.", 
    time: "1 month ago",
    category: "startup"
  },
  { 
    name: "Jennifer Walsh", 
    company: "Global Finance Ltd", 
    role: "VP of Technology",
    text: "Professional, efficient, and delivers enterprise-grade solutions. Their expertise in security and scalability made our complex financial platform a reality.", 
    time: "2 weeks ago",
    category: "enterprise"
  },
  { 
    name: "Alex Thompson", 
    company: "Craft & Co", 
    role: "Creative Director",
    text: "Incredible design and development skills! They created a beautiful, user-friendly website that perfectly represents our brand and drives conversions.", 
    time: "1 month ago",
    category: "ecommerce"
  },
  { 
    name: "Priya Patel", 
    company: "HealthTech Innovations", 
    role: "CEO",
    text: "From concept to deployment, they handled everything professionally. Our healthcare platform is now serving thousands of users with excellent performance and security.", 
    time: "4 months ago",
    category: "startup"
  },
  { 
    name: "Robert Mitchell", 
    company: "Manufacturing Plus", 
    role: "IT Director",
    text: "Complex ERP integration completed flawlessly. Their enterprise development expertise and problem-solving abilities are unmatched in the industry.", 
    time: "3 weeks ago",
    category: "enterprise"
  },
  { 
    name: "Sophie Laurent", 
    company: "Boutique Elegance", 
    role: "Founder",
    text: "Amazing e-commerce solution! The shopping experience is seamless and our customers love the new design. Sales have never been better.", 
    time: "2 months ago",
    category: "ecommerce"
  },
  { 
    name: "Michael Brown", 
    company: "EduTech Solutions", 
    role: "Founder",
    text: "Outstanding educational platform development. The interactive features and user experience are exceptional. Students and teachers love using it!", 
    time: "1 month ago",
    category: "startup"
  },
];

const getInitials = (name) =>
  name.split(" ").map((n) => n[0]).join("").toUpperCase();

const getCategoryIcon = (category) => {
  switch (category) {
    case 'startup': return '🚀';
    case 'enterprise': return '🏢';
    case 'ecommerce': return '🛒';
    default: return '⭐';
  }
};

export default function TechTestimonials() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const themeClasses = useThemeClasses();

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % reviews.length);
        setFade(true);
      }, 300);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const review = reviews[index];

  return (
    <div className={`max-w-2xl mx-auto text-center ${themeClasses.primary} mt-10 rounded-2xl shadow-xl p-8 border ${themeClasses.border} relative`}>

      {/* Tech Header */}
      <div className="flex justify-center items-center gap-2 mb-4">
        <Code2 className="text-2xl text-blue-600" />
        <p className="font-bold text-lg text-gray-800">Client Success Stories</p>
      </div>

      {/* Category Badge */}
      <div className="flex justify-center mb-4">
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium flex items-center gap-1">
          <span>{getCategoryIcon(review.category)}</span>
          {review.category.charAt(0).toUpperCase() + review.category.slice(1)} Project
        </span>
      </div>

      {/* Stars */}
      <div className="flex justify-center text-yellow-400 mb-4 text-xl">
        {"★★★★★"}
      </div>

      {/* Review Content */}
      <div className={`transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}>
        
        {/* Avatar */}
        <div className="flex justify-center mb-3">
          <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center rounded-full font-bold text-lg">
            {getInitials(review.name)}
          </div>
        </div>

        <p className="text-gray-800 italic leading-relaxed mb-4">
          “{review.text}”
        </p>

        <div className="mb-2">
          <p className="font-semibold text-gray-900">{review.name}</p>
          <p className="text-sm text-blue-600">{review.role} at {review.company}</p>
        </div>
        <p className="text-xs text-gray-500">{review.time}</p>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {reviews.map((_, i) => (
          <span
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
              i === index ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Stats */}
      <div className={`mt-6 pt-6 border-t ${themeClasses.border}`}>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-blue-600">98%</div>
            <div className="text-xs text-gray-500">Satisfaction</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">150+</div>
            <div className="text-xs text-gray-500">Projects</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-600">50+</div>
            <div className="text-xs text-gray-500">Happy Clients</div>
          </div>
        </div>
      </div>
    </div>
  );
}
