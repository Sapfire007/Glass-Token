import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/Button';
import { ArrowLeft } from 'lucide-react';

const SignIn = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    if (email === 'admin@google.com' && password === 'Admin@123') {
      window.location.href = 'https://e35e-112-133-220-134.ngrok-free.app';
    } else {
      setError('Invalid email or password');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gtoken-dark flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gtoken-blue/20 via-gtoken-purple/20 to-gtoken-pink/20 animate-gradient" />
      
      {/* Background blur circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gtoken-blue/30 rounded-full filter blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gtoken-purple/30 rounded-full filter blur-3xl animate-pulse-slow" />
      
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

            <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
            <p className="text-white/70 text-center mb-8">Sign in to continue to your account</p>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-gtoken-purple/50 focus:ring-1 focus:ring-gtoken-purple/50 transition-all"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-gtoken-purple/50 focus:ring-1 focus:ring-gtoken-purple/50 transition-all"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-white/20 bg-white/5 text-gtoken-purple focus:ring-gtoken-purple/50" />
                  <span className="ml-2 text-white/70">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-gtoken-purple hover:text-gtoken-pink transition-colors">
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/70">
                Don't have an account?{' '}
                <Link to="/signup" className="text-gtoken-purple hover:text-gtoken-pink transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn; 