import React from 'react';
import Button from './Button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  
  const scrollToCreateAccount = () => {
    const element = document.querySelector('#create-account-section');
    if (element) {
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const middle = absoluteElementTop - (window.innerHeight / 3);
      
      window.scrollTo({ 
        top: middle,
        behavior: 'smooth'
      });
    }
  };

  const navigateToFeatures = () => {
    navigate('/features');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4">
      {/* Spline 3D Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <iframe 
          src='https://my.spline.design/unchained-0cba6e41beaf4d3094ca5ad949b83547/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="canvas-interactive"
          title="G-Token 3D Background"
          style={{ pointerEvents: 'none' }}
        />
      </div>
      
      {/* Content Overlay with Glass Effect */}
      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 text-center"
          >
            <span className="inline-block py-1 px-4 mb-4 rounded-full text-xs font-medium text-white bg-white/10 backdrop-blur-sm border border-white/20">
              Next Generation Crypto
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-center glass-text"
          >
            <span className="text-gradient">G-Block:</span> <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">The Future of</span> <span className="text-gradient">Digital Finance</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-white/90 mb-10 text-center backdrop-blur-sm px-4 py-2 rounded-lg bg-black/10"
          >
            Secure, transparent, and innovative cryptocurrency solutions for the modern investor.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="primary" size="lg" icon onClick={scrollToCreateAccount} className="backdrop-blur-sm">
              Start Investing
            </Button>
            <Button variant="outline" size="lg" className="backdrop-blur-sm" onClick={navigateToFeatures}>
              Explore Features
            </Button>
          </motion.div>
        </div>
        
        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
        >
          <StatCard value="$1.2B+" label="Total Value Locked" delay={0} />
          <StatCard value="120K+" label="Active Users" delay={0.1} />
          <StatCard value="99.9%" label="Uptime Security" delay={0.2} />
        </motion.div>
      </div>
    </section>
  );
};

const StatCard = ({ value, label, delay }: { value: string; label: string; delay: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.9 + delay }}
      className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 text-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] group"
    >
      {/* Neon border effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 rounded-xl border border-gtoken-purple animate-pulse-slow"></div>
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-gtoken-blue via-gtoken-purple to-gtoken-pink opacity-0 group-hover:opacity-40 blur-[2px]"></div>
      </div>
      
      <h3 className="text-3xl font-bold mb-2 text-gradient relative z-10">{value}</h3>
      <p className="text-white/70 relative z-10">{label}</p>
    </motion.div>
  );
};

export default Hero;
