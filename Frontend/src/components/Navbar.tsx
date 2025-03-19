import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 px-4 md:px-8 py-4",
        isScrolled ? "bg-black/30 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/lovable-uploads/340c11c8-1451-49ef-86f6-ad2be2c8f597.png" alt="G-Token Logo" className="h-8 md:h-10" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLinks />
        </div>

        {/* Action Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/signin" className="px-4 py-2 text-sm font-medium text-white hover:text-gtoken-purple transition-colors">
            Log In
          </Link>
          <Link to="/signup" className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-gtoken-blue to-gtoken-purple hover:from-gtoken-purple hover:to-gtoken-pink rounded-full text-white transition-all duration-300 shadow-lg hover:shadow-gtoken-purple/40">
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={toggleMobileMenu} 
          className="md:hidden text-white p-2 rounded-full bg-gtoken-dark-lighter"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/80 backdrop-blur-xl border-b border-white/10 p-4 animate-fade-in">
          <div className="flex flex-col space-y-4">
            <NavLinks mobile onClick={() => setMobileMenuOpen(false)} />
            <div className="flex flex-col space-y-2 pt-4 border-t border-white/10">
              <Link 
                to="/signin" 
                className="px-4 py-2 text-center text-sm font-medium text-white hover:text-gtoken-purple transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log In
              </Link>
              <Link 
                to="/signup" 
                className="px-4 py-2 text-center text-sm font-medium bg-gradient-to-r from-gtoken-blue to-gtoken-purple hover:from-gtoken-purple hover:to-gtoken-pink rounded-full text-white transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLinks = ({ mobile = false, onClick }: { mobile?: boolean; onClick?: () => void }) => {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features', target: '_blank' },
    { name: 'Solutions', path: '#solutions' },
    { name: 'About', path: '#about' },
    { name: 'Contact', path: '#contact' },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          to={link.path}
          className={cn(
            "text-white/80 hover:text-white",
            mobile ? "py-2 px-4 block w-full" : "nav-link"
          )}
          onClick={onClick}
        >
          {link.name}
        </Link>
      ))}
    </>
  );
};

export default Navbar;
