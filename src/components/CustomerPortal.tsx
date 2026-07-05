import React, { useState, useEffect } from 'react';
import { CATEGORY_TO_PRODUCTS, ALL_CATEGORIES, PRODUCT_TO_SKU } from '../data/productData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, MapPin, Package, Rocket, Truck, Calendar, Plus, Minus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Static data from the original Streamlit application
const LOCATION_DATA = {
  "Midtown Atlanta": [33.7838, -84.3830],
  "Buckhead": [33.8484, -84.3781],
  "Downtown Atlanta": [33.7537, -84.3901],
  "Virginia-Highland": [33.7839, -84.3530],
  "Downtown Austin": [30.2672, -97.7431],
  "South Austin (SoCo)": [30.2500, -97.7500],
  "East Austin": [30.2672, -97.7200],
  "West Lake Hills": [30.2833, -97.8167],
  "Downtown Dallas": [32.7767, -96.7970],
  "Uptown Dallas": [32.8018, -96.8089],
  "Deep Ellum": [32.7834, -96.7806],
  "Bishop Arts District": [32.7390, -96.8217],
  "Country Club Plaza": [39.0431, -94.5906],
  "Crossroads Arts District": [39.0921, -94.5816],
  "Power & Light District": [39.1012, -94.5844],
  "Westport": [39.0539, -94.5944],
  "South Beach (Miami Beach)": [25.7823, -80.1304],
  "Downtown Miami/Brickell": [25.7617, -80.1918],
  "Coral Gables": [25.7217, -80.2581],
  "Wynwood": [25.8010, -80.1999],
  "Downtown Orlando": [28.5383, -81.3792],
  "International Drive (I-Drive)": [28.4394, -81.4677],
  "Winter Park": [28.5999, -81.3392],
  "College Park": [28.5592, -81.3453],
  "Downtown Phoenix": [33.4484, -112.0740],
  "Scottsdale": [33.4942, -111.9261],
  "Tempe": [33.4255, -111.9400],
  "Old Town Scottsdale": [33.4936, -111.9260],
  "Downtown Pittsburgh (Golden Triangle)": [40.4406, -79.9959],
  "Lawrenceville": [40.4668, -79.9600],
  "Shadyside": [40.4515, -79.9342],
  "Oakland": [40.4406, -79.9514],
  "Downtown San Francisco": [37.7749, -122.4194],
  "Silicon Valley (Palo Alto area)": [37.4419, -122.1430],
  "Oakland Bay Area": [37.8044, -122.2712],
  "Berkeley": [37.8715, -122.2730],
  "Downtown Tampa": [27.9506, -82.4572],
  "Ybor City": [27.9659, -82.4374],
  "Hyde Park": [27.9356, -82.4618],
  "Westshore": [27.9506, -82.5168],
  "Downtown D.C./Penn Quarter": [38.8951, -77.0269],
  "Georgetown": [38.9076, -77.0723],
  "Dupont Circle": [38.9097, -77.0434],
  "Capitol Hill": [38.8899, -76.9951],
  "Bentonville": [36.3729, -94.2088],
  "Fayetteville": [36.0625, -94.1574],
  "Rogers": [36.3320, -94.1185],
  "Springdale": [36.1867, -94.1288],
  "Uptown Charlotte": [35.2271, -80.8431],
  "South End": [35.2080, -80.8414],
  "NoDa (North Davidson)": [35.2504, -80.8111],
  "Dilworth": [35.2080, -80.8531],
  "Downtown Houston": [29.7604, -95.3698],
  "The Heights": [29.8024, -95.4068],
  "River Oaks": [29.7604, -95.4351],
  "Montrose": [29.7506, -95.3900]
} as const;

// CATEGORY_TO_PRODUCTS is now loaded from backend as categoryToProducts

interface CartItem {
  sku: string;
  product: string;
  category: string;
  quantity: number;
}

interface CustomerPortalProps {
  onOrderPlaced: (orderData: any) => void;
}

export const CustomerPortal: React.FC<CustomerPortalProps> = ({ onOrderPlaced }) => {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [deliveryOption, setDeliveryOption] = useState<'same-day' | 'next-day' | 'flexible'>('same-day');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderResult, setOrderResult] = useState<any[] | null>(null); // Store fulfillment options
  const { toast } = useToast();

  // Use static product/category data from productData.ts
  const [categoryToProducts] = useState<Record<string, string[]>>(CATEGORY_TO_PRODUCTS);
  // Get SKU for each product from PRODUCT_TO_SKU mapping
  const getSkuForProduct = (product: string) => PRODUCT_TO_SKU[product] || 'N/A';

  // Add product to cart
  const addToCart = (product: string, category: string) => {
    const sku = getSkuForProduct(product);
    if (sku === 'N/A') {
      toast({
        title: "Product Error",
        description: "SKU could not be generated for this product.",
        variant: "destructive",
      });
      return;
    }
    const existingItem = cart.find(item => item.sku === sku);
    if (existingItem) {
      setCart(prevCart => prevCart.map(item => 
        item.sku === sku 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart(prevCart => [...prevCart, { sku, product, category, quantity: 1 }]);
    }
    toast({
      title: "Added to Cart",
      description: `${product} added to your cart`,
    });
  };

  // Update cart quantity
  const updateQuantity = (sku: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(sku);
      return;
    }
    setCart(cart.map(item => 
      item.sku === sku 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  // Remove from cart
  const removeFromCart = (sku: string) => {
    setCart(cart.filter(item => item.sku !== sku));
  };

  // Place order
  const placeOrder = async () => {
    if (!selectedLocation) {
      toast({
        title: "Location Required",
        description: "Please select a delivery location",
        variant: "destructive",
      });
      return;
    }

    if (cart.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setOrderResult(null); // Reset previous results

    try {
      const coordinates = LOCATION_DATA[selectedLocation as keyof typeof LOCATION_DATA];
      if (!coordinates) {
        toast({
          title: "Invalid Location",
          description: "Selected location is not recognized.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      const requestedSkus = cart.map(item => item.sku);

      const payload = {
        location: {
          area: selectedLocation,
          latitude: coordinates[0],
          longitude: coordinates[1]
        },
        requested_skus: requestedSkus
      };

      const response = await fetch('http://localhost:5000/process_order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        // Try to extract fulfillment options
        if (result && Array.isArray(result.top_combinations)) {
          setOrderResult(result.top_combinations);
        } else if (Array.isArray(result)) {
          setOrderResult(result);
        } else {
          setOrderResult([result]);
        }
        onOrderPlaced(result);
        setCart([]);
        toast({
          title: "Order Placed Successfully!",
          description: "Your order has been processed and sent to fulfillment",
        });
      } else {
        throw new Error('Failed to process order');
      }
    } catch (error) {
      toast({
        title: "Order Failed",
        description: "Failed to connect to backend service",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const DeliveryIcon = ({ option }: { option: string }) => {
    switch (option) {
      case 'same-day': return <Rocket className="w-5 h-5" />;
      case 'next-day': return <Truck className="w-5 h-5" />;
      case 'flexible': return <Calendar className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="glass-card border-0 border-b border-glass-border rounded-none backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-walmart p-3 rounded-xl animate-pulse-glow">
                <span className="text-2xl font-bold text-foreground">W</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Walmart Express
                </h1>
                <p className="text-muted-foreground text-sm">Fast & Fresh Delivery</p>
              </div>
            </div>
            <div className="relative">
              <Button variant="glass" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-walmart-yellow text-foreground animate-bounce">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Location Selection */}
          <Card className="glass-card animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-6 h-6 text-primary" />
                Select Delivery Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full h-12 border-glass-border bg-glass-bg backdrop-blur-sm">
                  <SelectValue placeholder="Choose your delivery area" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(LOCATION_DATA).map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Delivery Options */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { key: 'same-day', label: 'Same Day', desc: 'Fast delivery' },
                  { key: 'next-day', label: 'Next Day', desc: 'Standard' },
                  { key: 'flexible', label: 'Flexible', desc: 'Economy' },
                ].map((option) => (
                  <Button
                    key={option.key}
                    variant={deliveryOption === option.key ? 'walmart-primary' : 'glass'}
                    className="h-16 flex flex-col gap-1"
                    onClick={() => setDeliveryOption(option.key as any)}
                  >
                    <DeliveryIcon option={option.key} />
                    <span className="text-xs">{option.label}</span>
                    <span className="text-xs opacity-70">{option.desc}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Product Categories */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Shop by
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {Object.entries(categoryToProducts).map(([category, products]) => (
                <Card key={category} className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-primary" />
                      {category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-2">
                      {products.map((product, index) => (
                        <div key={product} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{product}</p>
                            <p className="text-xs text-muted-foreground">SKU: {getSkuForProduct(product)}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="walmart"
                            onClick={() => addToCart(product, category)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Cart Sidebar */}
        <div className="space-y-6">
          <Card className="glass-card sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                Your Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <div className="text-muted-foreground text-center py-8">Your cart is empty.</div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.sku} className="flex items-center justify-between gap-2 p-2 rounded-lg bg-muted/20">
                      <div>
                        <div className="font-medium text-sm">{item.product}</div>
                        <div className="text-xs text-muted-foreground">SKU: {item.sku}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="icon" variant="outline" onClick={() => updateQuantity(item.sku, item.quantity - 1)} disabled={item.quantity <= 1 || isLoading}><Minus className="w-4 h-4" /></Button>
                        <span className="min-w-[2ch] text-center">{item.quantity}</span>
                        <Button size="icon" variant="outline" onClick={() => updateQuantity(item.sku, item.quantity + 1)} disabled={isLoading}><Plus className="w-4 h-4" /></Button>
                        <Button size="icon" variant="destructive" onClick={() => removeFromCart(item.sku)} disabled={isLoading}><X className="w-4 h-4" /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <Button
                className="w-full mt-4"
                disabled={isLoading || cart.length === 0}
                onClick={placeOrder}
              >
                {isLoading ? 'Processing...' : 'Place Order'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Display order results */}
      {orderResult && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Top Fulfillment Options</h2>
          {orderResult.map((option: any, idx: number) => (
            <div key={idx} className="mb-4 p-4 border rounded-lg bg-muted/10">
              <div className="font-semibold">Option {idx + 1} - Total Cost: ${option.total_cost}</div>
              <div className="mt-2">
                {Object.entries(option.sku_mapping).map(([node, skus]: [string, any]) => (
                  <div key={node} className="pl-2">
                    <span className="font-medium">Node {node}:</span> {skus.join(', ')}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
