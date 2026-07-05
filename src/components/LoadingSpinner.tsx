import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="relative">
        <div className="w-full h-full rounded-full border-4 border-muted animate-spin border-t-primary"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-walmart-yellow animate-spin animate-reverse animation-delay-150"></div>
      </div>
    </div>
  );
};