import HeroSection from '../components/HeroSection';
import Navbar from '../components/Navbar';
// import Explore from '../components/Exploreprod';
import '../App.css';
import Contactus from '../components/Contactus';
import Footer from '../components/footer';
// import Companies from '../components/companies';
import DomainSearch from '../components/DomainSearch';
import { useThemeClasses } from '../components/ThemeAware';

import ServicesOverview from '../components/ServicesOverview'; // Added back
import Trust from '../components/Trust';
import PortfolioShowcase from '../components/PortfolioShowcase';
import TeamExpertise from '../components/TeamExpertise';
import PartnersSection from '../components/PartnersSection';
// import Carreer from '../components/Carreer';
import Testimonials from '../components/Testimonials';

export default function Home() {
    return (
        <div>
            <Navbar />
            
            <HeroSection className=""/>
            <DomainSearch themeClasses={useThemeClasses()} />
            <Trust className=""/>
            <ServicesOverview className=""/> {/* Added back */}
            
            {/* <Explore className=""/> */}
            
            
            <PortfolioShowcase className=""/>
            <TeamExpertise className=""/>
            <Testimonials className="mt-20"/>
            {/* <Companies className=""/> */}
            {/* <Carreer className=""/> */}
            <PartnersSection />
            <Contactus className="mt-20" id="contact"/>
            <Footer className="mt-20"/>

        </div>

           
    );
}
