
import React from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Wallet, Shield, Layers, Globe, LineChart, KeyRound } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const Features = () => {
  const features = [
    {
      title: 'Unmatched Security Protocols',
      description: 'Your assets are protected with state-of-the-art encryption and biometric authentication.',
      icon: <Shield className="w-10 h-10" />
    },
    {
      title: 'Pioneering Blockchain Solutions',
      description: 'Experience the future of finance with our cutting-edge blockchain technology.',
      icon: <Layers className="w-10 h-10" />
    },
    {
      title: 'Seamless Integration',
      description: 'Effortlessly manage and grow your cryptocurrency portfolio across multiple platforms.',
      icon: <Wallet className="w-10 h-10" />
    },
    {
      title: 'Advanced Analytics',
      description: 'Gain valuable insights with real-time data and predictive analytics to optimize your investments.',
      icon: <LineChart className="w-10 h-10" />
    },
    {
      title: 'Global Accessibility',
      description: 'Access your assets anywhere in the world with our secure, cloud-based platform.',
      icon: <Globe className="w-10 h-10" />
    },
    {
      title: 'Passkey Verification',
      description: 'Experience passwordless authentication with FIDO2 passkeys for enhanced security and convenience.',
      icon: <KeyRound className="w-10 h-10" />
    }
  ];

  return (
    <section id="features" className="py-24 px-4 bg-[#0a0a0a] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gtoken-dark via-transparent to-transparent opacity-50" />
      
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
              Why Choose G-Token
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-semibold mb-6"
          >
            Why Choose Us For Your <span className="text-gradient">Crypto Needs</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            Discover unparalleled security, innovation, and expertise in the world of cryptocurrency.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ title, description, icon, index }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ y: -5 }}
      className="glass-card p-8 card-hover group"
    >
      <div className="mb-6 p-4 inline-flex items-center justify-center rounded-full bg-gradient-to-br from-gtoken-blue to-gtoken-purple bg-opacity-20">
        <div className="text-white">
          {icon}
        </div>
      </div>
      
      <h3 className="text-xl font-medium mb-3 group-hover:text-gradient transition-all duration-300">
        {title}
      </h3>
      
      <p className="text-white/70">
        {description}
      </p>
    </motion.div>
  );
};

export default Features;
