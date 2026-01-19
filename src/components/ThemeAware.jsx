import { useTheme } from '../contexts/ThemeContext';

// HOC to make any component theme-aware
export const withTheme = (Component) => {
  return function ThemedComponent(props) {
    return <Component {...props} />;
  };
};

// Hook to apply theme classes to any element
export const useThemeClasses = () => {
  const { getThemeClasses } = useTheme();
  return getThemeClasses();
};

// Theme-aware wrapper component
export const ThemeWrapper = ({ children, className = '', ...props }) => {
  const themeClasses = useThemeClasses();
  
  return (
    <div 
      className={`${themeClasses.primary} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Theme-aware section wrapper
export const ThemedSection = ({ children, className = '', bgColor = '', ...props }) => {
  const themeClasses = useThemeClasses();
  const backgroundClass = bgColor || themeClasses.secondary;
  
  return (
    <section 
      className={`${backgroundClass} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};

// Theme-aware text component
export const ThemedText = ({ children, className = '', variant = 'primary', ...props }) => {
  const themeClasses = useThemeClasses();
  
  const textClasses = {
    primary: themeClasses.text,
    secondary: themeClasses.textSecondary,
    muted: themeClasses.textMuted
  };
  
  return (
    <div className={`${textClasses[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

// Theme-aware button component
export const ThemedButton = ({ children, className = '', variant = 'primary', ...props }) => {
  const themeClasses = useThemeClasses();
  
  const buttonClasses = {
    primary: `bg-gradient-to-r ${themeClasses.gradient} text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`,
    secondary: `${themeClasses.secondary} ${themeClasses.text} border ${themeClasses.border} hover:bg-opacity-80`,
    outline: `border-2 border-current ${themeClasses.text} hover:bg-white/10`
  };
  
  return (
    <button 
      className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 ${buttonClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Theme-aware card component
export const ThemedCard = ({ children, className = '', ...props }) => {
  const themeClasses = useThemeClasses();
  
  return (
    <div 
      className={`${themeClasses.card} rounded-2xl p-6 shadow-lg border ${themeClasses.border} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Theme-aware input component
export const ThemedInput = ({ className = '', ...props }) => {
  const themeClasses = useThemeClasses();
  
  return (
    <input 
      className={`${themeClasses.card} ${themeClasses.text} ${themeClasses.border} border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
};