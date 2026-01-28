import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Check, X, Loader2, Globe, AlertCircle, ChevronDown, ArrowRight } from 'lucide-react';
import { Button } from './button'; 
import { cn } from '../lib/utils'; 
import DotGrid from './DotGrid';
// TODO: Import your supabase client here
import { supabase } from '../lib/supabaseClient'; 

export default function DomainSearch() {
  const [domain, setDomain] = useState('');
  const [status, setStatus] = useState('idle'); 
  const [tldData, setTldData] = useState([]);
  const [loadingTlds, setLoadingTlds] = useState(true);
  
  // Default to .co.zw, but we will validate this against fetched data later
  const [extension, setExtension] = useState('.co.zw');

  // 1. Fetch Data from Supabase on Mount
  useEffect(() => {
    const fetchTlds = async () => {
      try {
        const { data, error } = await supabase
          .from('domain_prices')
          .select('*')
          .order('sort_order', { ascending: true });

        if (error) throw error;
        
        setTldData(data);
        
        // Optional: Set default extension to the first item fetched if available
        if (data.length > 0) {
           // Keep .co.zw as default if it exists, otherwise use first item
           const hasCoZw = data.some(item => item.extension === '.co.zw');
           if (!hasCoZw) setExtension(data[0].extension);
        }
      } catch (error) {
        console.error('Error fetching TLDs:', error);
      } finally {
        setLoadingTlds(false);
      }
    };

    fetchTlds();
  }, []);

  // 2. Dynamic Price Lookup
  const getPrice = (ext) => {
    const found = tldData.find((item) => item.extension === ext);
    if (!found) return 'N/A';
    // Format currency
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: found.currency || 'USD',
    }).format(found.price);
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
    <section className="relative w-full py-12 px-4 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-50 dark:opacity-30">
        <DotGrid />
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className={cn(
          "rounded-3xl shadow-2xl backdrop-blur-sm border transition-all duration-300 overflow-hidden",
          "bg-white/80 dark:bg-zinc-950/80 border-gray-100 dark:border-zinc-800"
        )}>
        
        {/* Header */}
        <div className="text-center pt-12 pb-8 px-8">
          <h3 className={cn("text-3xl md:text-4xl font-extrabold mb-4 tracking-tight", "text-gray-900 dark:text-white")}>
            Claim Your Identity
          </h3>
          <p className="text-gray-500 dark:text-zinc-400 text-lg max-w-lg mx-auto leading-relaxed">
            Enter your desired domain name below to check availability instantly.
          </p>
        </div>

        {/* Search Input Area */}
        <div className="px-8 md:px-12 pb-8">
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <div className={cn(
              "flex flex-col sm:flex-row items-center p-2 rounded-2xl border transition-all duration-300 group",
              "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700 focus-within:ring-2 focus-within:ring-black dark:focus-within:ring-white focus-within:border-transparent shadow-sm"
            )}>
              
              <div className="pl-4 hidden sm:block">
                <Globe className="h-5 w-5 text-gray-400 dark:text-zinc-500" />
              </div>
              
              <input
                type="text"
                className={cn(
                  "flex-grow w-full px-4 py-3 bg-transparent border-none focus:ring-0 text-lg font-medium outline-none",
                  "text-gray-900 placeholder:text-gray-400",
                  "dark:text-white dark:placeholder:text-zinc-600"
                )}
                placeholder="search-your-domain"
                value={domain}
                onChange={(e) => {
                  setDomain(e.target.value);
                  if(status !== 'idle') setStatus('idle'); 
                }}
              />
              
              {/* Dynamic Dropdown */}
              <div className="flex items-center w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-gray-100 dark:border-zinc-800">
                <div className="relative w-full sm:w-auto">
                  <select 
                    value={extension}
                    onChange={(e) => {
                      setExtension(e.target.value);
                      if(status !== 'idle') setStatus('idle');
                    }}
                    disabled={loadingTlds}
                    className="w-full sm:w-auto bg-transparent border-none text-gray-900 dark:text-zinc-200 font-semibold focus:ring-0 cursor-pointer text-base outline-none appearance-none py-3 pl-4 pr-10 disabled:opacity-50"
                  >
                    {loadingTlds ? (
                      <option>.co.zw</option>
                    ) : (
                      tldData.map((tld) => (
                        <option key={tld.id} value={tld.extension}>
                          {tld.extension}
                        </option>
                      ))
                    )}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <Button 
                type="submit"
                disabled={status === 'searching' || !domain}
                className={cn(
                  "w-full sm:w-auto mt-2 sm:mt-0 sm:ml-2 py-3 px-6 rounded-xl font-bold transition-all",
                  "bg-gray-900 text-white hover:bg-black",
                  "dark:bg-white dark:text-black dark:hover:bg-gray-200"
                )}
              >
                {status === 'searching' ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
              </Button>
            </div>
          </form>
        </div>
        
        {/* Results Area */}
        <div className="px-8 md:px-12 min-h-[60px]">
          <AnimatePresence mode="wait">
            {status === 'available' && (
              <motion.div 
                key="available"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 overflow-hidden"
              >
                <div className={cn(
                  "border rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm",
                  "bg-gray-50/50 border-gray-200 dark:bg-zinc-900/50 dark:border-zinc-700"
                )}>
                  <div className="flex items-start gap-4">
                    <div className="bg-white dark:bg-zinc-800 p-2 rounded-full border border-gray-100 dark:border-zinc-700 shadow-sm shrink-0">
                      <Check className="h-6 w-6 text-gray-900 dark:text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-xl">
                        {domain}{extension} is available.
                      </h4>
                      <p className="text-gray-500 dark:text-zinc-400 text-sm mt-1">
                        Secure this domain today before someone else does.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                     <div className="text-right">
                        <span className="block font-bold text-2xl text-gray-900 dark:text-white">
                          {getPrice(extension)}
                        </span>
                        <span className="text-xs text-gray-500 uppercase tracking-wider">Per Year</span>
                     </div>
                    <Button 
                      onClick={handleOrder}
                      className={cn(
                        "h-12 px-8 rounded-xl font-semibold shadow-lg transition-transform active:scale-95 flex items-center gap-2",
                        "bg-gray-900 hover:bg-black text-white",
                        "dark:bg-white dark:hover:bg-gray-100 dark:text-black"
                      )}
                    >
                      Register <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {status === 'taken' && (
               <motion.div 
               key="taken"
               initial={{ opacity: 0, height: 0 }}
               animate={{ opacity: 1, height: 'auto' }}
               exit={{ opacity: 0, height: 0 }}
               className="mb-8 overflow-hidden"
             >
               <div className={cn(
                 "border rounded-2xl p-6 flex items-center gap-4",
                 "bg-gray-50 border-gray-200 dark:bg-zinc-900 dark:border-zinc-800"
               )}>
                 <div className="bg-gray-200 dark:bg-zinc-800 p-2 rounded-full shrink-0">
                   <X className="h-5 w-5 text-gray-500 dark:text-zinc-400" />
                 </div>
                 <div>
                   <h4 className="font-semibold text-gray-500 dark:text-zinc-400 text-lg line-through decoration-gray-400">
                     {domain}{extension}
                   </h4>
                   <p className="text-gray-500 dark:text-zinc-500 text-sm">
                     This domain is already registered. Please try a different variation.
                   </p>
                 </div>
               </div>
             </motion.div>
            )}
            
            {status === 'error' && (
               <motion.div className="p-4 mb-8 text-center text-gray-500 dark:text-zinc-400 bg-gray-50 dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800">
                  <span className="flex items-center justify-center gap-2">
                    <AlertCircle className="w-4 h-4" /> Service unavailable. Please try again later.
                  </span>
               </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic Pricing Tickers */}
        <div className="bg-gray-50 dark:bg-zinc-900/50 border-t border-gray-100 dark:border-zinc-800 p-8 md:p-12">
          <p className="text-center text-xs font-bold tracking-widest text-gray-400 dark:text-zinc-500 mb-6 uppercase">
            Popular Extensions
          </p>
          
          {loadingTlds ? (
             <div className="flex justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
             </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {tldData.map((tld) => (
                <div 
                  key={tld.id} 
                  onClick={() => setExtension(tld.extension)}
                  className={cn(
                    "p-4 rounded-xl cursor-pointer transition-all duration-200 border flex flex-col items-center justify-center gap-1",
                    extension === tld.extension 
                      ? "bg-white dark:bg-zinc-800 border-gray-900 dark:border-white shadow-md scale-[1.02]" 
                      : "bg-transparent border-transparent hover:bg-white hover:shadow-sm dark:hover:bg-zinc-900"
                  )}
                >
                  <span className={cn(
                    "font-bold text-lg", 
                    extension === tld.extension ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-zinc-400"
                  )}>
                      {tld.extension}
                  </span>
                  <span className={cn(
                    "text-sm",
                    extension === tld.extension ? "text-gray-900 dark:text-white font-medium" : "text-gray-400 dark:text-zinc-500"
                  )}>
                      {getPrice(tld.extension)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        </div>
      </div>
    </section>
  );
}