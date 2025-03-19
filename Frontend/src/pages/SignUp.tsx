import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/Button';
import { ArrowLeft } from 'lucide-react';

const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your registration logic here
    setTimeout(() => {
      setIsLoading(false);
      // navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gtoken-dark flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gtoken-blue/20 via-gtoken-purple/20 to-gtoken-pink/20 animate-gradient" />
      
      {/* Background blur circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gtoken-purple/30 rounded-full filter blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gtoken-blue/30 rounded-full filter blur-3xl animate-pulse-slow" />
      
      <div className="relative">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute -top-20 left-0"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-white/70 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="backdrop-blur-xl bg-white/10 p-8 rounded-2xl border border-white/20 shadow-2xl">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <img src="/lovable-uploads/340c11c8-1451-49ef-86f6-ad2be2c8f597.png" alt="G-Block Logo" className="h-12" />
            </div>

            <h2 className="text-3xl font-bold text-center mb-2">Create Account</h2>
            <p className="text-white/70 text-center mb-8">Join the future of digital finance</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">First Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-gtoken-purple/50 focus:ring-1 focus:ring-gtoken-purple/50 transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Last Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-gtoken-purple/50 focus:ring-1 focus:ring-gtoken-purple/50 transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-gtoken-purple/50 focus:ring-1 focus:ring-gtoken-purple/50 transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Password</label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-gtoken-purple/50 focus:ring-1 focus:ring-gtoken-purple/50 transition-all"
                  placeholder="Create a strong password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Confirm Password</label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-gtoken-purple/50 focus:ring-1 focus:ring-gtoken-purple/50 transition-all"
                  placeholder="Confirm your password"
                />
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  required
                  className="mt-1 rounded border-white/20 bg-white/5 text-gtoken-purple focus:ring-gtoken-purple/50"
                />
                <label className="ml-2 text-sm text-white/70">
                  I agree to the{' '}
                  <Link to="/terms" className="text-gtoken-purple hover:text-gtoken-pink">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-gtoken-purple hover:text-gtoken-pink">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/70">
                Already have an account?{' '}
                <Link to="/signin" className="text-gtoken-purple hover:text-gtoken-pink transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp; 