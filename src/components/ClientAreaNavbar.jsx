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
  { to: '/client-area', text: 'Portal Home', type: 'route' },
  { to: '/services', text: 'Services', type: 'route' },
  { to: '/domains', text: 'Domains', type: 'route' },
  { to: '/billing', text: 'Billing', type: 'route' },
  { to: '/support', text: 'Support', type: 'route' },
  { to: '/open-ticket', text: 'Open Ticket', type: 'route' },
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
                ? 'bg-gray-200 dark:bg-white/20 shadow-inner'
                : 'hover:bg-gray-100 dark:hover:bg-white/10 bg-transparent'
            }`}
            title={`Switch to ${theme} theme`}
          >
            {themeIcons[theme]}
          </button>
        ))}
    </div>
  );
};

export default function ClientAreaNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const baseLinkStyles = "transition-colors duration-300 font-montserrat font-medium cursor-pointer";
  const inactiveClass = "text-gray-500 dark:text-gray-300 hover:text-b dark:hover:text-white";
  const activeClass = "text-black dark:text-white font-semibold";

  return (
    <>
      <GlassSurface
        width="100%"
        height="auto"
        borderRadius={0}
        opacity={0.9}
        brightness={80}
        blur={14}
        className="sticky top-0 w-full py-4 px-6 z-50 border-b border-gray-200/20 dark:border-white/10"
      >
        <div className="container mx-auto flex items-center justify-between">
          <RouterLink to="/" className="flex items-center">
            <img
              src={logo}
              alt="Company Logo"
              className="h-10 w-auto"
            />
          </RouterLink>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <RouterLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => 
                  `${baseLinkStyles} ${isActive ? activeClass : inactiveClass}`
                }
              >
                {link.text}
              </RouterLink>
            ))}
            
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2"></div>
            
            <ThemeSwitcher />
          </div>

          <button
            data-track="mobile_menu_open"
            className="md:hidden flex items-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
            onClick={() => setIsOpen(true)}
          >
            <GiHamburgerMenu size={26} />
          </button>
        </div>
      </GlassSurface>

      {isOpen && (
        <div className="fixed inset-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 z-[60] transition-all duration-300">
          
          <button
            data-track="mobile_menu_close"
            className="absolute top-6 right-6 p-2 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
            onClick={() => setIsOpen(false)}
          >
            <IoClose size={36} />
          </button>

          <div className="flex flex-col items-center space-y-6 text-2xl font-montserrat">
            {navLinks.map((link) => (
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