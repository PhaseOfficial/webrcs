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
  light: <Sun className="w-6 h-6 text-yellow-400" />,
  dark: <Moon className="w-6 h-6 text-blue-400" />,
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
    <div className="flex gap-2">
      {themeNames
        .filter((theme) => theme !== 'neutral') 
        .map((theme) => (
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

  const linkClass = "hover:text-black dark:hover:text-white transition-colors";
  const activeLinkClass = "text-black dark:text-white";

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
          <RouterLink to="/" className="flex items-center">
            <img
              src={logo}
              alt="Company Logo"
              className="h-10 w-auto"
            />
          </RouterLink>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6 text-gray-800 dark:text-gray-500 font-montserrat font-medium">
            {navLinks.map((link) => (
              link.type === 'route' ? (
                <RouterLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''}`}
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
                  className={`${linkClass} cursor-pointer`}
                >
                  {link.text}
                </ScrollLink>
              )
            ))}
            <ThemeSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            data-track="mobile_menu_open"
            className="md:hidden flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            onClick={() => setIsOpen(true)}
          >
            <GiHamburgerMenu size={26} />
          </button>
        </div>
      </GlassSurface>

      {/* Fullscreen Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md flex flex-col items-center justify-center space-y-8 text-gray-700 dark:text-gray-300 text-3xl font-montserrat z-50 transition-all duration-300">
          {/* Close Button */}
          <button
            data-track="mobile_menu_close"
            className="absolute top-6 right-6 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <IoClose size={36} />
          </button>

          {/* Mobile Links */}
          {navLinks.map((link) => (
            link.type === 'route' ? (
              <RouterLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''}`}
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
                className={`${linkClass} cursor-pointer`}
              >
                {link.text}
              </ScrollLink>
            )
          ))}
          <div className="pt-8">
            <ThemeSwitcher />
          </div>
        </div>
      )}
    </>
  );
}