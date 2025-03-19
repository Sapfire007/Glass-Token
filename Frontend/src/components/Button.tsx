
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  icon = false,
  disabled = false,
  type = 'button',
}: ButtonProps) => {
  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full";

  const variants = {
    primary: "bg-gradient-to-r from-gtoken-blue to-gtoken-purple hover:from-gtoken-purple hover:to-gtoken-pink text-white shadow-lg hover:shadow-gtoken-purple/30",
    secondary: "bg-gtoken-dark-lighter text-white hover:bg-white/10",
    outline: "bg-transparent border border-white/20 text-white hover:bg-white/5 hover:border-white/30",
    ghost: "bg-transparent text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-3",
  };

  const buttonContent = (
    <>
      <span>{children}</span>
      {icon && <ArrowRight className="ml-2 w-4 h-4" />}
    </>
  );

  const buttonClass = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
    className
  );

  if (to) {
    return (
      <Link to={to} className={buttonClass}>
        {buttonContent}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={buttonClass} target="_blank" rel="noopener noreferrer">
        {buttonContent}
      </a>
    );
  }

  return (
    <button 
      type={type} 
      className={buttonClass} 
      onClick={onClick}
      disabled={disabled}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
