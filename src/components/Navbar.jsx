import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import GlassSurface from './GlassSurface';
import logo from "../assets/Vybrant brand LOGO.png";
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext.jsx'; 
import { Sun, Moon, LogOut, User, LogIn } from 'lucide-react'; 

const themeIcons = {
  light: <Sun className="w-5 h-5 text-yellow-500" />,
  dark: <Moon className="w-5 h-5 text-blue-400" />,
};

// Static navigation links (Client Area is handled dynamically)
const baseNavLinks = [
  { to: '/', text: 'Home', type: 'route' },
  { to: '/About', text: 'About Us', type: 'route' },
  // { to: 'services', text: 'Services', type: 'scroll' },
  { to: '/Careers', text: 'Careers', type: 'route' },
  { to: '/Contact', text: 'Contact Us', type: 'route' },
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth(); // Access Auth State
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    navigate('/'); // Redirect home after logout
  };

  // Shared Styles
  const baseLinkStyles = "transition-colors duration-300 font-montserrat font-medium cursor-pointer flex items-center gap-2";
  const inactiveClass = "text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white";
  const activeClass = "dark:text-white font-semibold";

  // Helper to render links (ensures Desktop and Mobile stay in sync)
  const renderLinks = (isMobile = false) => (
    <>
      {baseNavLinks.map((link) => (
        link.type === 'route' ? (
          <RouterLink
            key={link.to}
            to={link.to}
            onClick={() => isMobile && setIsOpen(false)}
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
            spy={true}
            activeClass={activeClass}
            onClick={() => isMobile && setIsOpen(false)}
            className={`${baseLinkStyles} ${inactiveClass}`}
          >
            {link.text}
          </ScrollLink>
        )
      ))}

      {/* --- DYNAMIC AUTH SECTION --- */}
      <div className={`flex items-center gap-4 ${isMobile ? 'flex-col w-full pt-6 mt-2 border-t border-gray-100 dark:border-zinc-800' : 'pl-4 border-l border-gray-300 dark:border-zinc-700'}`}>
        {user ? (
          // IF LOGGED IN: Show Client Area & Sign Out
          <>
            <RouterLink
              to="/client-area"
              onClick={() => isMobile && setIsOpen(false)}
              className={`${baseLinkStyles} ${inactiveClass}`}
            >
              <User size={18} /> Client Area
            </RouterLink>
            
            <button
              onClick={handleSignOut}
              className={`${baseLinkStyles} text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300`}
            >
              <LogOut size={18} /> {isMobile ? "Sign Out" : ""}
            </button>
          </>
        ) : (
          // IF LOGGED OUT: Show Login Button
          <RouterLink
            to="/login"
            onClick={() => isMobile && setIsOpen(false)}
            className={`px-5 py-2 rounded-full font-bold transition-all shadow-md flex items-center justify-center gap-2 ${
              isMobile ? 'w-full text-center' : ''
            } bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200`}
          >
            <LogIn size={16} /> Login
          </RouterLink>
        )}
      </div>
    </>
  );

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
          {/* Logo */}
          <RouterLink to="/" className="flex items-center">
            <img src={logo} alt="Company Logo" className="h-10 w-auto" />
          </RouterLink>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            {renderLinks(false)}
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
          <button
            className="absolute top-6 right-6 p-2 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
            onClick={() => setIsOpen(false)}
          >
            <IoClose size={36} />
          </button>

          <div className="flex flex-col items-center space-y-6 text-xl font-montserrat w-full px-10">
            {renderLinks(true)}
          </div>

          <div className="pt-8 border-t border-gray-200 dark:border-gray-800 w-1/3 flex justify-center">
            <ThemeSwitcher />
          </div>
        </div>
      )}
    </>
  );
}