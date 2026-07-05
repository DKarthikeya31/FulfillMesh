import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';

interface NavigationProps {
  currentView: 'landing' | 'customer' | 'admin';
  onNavigate: (view: 'landing' | 'customer' | 'admin') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate }) => {
  if (currentView === 'landing') return null;

  return (
    <div className="fixed top-4 left-4 z-50">
      <Button
        variant="glass"
        size="sm"
        onClick={() => onNavigate('landing')}
        className="flex items-center gap-2 backdrop-blur-xl"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Button>
    </div>
  );
};