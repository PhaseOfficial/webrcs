import { createContext, useContext, useState, useEffect } from 'react';

// Theme configurations
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
      sectionBg: 'bg-neutral-100'
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
      sectionBg: 'bg-neutral-800'
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
      sectionBg: 'bg-stone-100'
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
  const [currentTheme, setCurrentTheme] = useState('light');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const body = document.body;
    const theme = themes[currentTheme];
    const themeClasses = Object.values(themes).map(t => t.colors.text);
    body.classList.remove(...themeClasses);
    body.classList.add(theme.colors.text);
  }, [currentTheme]);

  const themeNames = Object.keys(themes);
  let currentIndex = themeNames.indexOf(currentTheme);

  // Auto-switch themes every 2 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % themeNames.length;
        const nextTheme = themeNames[currentIndex];
        setCurrentTheme(nextTheme);
        setIsTransitioning(false);
      }, 700); // Slower transition for a smoother effect
    }, 120000); // 2 minutes = 120,000ms

    return () => clearInterval(interval);
  }, [currentTheme]);

  const switchTheme = (themeName) => {
    if (themes[themeName]) {
      setIsTransitioning(true);
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
      <div className={`transition-all duration-700 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};