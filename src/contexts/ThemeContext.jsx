import { createContext, useContext, useState, useEffect } from 'react';

// Theme configurations (Kept exactly as provided)
const themes = {
  light: {
    name: 'Light Theme',
    colors: {
      primary: 'bg-neutral-100',
      secondary: 'bg-neutral-200',
      accent: 'bg-brand',
      text: 'text-neutral-800',
      textSecondary: 'text-neutral-600',
      textMuted: 'text-neutral-500',
      border: 'border-neutral-300',
      hover: 'hover:bg-neutral-300',
      card: 'bg-neutral-50',
      gradient: 'from-brand to-accent',
      sectionBg: 'bg-neutral-100',
      linesGradient: ['#E0E7FF', '#C7D2FE', '#A5B4FC'],
      linesBackgroundColor: '#FFFFFF',
      threadsColor: '#000000'
    }
  },
  dark: {
    name: 'Dark Theme',
    colors: {
      primary: 'bg-neutral-900',
      secondary: 'bg-neutral-800',
      accent: 'bg-accent',
      text: 'text-neutral-100',
      textSecondary: 'text-neutral-300',
      textMuted: 'text-neutral-400',
      border: 'border-neutral-700',
      hover: 'hover:bg-neutral-700',
      card: 'bg-neutral-800',
      gradient: 'from-accent to-brand',
      sectionBg: 'bg-neutral-800',
      linesGradient: ['#E91E63', '#9C27B0', '#673AB7'],
      linesBackgroundColor: undefined,
      threadsColor: '#FFFFFF'
    }
  },
  neutral: {
    name: 'Neutral Theme',
    colors: {
      primary: 'bg-stone-50',
      secondary: 'bg-stone-100',
      accent: 'bg-amber-600',
      text: 'text-stone-900',
      textSecondary: 'text-stone-600',
      textMuted: 'text-stone-500',
      border: 'border-stone-200',
      hover: 'hover:bg-stone-200',
      card: 'bg-stone-50',
      gradient: 'from-amber-600 to-orange-600',
      sectionBg: 'bg-stone-100',
      linesGradient: ['#FFD54F', '#FFB74D', '#FF9800'],
      linesBackgroundColor: undefined,
      threadsColor: '#000000'
    }
  }
};

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // 1. Initialize state from LocalStorage if available
  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('user-theme') || 'dark';
    }
    return 'dark';
  });

  // 2. Track if the user has manually selected a theme
  const [hasUserSelected, setHasUserSelected] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('user-theme');
    }
    return false;
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const themeNames = Object.keys(themes);

  // Effect to apply theme classes to body
  useEffect(() => {
    const body = document.body;
    const root = document.documentElement; // Needed for Tailwind 'dark' class
    const theme = themes[currentTheme];
    
    // Remove old text color classes
    const allTextClasses = Object.values(themes).map(t => t.colors.text);
    body.classList.remove(...allTextClasses);
    body.classList.add(theme.colors.text);

    // Toggle 'dark' class on HTML tag for Tailwind dark mode to work properly
    if (currentTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

  }, [currentTheme]);

  // 3. Auto-switch logic (Only runs if !hasUserSelected)
  useEffect(() => {
    if (hasUserSelected) return; // STOP here if user made a choice

    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentTheme((prevTheme) => {
          const currentIndex = themeNames.indexOf(prevTheme);
          const nextIndex = (currentIndex + 1) % themeNames.length;
          return themeNames[nextIndex];
        });
        setIsTransitioning(false);
      }, 700); 
    }, 120000); // 2 minutes (120,000ms)

    return () => clearInterval(interval);
  }, [hasUserSelected, themeNames]); // Dependency on hasUserSelected is key

  // 4. Manual Switch Function
  const switchTheme = (themeName) => {
    if (themes[themeName]) {
      setIsTransitioning(true);
      
      // Save preference and stop auto-switcher
      setHasUserSelected(true);
      localStorage.setItem('user-theme', themeName);

      setTimeout(() => {
        setCurrentTheme(themeName);
        setIsTransitioning(false);
      }, 700);
    }
  };

  const getThemeClasses = () => {
    return themes[currentTheme].colors;
  };

  const value = {
    currentTheme,
    themeNames,
    isTransitioning,
    switchTheme,
    getThemeClasses,
    theme: themes[currentTheme]
  };

  return (
    <ThemeContext.Provider value={value}>
      <div className={`transition-opacity duration-700 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};