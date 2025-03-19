import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Github, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gtoken-dark-lighter pt-20 pb-10 px-4">
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <img src="/lovable-uploads/340c11c8-1451-49ef-86f6-ad2be2c8f597.png" alt="G-Token Logo" className="h-12" />
            </Link>
            <p className="text-white/70 mb-6">
              GLASS-TOKEN: WHERE CLARITY MEETS CAPITAL. The next generation of transparent, secure cryptocurrency trading.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Facebook size={18} />} />
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Instagram size={18} />} />
              <SocialIcon icon={<Linkedin size={18} />} />
              <SocialIcon icon={<Github size={18} />} />
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/features" target="_blank">Features</FooterLink>
              <FooterLink to="#solutions">Solutions</FooterLink>
              <FooterLink to="#about">About Us</FooterLink>
              <FooterLink to="#contact">Contact</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium text-lg mb-6">Legal</h3>
            <ul className="space-y-4">
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
              <FooterLink to="/cookies">Cookie Policy</FooterLink>
              <FooterLink to="/disclaimer">Disclaimer</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium text-lg mb-6">Contact Us</h3>
            <p className="text-white/70 mb-2">Email: info@g-token.com</p>
            <p className="text-white/70 mb-4">Phone: +1 (555) 123-4567</p>
            <p className="text-white/70">
              123 Blockchain Avenue<br />
              Crypto District<br />
              San Francisco, CA 94105
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} G-Token. All rights reserved.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="mt-4 md:mt-0 flex items-center space-x-2 text-white/50 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <li>
    <Link to={to} className="text-white/70 hover:text-white transition-colors">
      {children}
    </Link>
  </li>
);

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <a 
    href="#" 
    className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-colors"
  >
    {icon}
  </a>
);

export default Footer;
