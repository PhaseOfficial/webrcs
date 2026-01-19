import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, Sparkles } from 'lucide-react';
import GlassSurface from './GlassSurface';

const themeIcons = {
  light: <Sun className="w-6 h-6 text-yellow-400" />,
  dark: <Moon className="w-6 h-6 text-blue-400" />,
  neutral: <Sparkles className="w-6 h-6 text-amber-400" />
};

export default function ThemeIndicator() {
  const { currentTheme } = useTheme();
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev <= 1 ? 120 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
      <GlassSurface className="rounded-2xl p-4 border border-white/20 shadow-lg w-64">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            {themeIcons[currentTheme]}
            <span className="font-bold text-lg text-white capitalize">
              {currentTheme}
            </span>
          </div>
          <button onClick={toggleVisibility} className="text-white/50 hover:text-white transition-colors">
            &times;
          </button>
        </div>

        {/* Countdown Timer */}
        <div className="text-center">
          <p className="text-xs text-white/70 mb-1">Next theme in</p>
          <p className="font-mono text-xl text-white tracking-widest">
            {formatTime(timeLeft)}
          </p>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4 bg-white/10 rounded-full h-1.5 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full transition-all duration-1000 ease-linear rounded-full"
            style={{ width: `${((120 - timeLeft) / 120) * 100}%` }}
          />
        </div>
      </GlassSurface>
    </div>
  );
}