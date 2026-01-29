import React from 'react';
import ClientAreaNavbar from '../components/ClientAreaNavbar';
import Footer from '../components/footer';
import { useThemeClasses } from '../components/ThemeAware';

const Billing = () => {
  const themeClasses = useThemeClasses();
  return (
    <div className={themeClasses.background}>
      <ClientAreaNavbar />
      <div className="container mx-auto px-6 py-12">
        <h1 className={`text-3xl font-bold ${themeClasses.text}`}>Billing</h1>
        <p className={themeClasses.textSecondary}>This is the billing page.</p>
      </div>
      <Footer />
    </div>
  );
};

export default Billing;