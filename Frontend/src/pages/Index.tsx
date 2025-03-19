import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import Button from '@/components/Button';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCreateAccount = () => {
    navigate('/signup');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gtoken-dark overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Features />
        
        {/* Technology Section */}
        <section id="about" className="py-24 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-gtoken-dark to-gtoken-dark-lighter opacity-90" />
          
          <div className="container max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-4"
              >
                <span className="inline-block py-1 px-4 rounded-full text-xs font-medium text-white bg-white/10 backdrop-blur-md border border-white/20">
                  Powered By Blockchain
                </span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl md:text-5xl font-bold mb-6"
              >
                Advanced <span className="text-gradient">Technology Stack</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-white/80 max-w-2xl mx-auto mb-12"
              >
                Our platform leverages cutting-edge blockchain technology to deliver unprecedented security and transparency.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TechCard 
                title="Decentralized Architecture" 
                description="Eliminates single points of failure and ensures your assets remain secure against attacks."
                image="/lovable-uploads/a5ced263-cd4e-4be9-97e6-f92ffbe79174.png"
                index={0}
              />
              <TechCard 
                title="Multi-Layer Verification" 
                description="Every transaction is authenticated through multiple independent security layers for maximum protection."
                image="/lovable-uploads/72743d4e-2a90-4ccb-a872-b1cae930b343.png"
                index={1}
              />
              <TechCard 
                title="Immutable Ledger" 
                description="All transactions are permanently recorded, creating a transparent and tamper-proof audit trail."
                image="/lovable-uploads/4d9aecee-5297-44d8-9b6f-acd1bd08d03c.png"
                index={2}
              />
            </div>
          </div>
        </section>
        
        {/* Enhanced CTA Section */}
        <section className="py-24 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-gtoken-dark to-gtoken-dark-lighter opacity-90" />
          
          <div className="container max-w-5xl mx-auto relative z-10">
            <div id="create-account-section" className="glass-card p-12 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-5xl font-bold mb-6"
              >
                Join the <span className="text-gradient">Financial Revolution</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl text-white/80 max-w-2xl mx-auto mb-10"
              >
                Thousands of investors already trust G-Token. Experience the future of digital finance today.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Button variant="primary" size="lg" icon onClick={handleCreateAccount}>
                  Create Account
                </Button>
                <Button variant="outline" size="lg">
                  Watch Demo
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const TechCard = ({ title, description, image, index }: { title: string; description: string; image: string; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="glass-card overflow-hidden card-hover group"
    >
      <div className="h-52 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-gtoken-dark to-transparent z-10" />
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 group-hover:text-gradient transition-all duration-300">
          {title}
        </h3>
        <p className="text-white/70">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default Index;
