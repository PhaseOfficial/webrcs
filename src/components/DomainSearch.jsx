import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Check, X, Loader2, Globe, ShoppingCart, AlertCircle, ChevronDown } from 'lucide-react';
import { Button } from './button'; 
import { cn } from '../lib/utils'; 

export default function DomainSearch({ themeClasses }) {
  const [domain, setDomain] = useState('');
  const [status, setStatus] = useState('idle'); 
  const [extension, setExtension] = useState('.co.zw');

  // Updated Price Logic
  const getPrice = (ext) => {
    if (ext === '.co.zw') return '$5.00';
    if (ext === '.ac.zw' || ext === '.org.zw') return '$6.00';
    return '$25.00'; // .com, .org, .net
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!domain) return;
    setStatus('searching');

    try {
      const cleanName = domain.toLowerCase().replace(/\s/g, '').replace(/https?:\/\//, '').replace(extension, '');
      const fullName = `${cleanName}${extension}`;

      const response = await fetch(`https://dns.google/resolve?name=${fullName}`);
      const data = await response.json();

      if (data.Status === 0) setStatus('taken');
      else if (data.Status === 3) setStatus('available');
      else setStatus('available'); 
    } catch (error) {
      console.error("DNS Check failed", error);
      setStatus('error'); 
    }
  };

  const handleOrder = () => {
    const price = getPrice(extension);
    alert(`Order initiated for ${domain}${extension}\nPrice: ${price}/year`);
  };

  return (
    <section className="w-full max-w-4xl mx-auto py-12 px-4">
      <div className={cn(
        "p-8 md:p-12 rounded-3xl shadow-sm border transition-all duration-300",
        "bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800"
      )}>
        
        <div className="text-center mb-8">
          <h3 className={cn("text-2xl md:text-3xl font-bold mb-3", "text-neutral-900 dark:text-neutral-100")}>
            Find Your Perfect Domain Name
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Enter your desired domain name below to check availability.
          </p>
        </div>

        {/* Search Input Area */}
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 items-center mb-8">
          <div className="relative flex-grow w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Globe className="h-5 w-5 text-gray-400" />
            </div>
            
            <input
              type="text"
              className={cn(
                "block w-full pl-12 pr-32 py-4 rounded-xl border-2 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-neutral-700 transition-all text-lg font-semibold",
                "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400",
                "dark:bg-neutral-950 dark:border-neutral-800 dark:text-gray-100 dark:placeholder:text-gray-500"
              )}
              placeholder="example"
              value={domain}
              onChange={(e) => {
                setDomain(e.target.value);
                if(status !== 'idle') setStatus('idle'); 
              }}
            />
            
            {/* Extension Dropdown with Arrow */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 border-l border-gray-200 dark:border-neutral-800">
              <div className="relative">
                <select 
                  value={extension}
                  onChange={(e) => {
                      setExtension(e.target.value);
                      if(status !== 'idle') setStatus('idle');
                  }}
                  className="bg-transparent border-none text-gray-700 font-bold focus:ring-0 cursor-pointer text-sm outline-none appearance-none pr-6 pl-2 py-2"
                >
                  <option value=".co.zw">.co.zw</option>
                  <option value=".org.zw">.org.zw</option>
                  <option value=".ac.zw">.ac.zw</option>
                  <option value=".com">.com</option>
                  <option value=".org">.org</option>
                  <option value=".net">.net</option>
                </select>
                {/* Custom Arrow Icon */}
                <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </div>
              </div>
            </div>
          </div>

          <Button 
            type="submit"
            disabled={status === 'searching' || !domain}
            className="w-full sm:w-auto py-4 h-14 px-8 rounded-xl bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white font-bold transition-all text-lg shadow-lg"
          >
            {status === 'searching' ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" /> Checking
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Search className="h-5 w-5" /> Search
              </span>
            )}
          </Button>
        </form>

        {/* Results Area */}
        <div className="min-h-[80px]">
          <AnimatePresence mode="wait">
            {status === 'available' && (
              <motion.div 
                key="available"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                // Green Background
                className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm"
              >
                <div className="flex items-center gap-4 text-center sm:text-left">
                  <div className="bg-green-100 dark:bg-green-800 p-3 rounded-full shrink-0">
                    <Check className="h-6 w-6 text-green-700 dark:text-green-200" />
                  </div>
                  <div>
                    <h4 className="font-bold text-green-900 dark:text-green-100 text-xl">
                      {domain}{extension} is available!
                    </h4>
                    <p className="text-green-800 dark:text-green-200 font-medium mt-1">
                      Register now for only <span className="font-extrabold text-2xl align-middle">{getPrice(extension)}</span><span className="text-sm opacity-80">/year</span>
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={handleOrder}
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg px-6 h-12 shadow-md hover:shadow-lg transition-all"
                >
                  Register Now <ShoppingCart className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            )}

            {status === 'taken' && (
              <motion.div 
                key="taken"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                // Red Background
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 flex items-center gap-4 shadow-sm"
              >
                <div className="bg-red-100 dark:bg-red-800 p-3 rounded-full shrink-0">
                  <X className="h-6 w-6 text-red-700 dark:text-red-200" />
                </div>
                <div>
                  <h4 className="font-bold text-red-900 dark:text-red-100 text-xl">
                    Sorry, {domain}{extension} is taken.
                  </h4>
                  <p className="text-red-800 dark:text-red-200 font-medium mt-1">
                    It seems this domain is already registered. Please try a different name.
                  </p>
                </div>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div 
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-6 flex items-center gap-4"
              >
                <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                <p className="text-yellow-800 dark:text-yellow-300 font-medium">
                  We couldn't verify this domain right now. Please try again later.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pricing Tickers - UPDATED TO 6 ITEMS */}
        <div className="mt-10 pt-8 border-t border-gray-100 dark:border-neutral-800">
          <p className={cn("text-center text-sm font-semibold mb-4 opacity-70", "text-gray-600 dark:text-gray-400")}>
            POPULAR EXTENSIONS
          </p>
          {/* Grid changed to md:grid-cols-3 to accommodate 6 items cleanly */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
            {[
              { ext: '.co.zw', price: '$5.00', note: '/year' },
              { ext: '.org.zw', price: '$6.00', note: '/year' },
              { ext: '.ac.zw', price: '$6.00', note: '/year' },
              { ext: '.com', price: '$25.00', note: '/year' },
              { ext: '.org', price: '$25.00', note: '/year' },
              { ext: '.net', price: '$25.00', note: '/year' }
            ].map((tld, i) => (
              <div 
                key={i} 
                onClick={() => setExtension(tld.ext)}
                className={cn(
                  "p-3 rounded-xl cursor-pointer transition-colors border group",
                  extension === tld.ext 
                    ? "bg-gray-100 dark:bg-neutral-800 border-gray-400 dark:border-gray-500" 
                    : "bg-gray-50 dark:bg-neutral-900 hover:bg-gray-100 dark:hover:bg-neutral-800 border-transparent"
                )}
              >
                <span className={cn("font-bold text-lg block", "text-gray-900 dark:text-gray-100")}>
                    {tld.ext}
                </span>
                <span className="text-base font-bold text-gray-800 dark:text-gray-200 block mt-1">
                    {tld.price}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-500">{tld.note}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}