import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
import GlassSurface from './GlassSurface';
import logo from "../assets/Vybrant brand LOGO.png";
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, Sparkles } from 'lucide-react';

const themeIcons = {
  light: <Sun className="w-6 h-6 text-yellow-400" />,
  dark: <Moon className="w-6 h-6 text-blue-400" />,
  neutral: <Sparkles className="w-6 h-6 text-amber-400" />
};

const ThemeSwitcher = () => {
  const { currentTheme, themeNames, switchTheme } = useTheme();

  const handleThemeSwitch = (theme) => {
    if (theme !== currentTheme) {
      switchTheme(theme);
    }
  };

  return (
    <div className="flex gap-2">
      {themeNames.map((theme) => (
        <button
          key={theme}
          onClick={() => handleThemeSwitch(theme)}
          className={`p-2 rounded-lg transition-all duration-300 flex justify-center items-center ${
            currentTheme === theme
              ? 'bg-white/30 shadow-lg'
              : 'bg-white/10 hover:bg-white/20'
          }`}
          title={`Switch to ${theme} theme`}
        >
          {themeIcons[theme]}
        </button>
      ))}
    </div>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <GlassSurface
        width="100%"
        height="auto"
        borderRadius={80}
        opacity={0.9}
        brightness={80}
        blur={14}
        className="sticky top-0 w-full py-4 px-6 z-50"
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Company Logo"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6 text-black font-montserrat">
            <Link to="/" className="hover:text-gray-600">Home</Link>
            <Link to="/About" className="hover:text-gray-600">About Us</Link>
            <Link to="/Services" className="hover:text-gray-600">Services</Link>
            <Link to="/Supportedliving" className="hover:text-gray-600">Supported Living</Link>
            <Link to="/Careers" className="hover:text-gray-600">Careers</Link>
            <Link to="/Contact" className="hover:text-gray-600">Contact Us</Link>
            <Link to="/blog" className="hover:text-gray-600">Blog</Link>
            <ThemeSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            data-track="mobile_menu_open"
            className="md:hidden flex items-center px-3 py-2 text-black hover:text-gray-500"
            onClick={() => setIsOpen(true)}
          >
            <GiHamburgerMenu size={26} />
          </button>
        </div>
      </GlassSurface>

      {/* Fullscreen Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center space-y-8 text-black text-3xl font-montserrat z-50 transition-all duration-300">
          {/* Close Button */}
          <button
            data-track="mobile_menu_close"
            className="absolute top-6 right-6 text-black hover:text-gray-500"
            onClick={() => setIsOpen(false)}
          >
            <IoClose size={36} />
          </button>

          {/* Mobile Links */}
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-gray-600">Home</Link>
          <Link to="/About" onClick={() => setIsOpen(false)} className="hover:text-gray-600">About Us</Link>
          <Link to="/Services" onClick={() => setIsOpen(false)} className="hover:text-gray-600">Services</Link>
          <Link to="/Supportedliving" onClick={() => setIsOpen(false)} className="hover:text-gray-600">Supported Living</Link>
          <Link to="/Careers" onClick={() => setIsOpen(false)} className="hover:text-gray-600">Careers</Link>
          <Link to="/Contact" onClick={() => setIsOpen(false)} className="hover:text-gray-600">Contact Us</Link>
          <Link to="/blog" onClick={() => setIsOpen(false)} className="hover:text-gray-600">Blog</Link>
          <div className="pt-8">
            <ThemeSwitcher />
          </div>
        </div>
      )}
    </>
  );
}
