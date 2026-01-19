import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '../button';
import { useThemeClasses } from '../ThemeAware';
import { cn } from '../../lib/utils';

const emailPackages = [
  {
    title: "Email Hosting Package",
    accounts: "10 Email Accounts",
    features: [
      "Email from anywhere in the world",
      "Access Email via the Computer",
      "Access Email via your Phone",
      "Free .co.zw Domain",
      "Email Forwarding",
      "Email Autoresponders",
    ],
    diskSpace: "500 MB Disk Space",
    price: "US$36.00",
    billing: "Annually",
  },
  {
    title: "Email Hosting Package",
    accounts: "25 Email Accounts",
    features: [
        "Email from anywhere in the world",
        "Access Email via the Computer",
        "Access Email via your Phone",
        "Free .co.zw Domain",
        "Email Forwarding",
        "Email Autoresponders",
    ],
    diskSpace: "1 Gig Disk Space",
    price: "US$48.00",
    billing: "Annually",
    recommended: true,
  },
  {
    title: "Email Hosting Package",
    accounts: "100 Email Accounts",
    features: [
        "Email from anywhere in the world",
        "Access Email via the Computer",
        "Access Email via your Phone",
        "Free .co.zw Domain",
        "Email Forwarding",
        "Email Autoresponders",
    ],
    diskSpace: "2 Gig Disk Space",
    price: "US$84.00",
    billing: "Annually",
  },
];

const PricingTable = () => {
  const themeClasses = useThemeClasses();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {emailPackages.map((pkg, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className={cn(
            "rounded-lg shadow-lg overflow-hidden",
            themeClasses.primary,
            pkg.recommended ? "border-2 border-primary" : "border border-gray-200 dark:border-zinc-700"
          )}
        >
          {pkg.recommended && (
            <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-semibold">
              Most Popular
            </div>
          )}
          <div className="p-6">
            <h3 className={cn("text-xl font-bold mb-2", themeClasses.text)}>{pkg.title}</h3>
            <p className={cn("text-3xl font-bold mb-2", themeClasses.text)}>{pkg.price}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{pkg.billing}</p>

            <div className="mb-6">
              <p className={cn("font-semibold mb-2", themeClasses.text)}>{pkg.accounts}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{pkg.diskSpace}</p>
            </div>

            <ul className="space-y-3 mb-8">
              {pkg.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <Check className="w-4 h-4 text-primary mr-2" />
                  <span className={cn("text-sm", themeClasses.text)}>{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              variant={pkg.recommended ? "default" : "outline"}
              className="w-full font-semibold"
            >
              Choose Plan
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PricingTable;