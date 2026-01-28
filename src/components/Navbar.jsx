import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { NavLink as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import GlassSurface from './GlassSurface';
import logo from "../assets/Vybrant brand LOGO.png";
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react'; 

const themeIcons = {
  light: <Sun className="w-5 h-5 text-yellow-500" />,
  dark: <Moon className="w-5 h-5 text-blue-400" />,
};

const navLinks = [
  { to: '/', text: 'Home', type: 'route' },
  { to: '/About', text: 'About Us', type: 'route' },
  { to: 'services', text: 'Services', type: 'scroll' },
  { to: '/Careers', text: 'Careers', type: 'route' },
  { to: 'contact', text: 'Contact Us', type: 'scroll' },
  { to: '/blog', text: 'Blog', type: 'route' },
];

const ThemeSwitcher = () => {
  const { currentTheme, themeNames, switchTheme } = useTheme();

  const handleThemeSwitch = (theme) => {
    if (theme !== currentTheme) {
      switchTheme(theme);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      {themeNames
        .filter((theme) => theme !== 'neutral') 
        .map((theme) => (
          <button
            key={theme}
            onClick={() => handleThemeSwitch(theme)}
            className={`p-2 rounded-full transition-all duration-300 flex justify-center items-center ${
              currentTheme === theme
                ? 'bg-gray-200 dark:bg-white/20 shadow-inner' /* Active State */
                : 'hover:bg-gray-100 dark:hover:bg-white/10 bg-transparent' /* Inactive State */
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

  // Base styles for all links
  const baseLinkStyles = "transition-colors duration-300 font-montserrat font-medium cursor-pointer";
  
  // Inactive: Gray-800 (Light) / Gray-300 (Dark) | Hover: Black (Light) / White (Dark)
  const inactiveClass = "text-gray-500 dark:text-gray-300 hover:text-b dark:hover:text-white";
  
  // Active: Black (Light) / White (Dark)
  const activeClass = "text-black dark:text-white font-semibold";

  return (
    <>
      <GlassSurface
        width="100%"
        height="auto"
        borderRadius={0} /* Usually Navbars are 0 radius or specific pill shape, adjusted to 0 for full width sticky */
        opacity={0.9}
        brightness={80}
        blur={14}
        className="sticky top-0 w-full py-4 px-6 z-50 border-b border-gray-200/20 dark:border-white/10"
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <RouterLink to="/" className="flex items-center">
            <img
              src={logo}
              alt="Company Logo"
              className="h-10 w-auto"
            />
          </RouterLink>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.type === 'route' ? (
                <RouterLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => 
                    `${baseLinkStyles} ${isActive ? activeClass : inactiveClass}`
                  }
                >
                  {link.text}
                </RouterLink>
              ) : (
                <ScrollLink
                  key={link.to}
                  to={link.to}
                  smooth={true}
                  duration={500}
                  offset={-70}
                  spy={true} // Adds active class when scrolled to
                  activeClass={activeClass} // Class applied by ScrollLink when active
                  className={`${baseLinkStyles} ${inactiveClass}`} // Default class
                >
                  {link.text}
                </ScrollLink>
              )
            ))}
            
            {/* Divider */}
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2"></div>
            
            <ThemeSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            data-track="mobile_menu_open"
            className="md:hidden flex items-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
            onClick={() => setIsOpen(true)}
          >
            <GiHamburgerMenu size={26} />
          </button>
        </div>
      </GlassSurface>

      {/* Fullscreen Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 z-[60] transition-all duration-300">
          
          {/* Close Button */}
          <button
            data-track="mobile_menu_close"
            className="absolute top-6 right-6 p-2 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
            onClick={() => setIsOpen(false)}
          >
            <IoClose size={36} />
          </button>

          {/* Mobile Links */}
          <div className="flex flex-col items-center space-y-6 text-2xl font-montserrat">
            {navLinks.map((link) => (
              link.type === 'route' ? (
                <RouterLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => 
                    `${baseLinkStyles} ${isActive ? activeClass : inactiveClass}`
                  }
                >
                  {link.text}
                </RouterLink>
              ) : (
                <ScrollLink
                  key={link.to}
                  to={link.to}
                  smooth={true}
                  duration={500}
                  offset={-70}
                  onClick={() => setIsOpen(false)}
                  className={`${baseLinkStyles} ${inactiveClass}`}
                >
                  {link.text}
                </ScrollLink>
              )
            ))}
          </div>

          <div className="pt-8 border-t border-gray-200 dark:border-gray-800 w-1/3 flex justify-center">
            <ThemeSwitcher />
          </div>
        </div>
      )}
    </>
  );
}