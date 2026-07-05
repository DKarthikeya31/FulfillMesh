import React, { useState } from 'react';
import { CATEGORY_TO_PRODUCTS, ALL_CATEGORIES } from '../data/productData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CustomerPortal } from '@/components/CustomerPortal';
import { AdminPanel } from '@/components/AdminPanel';
import { Navigation } from '@/components/Navigation';
import { Users, ShoppingBag, Sparkles, ArrowRight } from 'lucide-react';
import heroImage from '@/assets/walmart-hero.jpg';

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'customer' | 'admin'>('landing');
  const [orderResults, setOrderResults] = useState<any>(null);
  const [acceptedOrders, setAcceptedOrders] = useState<any[]>([]);

  const handleOrderPlaced = (results: any) => {
    setOrderResults(results);
    setCurrentView('admin');
  };

  const handleAcceptOrder = (orderData: any) => {
    setAcceptedOrders(prev => [...prev, orderData]);
  };

  if (currentView === 'customer') {
    return (
      <>
        <Navigation currentView={currentView} onNavigate={setCurrentView} />
        <CustomerPortal onOrderPlaced={handleOrderPlaced} />
      </>
    );
  }

  if (currentView === 'admin') {
    return (
      <>
        <Navigation currentView={currentView} onNavigate={setCurrentView} />
        <AdminPanel orderResults={orderResults} onAcceptOrder={handleAcceptOrder} acceptedOrders={acceptedOrders} />
      </>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0, 113, 206, 0.9), rgba(0, 113, 206, 0.7)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="text-center space-y-8 animate-slide-up">
          {/* Logo and Brand */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="bg-white/20 backdrop-blur-xl p-4 rounded-2xl animate-float">
              <span className="text-4xl font-bold text-white">W</span>
            </div>
            <div className="text-left">
              <h1 className="text-5xl font-bold text-white mb-2">
                Walmart Express
              </h1>
              <p className="text-xl text-white/80">Futuristic Inventory & Delivery System</p>
            </div>
          </div>

          {/* Hero Content */}
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Experience the Future of 
              <span className="block bg-gradient-to-r from-walmart-yellow to-white bg-clip-text text-transparent">
                Smart Retail Operations
              </span>
            </h2>
            
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Advanced AI-powered inventory management with real-time demand prediction, 
              optimized fulfillment routing, and seamless customer experience.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Card className="glass-card hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-primary p-3 rounded-xl w-fit mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">AI Optimization</h3>
                  <p className="text-sm text-muted-foreground">
                    Smart route planning and cost optimization using machine learning
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-walmart p-3 rounded-xl w-fit mx-auto mb-4">
                    <ShoppingBag className="w-8 h-8 text-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Real-time Inventory</h3>
                  <p className="text-sm text-muted-foreground">
                    Live inventory tracking across multiple fulfillment centers
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-primary p-3 rounded-xl w-fit mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Dual Interface</h3>
                  <p className="text-sm text-muted-foreground">
                    Separate portals for customers and administrative operations
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
              <Button
                variant="hero"
                size="hero"
                onClick={() => setCurrentView('customer')}
                className="bg-walmart-yellow"
              >
                <ShoppingBag className="w-6 h-6 mr-2" />
                Customer Portal
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="glass"
                size="hero"
                onClick={() => setCurrentView('admin')}
                className="bg-gradient-primary text-white hover:bg-white/10"
              >
                <Users className="w-6 h-6 mr-2" />
                Admin Dashboard
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">8K+</div>
                <div className="text-white/70 text-sm">Store Locations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">15</div>
                <div className="text-white/70 text-sm">Fulfillment Centers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">20</div>
                <div className="text-white/70 text-sm">Dark Stores</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">AI</div>
                <div className="text-white/70 text-sm">Powered</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-walmart-yellow/10 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-primary/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      </div>
    </div>
  );
};

export default Index;
