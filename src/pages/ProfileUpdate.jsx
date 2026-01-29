import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaBuilding, FaPhone, FaMapMarkerAlt, FaGlobe, FaSave, FaArrowLeft, FaSpinner, FaCreditCard, FaEnvelope } from 'react-icons/fa';

import ClientAreaNavbar from '../components/ClientAreaNavbar';
import Footer from '../components/footer';
import { useThemeClasses } from '../components/ThemeAware';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';

// --- Static Data Lists ---
const COUNTRIES = [
  "Afghanistan", "Aland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua And Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia And Herzegovina", "Botswana", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Canary Islands", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, Democratic Republic", "Cook Islands", "Costa Rica", "Cote D'Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island & Mcdonald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic Of", "Iraq", "Ireland", "Isle Of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea", "Kosovo", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States Of", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine, State of", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Barthelemy", "Saint Helena", "Saint Kitts And Nevis", "Saint Lucia", "Saint Martin", "Saint Pierre And Miquelon", "Saint Vincent And Grenadines", "Samoa", "San Marino", "Sao Tome And Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia And Sandwich Isl.", "Spain", "Sri Lanka", "Sudan", "South Sudan", "Suriname", "Svalbard And Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad And Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks And Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Viet Nam", "Virgin Islands, British", "Virgin Islands, U.S.", "Wallis And Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"
];

const LANGUAGES = [
  "Default", "Arabic", "Azerbaijani", "Catalan", "Chinese", "Croatian", "Czech", "Danish", "Dutch", "English", "Estonian", "Farsi", "French", "German", "Hebrew", "Hungarian", "Italian", "Macedonian", "Norwegian", "Portuguese-br", "Portuguese-pt", "Romanian", "Russian", "Spanish", "Swedish", "Turkish", "Ukranian"
];

// --- InputGroup Component (Outside main component to fix focus issues) ---
const InputGroup = ({ 
  label, 
  name, 
  formData, 
  handleChange, 
  themeClasses, 
  type = "text", 
  placeholder, 
  icon, 
  required = false, 
  width = "full", 
  options = null 
}) => (
  <div className={width === "half" ? "col-span-1" : "col-span-2"}>
    <label className={`block text-sm font-bold mb-2 ${themeClasses.text}`}>
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
          {icon}
        </div>
      )}
      
      {options ? (
        <select
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className={`w-full p-3 ${icon ? 'pl-10' : ''} rounded-lg border focus:ring-2 focus:ring-red-500 outline-none appearance-none ${themeClasses.input} bg-transparent`}
        >
          {options.map(opt => (
            <option key={opt} value={opt} className="text-black bg-white">
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full p-3 ${icon ? 'pl-10' : ''} rounded-lg border focus:ring-2 focus:ring-red-500 outline-none transition-all ${themeClasses.input} bg-transparent`}
          required={required}
        />
      )}
    </div>
  </div>
);

const ProfileUpdate = () => {
  const themeClasses = useThemeClasses();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    company_name: '',
    phone_number: '',
    address: '', 
    address_2: '',
    city: '',
    state: '',
    postcode: '',
    country: 'Zimbabwe',
    payment_method: 'default',
    billing_contact: 'default',
    language: 'Default',
    core_business: '',
    mailing_list: false,
    pref_general: true,
    pref_invoice: true,
    pref_support: true,
    pref_product: true,
    pref_domain: true,
    pref_affiliate: true,
  });

  // Fetch existing profile
  useEffect(() => {
    if (!user) return;

    const getProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') throw error;

        if (data) {
          setFormData(prev => ({
            ...prev,
            ...data,
            first_name: data.first_name || (data.full_name ? data.full_name.split(' ')[0] : ''),
            last_name: data.last_name || (data.full_name ? data.full_name.split(' ').slice(1).join(' ') : ''),
          }));
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [user]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    const full_name = `${formData.first_name} ${formData.last_name}`.trim();

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...formData,
          full_name,
          updated_at: new Date(),
        });

      if (error) throw error;
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      window.scrollTo(0, 0);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error updating profile: ' + error.message });
      window.scrollTo(0, 0);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${themeClasses.background}`}>
        <FaSpinner className="animate-spin text-4xl text-gray-500" />
      </div>
    );
  }

  // --- Render ---
  const commonProps = { formData, handleChange, themeClasses };

  return (
    <div className={`min-h-screen ${themeClasses.background}`}>
      <ClientAreaNavbar />
      
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link 
              to="/client-area" 
              className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors ${themeClasses.text}`}
            >
              <FaArrowLeft />
            </Link>
            <div>
              <h1 className={`text-3xl font-bold ${themeClasses.text}`}>My Profile</h1>
              <p className={themeClasses.textSecondary}>Manage your account details and preferences</p>
            </div>
          </div>

          {/* Feedback Message */}
          {message.text && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className={`mb-6 p-4 rounded-lg border ${
                message.type === 'success' 
                  ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300' 
                  : 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300'
              }`}
            >
              {message.text}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* 1. Personal Information */}
            <div className={`p-8 rounded-xl shadow-sm border ${themeClasses.card} border-gray-100 dark:border-zinc-800`}>
              <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${themeClasses.text}`}>
                <FaUser className="text-red-500" /> Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="First Name" name="first_name" width="half" required placeholder="John" {...commonProps} />
                <InputGroup label="Last Name" name="last_name" width="half" required placeholder="Doe" {...commonProps} />
                <InputGroup label="Company Name" name="company_name" placeholder="Optional" icon={<FaBuilding className="text-gray-400" />} {...commonProps} />
                
                <div className="col-span-1 md:col-span-2">
                  <label className={`block text-sm font-bold mb-2 ${themeClasses.text}`}>Email Address</label>
                  <input type="email" value={user?.email} disabled className="w-full p-3 rounded-lg border bg-gray-100 text-gray-500 dark:bg-zinc-800 dark:border-zinc-700 cursor-not-allowed" />
                </div>
                
                {/* --- ✅ FIX: Standard Input for Phone --- */}
                <InputGroup 
                  label="Phone Number" 
                  name="phone_number" 
                  width="full"
                  placeholder="+263 77 123 4567"
                  icon={<FaPhone className="text-gray-400" />}
                  {...commonProps} 
                />
              </div>
            </div>

            {/* 2. Billing Address */}
            <div className={`p-8 rounded-xl shadow-sm border ${themeClasses.card} border-gray-100 dark:border-zinc-800`}>
              <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${themeClasses.text}`}>
                <FaMapMarkerAlt className="text-red-500" /> Billing Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Address 1" name="address" required placeholder="Street address" width="full" {...commonProps} />
                <InputGroup label="Address 2" name="address_2" placeholder="Suite, Unit, etc." width="full" {...commonProps} />
                <InputGroup label="City" name="city" required width="half" {...commonProps} />
                <InputGroup label="State/Region" name="state" width="half" {...commonProps} />
                <InputGroup label="Zip Code" name="postcode" width="half" {...commonProps} />
                <InputGroup label="Country" name="country" width="half" options={COUNTRIES} {...commonProps} />
              </div>
            </div>

            {/* 3. Account Settings */}
            <div className={`p-8 rounded-xl shadow-sm border ${themeClasses.card} border-gray-100 dark:border-zinc-800`}>
              <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${themeClasses.text}`}>
                <FaCreditCard className="text-red-500" /> Account Settings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup 
                  label="Payment Method" 
                  name="payment_method" 
                  options={["Use Default (Set Per Order)", "Paynow (Ecocash USD, Innbucks)"]} 
                  width="full" 
                  {...commonProps}
                />
                <InputGroup 
                  label="Default Billing Contact" 
                  name="billing_contact" 
                  options={["Use Default Contact (Details Above)"]} 
                  width="full" 
                  {...commonProps}
                />
                <InputGroup 
                  label="Language" 
                  name="language" 
                  options={LANGUAGES} 
                  icon={<FaGlobe className="text-gray-400" />}
                  width="full" 
                  {...commonProps}
                />
              </div>
            </div>

            {/* 4. Core Business */}
            <div className={`p-8 rounded-xl shadow-sm border ${themeClasses.card} border-gray-100 dark:border-zinc-800`}>
               <label className={`block text-sm font-bold mb-2 ${themeClasses.text}`}>Core Business</label>
               <textarea 
                  name="core_business"
                  value={formData.core_business}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-red-500 outline-none transition-all ${themeClasses.input} bg-transparent`}
                  placeholder="Description of domain owner's organisation"
               ></textarea>
               
               <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-sm rounded-lg border border-blue-100 dark:border-blue-800">
                  <p className="font-semibold mb-1">Domain Ownership Notice:</p>
                  <p>All domains are required to have accurate ownership records. If you are registering any of the domains on behalf of someone else, please kindly add a contact or sub account and assign it to the correct owner. You will still be able to manage the domain for them but it will be registered in their name. These are POTRAZ's requirements. By purchasing you agree to ZISPA's Terms and Conditions.</p>
               </div>
            </div>

            {/* 5. Email Preferences */}
            <div className={`p-8 rounded-xl shadow-sm border ${themeClasses.card} border-gray-100 dark:border-zinc-800`}>
               <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${themeClasses.text}`}>
                <FaEnvelope className="text-red-500" /> Email Preferences
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {[
                    { key: 'pref_general', label: 'General Emails', desc: 'All account related emails' },
                    { key: 'pref_invoice', label: 'Invoice Emails', desc: 'New Invoices, Reminders, & Overdue Notices' },
                    { key: 'pref_support', label: 'Support Emails', desc: 'Receive a CC of all Support Ticket Communications' },
                    { key: 'pref_product', label: 'Product Emails', desc: 'Welcome Emails, Suspensions & Other Lifecycle Notifications' },
                    { key: 'pref_domain', label: 'Domain Emails', desc: 'Registration/Transfer Confirmation & Renewal Notices' },
                    { key: 'pref_affiliate', label: 'Affiliate Emails', desc: 'Receive Affiliate Notifications' },
                 ].map(pref => (
                    <div key={pref.key} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                       <input 
                          type="checkbox" 
                          name={pref.key}
                          checked={formData[pref.key]}
                          onChange={handleChange}
                          className="mt-1 w-4 h-4 text-red-600 rounded focus:ring-red-500 border-gray-300"
                       />
                       <div>
                          <label className={`block text-sm font-bold ${themeClasses.text}`}>{pref.label}</label>
                          <p className={`text-xs ${themeClasses.textSecondary}`}>{pref.desc}</p>
                       </div>
                    </div>
                 ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-zinc-700">
                 <div className="flex items-start gap-3">
                    <input 
                       type="checkbox" 
                       name="mailing_list"
                       checked={formData.mailing_list}
                       onChange={handleChange}
                       className="mt-1 w-5 h-5 text-red-600 rounded focus:ring-red-500 border-gray-300"
                    />
                    <div>
                       <label className={`block font-bold ${themeClasses.text}`}>Join our mailing list</label>
                       <p className={`text-sm ${themeClasses.textSecondary}`}>We would like to send you occasional news, information and special offers by email. To join our mailing list, simply tick the box below. You can unsubscribe at any time.</p>
                    </div>
                 </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-4 pb-12">
              <Link 
                to="/client-area"
                className="px-6 py-3 rounded-lg text-gray-600 font-semibold hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-zinc-800 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-8 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors shadow-lg disabled:opacity-50"
              >
                {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>

          </form>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileUpdate;